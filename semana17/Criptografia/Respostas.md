### Exercício 1
A primeira implementação que vamos fazer refere-se à classe que vai cuidar do hash da nossa senha. Vamos utilizar um bem famoso e muito recomendado para senhas de usuários: bcryptjs. A principal vantagem dele é que é gerada uma string aleatória e atrelada à saída da criptografia. Isso **impede** que se faça o ataque chamado de *rainbow table*, que consiste em montar uma tabela com infinitas possibilidades da saída do hash. 
```Typescript
import * as bcrypt from "bcryptjs";

const rounds = Number(process.env.BCRYPT_COST);
const salt = await bcrypt.genSalt(rounds);
const result = await bcrypt.hash(s, salt);
console.log("encrypted message: ", result);
```

a) *O que são os `round` e `salt`? Que valores são recomendados para o `round`? Que valor você usou? Por quê?*
Round seriaa quantidade de vezes que a criptografia irá rodar recursivamente. Salt é uma string aleatória gerada no processo que serve para informar a criptografia e o round usado, assim como para dificultar a formação re **rainbow tables.** O melhor número para se utilizar em rounds é a quantidade máxima que seu sistema possa rodar sem que impeça funcionamento adequado de outros componentes.

b) *Instale o bcryptjs no seu projeto e comece criando a classe HashManager. Por ora, implemente a função que **criptografe** uma string usando o bcryptjs.*
```Typescript
import * as bcrypt from 'bcryptjs'

export class HashManager{
  public async generateHash(plainText: string): Promise<string> {
    const rounds = Number(process.env.BCRYPT_COST)
    const salt = await bcrypt.genSalt((rounds))
    const hash = await bcrypt.hash(plainText, salt)

    return hash
  }
}
```

c) *Agora, crie a função que verifique se uma string é correspondente a um hash, use a função **compare** do bcryptjs*
```Typescript
import * as bcrypt from 'bcryptjs'

export class HashManager{
  public async generateHash(plainText: string): Promise<string> {
    const rounds = Number(process.env.BCRYPT_COST)
    const salt = await bcrypt.genSalt((rounds))
    const hash = await bcrypt.hash(plainText, salt)

    return hash
  }

  public async compare(plaintext:string, hash:string): Promise<boolean> {
    return bcrypt.compare(plaintext, hash)
  }
}
```

### Exercício 2
Na aula de ontem, implementamos os endpoints de singup e login sem utilizar a criptografia. Vamos agora colocar isso. A ideia é simples: **no cadastro**, antes de salvar o usuário no banco, temos que **criptografar** a senha, para que, no banco, não fique a senha em si. Já, no **login**, em vez de comparar a senha enviada diretamente com a salva no banco, usaremos a biblioteca de Hash para isso. 

a) *Para realizar os testes corretamente, qual deles você deve modificar primeiro? O cadastro ou o login? Justifique.*
O cadastro, pq se eu não tiver um cadastro já inserindo dados criptografados não adianta ter uma comparação no login uma vez que todos iriam falhar.

b) *Faça a alteração do primeiro endpoint*
```Typescript
app.post('/signup', async (req: Request, res: Response) => {
  try {
    const data = {
      email: req.body.email,
      password: req.body.password
    }
    console.log(data)
    if (data.email === '' || !data.email.includes('@')) {
      throw new Error('Este email não é válido')
    }
    if (data.password.length < 6) {
      throw new Error('Senha menor que 6 caracteres')
    }

    const idGenerator = new IdGenerator()
    const id = idGenerator.generate()

    const hashManager = new HashManager()
    const hash = await hashManager.generateHash(data.password)

    const userdatabase = new UserDataBase()
    await userdatabase.createUser(id, data.email, hash)

    const autorizer = new Autorizer()
    const token = autorizer.generateToken({id})

    res.status(200).send({ token })
  } catch (err) {
    res.status(400).send({ message: err.message })
  }
})
```

c) *Faça a alteração do segundo endpoint*
```Typescript
app.post('/login', async (req: Request, res: Response) => {
  try {
    const data = {
      email: req.body.email,
      password: req.body.password
    }
    
   if( data.email === '' || !data.email.includes('@')){
      throw new Error ('Este email não é válido')
    }
  
    const userdatabase = new UserDataBase()
    const user = await userdatabase.getUserByEmail(data.email)
  
    const hashManager = new HashManager()
    const isPasswordCorrect = await hashManager.compare(data.password, user.password)

    if(!isPasswordCorrect){
      throw new Error ("Senha inválida")
    }

    const autorizer = new Autorizer()
    const token = autorizer.generateToken({id: user.id})

    res.status(200).send({ token })
  } catch (err) {
    res.status(400).send({ message: err.message })
  }
})
```

d) *No exercício de ontem, nós criamos o endpoint user/profile. Também temos que modificar esse endpoint devido à adição da criptografia? Justifique.*
Não será necessário uma vez que o endpoint necessita da autorização do token para realizar as suas funções e como o token é obtido durante o processo de login, o passo da verificação da criptografia já foi realizada.

### Exercício 3 
Agora, vamos pensar em um pouco nas funcionalidades relacionadas aos tipos de usuário. Para isso, vamos ter que fazer umas modificações no banco de dados.

a) *Altere a sua tabela de usuários para ela possuir uma coluna role. Considere que pode assumir os valores normal  e admin. Coloque normal como valor padrão.*
```SQL
ALTER TABLE User ADD role VARCHAR(255) NOT NULL DEFAULT 'normal';
```

b) *Altere a interface `AuthenticationData` e `Authenticator` para representarem esse novo tipo no token.*
```Typescript
import * as jwt from 'jsonwebtoken'

export class Autorizer {
  public generateToken(payload: AuthenticationData): string {
    const token = jwt.sign(
      payload,
      process.env.JWT_KEY as string
    )
    return token
  }

  public getData(token: string): AuthenticationData {
    const payload = jwt.verify(
      token,
      process.env.JWT_KEY as string
    ) as any

    return ({
      id: payload.id,
      role: payload.role
    })
  }
}

interface AuthenticationData {
  id: string
  role: string
}
```

c) *Altere o cadastro para receber o tipo do usuário e criar o token com essa informação*
```Typescript
try {
  const data = {
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  }
  console.log(data)
  if (data.email === '' || !data.email.includes('@')) {
    throw new Error('Este email não é válido')
  }
  if (data.password.length < 6) {
    throw new Error('Senha menor que 6 caracteres')
  }

  const idGenerator = new IdGenerator()
  const id = idGenerator.generate()

  const hashManager = new HashManager()
  const hash = await hashManager.generateHash(data.password)

  const userdatabase = new UserDataBase()
  await userdatabase.createUser(id, data.email, hash, data.role)

  const autorizer = new Autorizer()
  const token = autorizer.generateToken({
    id,
    role: data.role
  })

  res.status(200).send({ token })
} catch (err) {
  res.status(400).send({ message: err.message })
}

```

d) *Altere o login para crair o token com o role do usuário*
```Typescript
try {
  const data = {
    email: req.body.email,
    password: req.body.password
  }

  if (data.email === '' || !data.email.includes('@')) {
    throw new Error('Este email não é válido')
  }

  const userdatabase = new UserDataBase()
  const user = await userdatabase.getUserByEmail(data.email)

  const hashManager = new HashManager()
  const isPasswordCorrect = await hashManager.compare(data.password, user.password)

  if (!isPasswordCorrect) {
    throw new Error("Senha inválida")
  }

  const autorizer = new Autorizer()
  const token = autorizer.generateToken({
    id: user.id,
    role: user.role
  })

  res.status(200).send({ token })
} catch (err) {
  res.status(400).send({ message: err.message })
}
```

### Exercício 4
Agora, vamos usar esse `role` no endpoint `/user/profile`. Somente o usuários "normais" podem acessar esse endpoint.

a) *Altere o endpoint para que retorne um erro de Unauthorized para os usuários que "não sejam normais" e tentem acessar esse endpoint* 
```Typescript
try {
  const token = req.headers.authorization as string
  
  const autorizer = new Autorizer()
  const userPayload = autorizer.getData(token)

  if(userPayload.role !=="normal"){
    throw new Error ('Access Denied')
  }
  const userdatabase = new UserDataBase()
  const userData = await userdatabase.getUserById(userPayload.id)

  res.status(200).send({ 
    id: userData.id,
    email: userData.email,
    role: userData.role
    })
} catch (err) {
  res.status(400).send({ message: err.message })
}
```

### Exercício 5
Implemente o endpoint que realizará a deleção de um usuário. As especificações são:

- *Verbo/Método*: **DELETE**
- *Path:* `/user/:id`
- Somente admins podem acessar esse endpoint

```Typescript
...
  public async deleteUserById (id:string): Promise<void> {
    await this.connection()
    .delete().from(UserDataBase.TABLE_NAME).where({id})
  }
...
```
```Typescript
export const deleteUserByIdEP = async (req: Request, res: Response) => {
try {
  const data = {
    token: req.headers.authorization as string,
    id: req.params.id
  }

  const autorizer = new Autorizer()
  const userPayload = autorizer.getData(data.token)

  if (userPayload.role !== 'admin') {
    throw new Error('Access Denied')
  }

  const userdatabase = new UserDataBase()
  await userdatabase.deleteUserById(data.id)

  res.sendStatus(200)
} 
catch (err) {
  res.status(400).send({
    message: err.message,
  });
} 
}
```

### Exercício 6
Implemente o endpoint que retorne as informações (id e email) de um usuário a partir do seu id. As especificações são:

- *Verbo/Método*: **GET**
- *Path:* `/user/:id`
- Tanto admins como usuários normais conseguem usar essa funcionalidade

```Typescript
try {
  const data = {
    token: req.headers.authorization as string,
    id: req.params.id
  }

  const autorizer = new Autorizer()
  const userPayload = autorizer.getData(data.token)

  const userdatabase = new UserDataBase()
  const userData = await userdatabase.getUserById(data.id)

  res.status(200).send({
    id: userData.id,
    email: userData.email,
    role: userData.role,
  });
}
catch (err) {
  res.status(400).send({ message: err.message })
}
  ```

### Exercício 7
  Para encerrar, vamos introduzir uma nova classe na nossa aplicação: `BaseDatabase`. Ela deve ser usada como classe pai de todas aquelas que se comunicam com o banco de dados. Seguem as suas especificações:

- Deve ser uma classe abstrata,
- Deve possuir um método `static` que retorne a `connection` da classe (ou seja a variável com as configurações necessárias para a comunicação com o banco)
- Deve possuir um método `static` chamado `destroyConnection`, que deve encerrar a conexão com o banco de dados

a) *Implemente essa classe e faça com que o `UserDatabase` a implemente. Faça todas as alterações necessárias nessa classe.*
```Typescript
export abstract class BaseDataBase {

  private static CONNECTION_KNEX: Knex | null = null

  protected connection() {
    if (BaseDataBase.CONNECTION_KNEX === null) {
      BaseDataBase.CONNECTION_KNEX = knex({
        client: "mysql",
        connection: {
          host: process.env.DB_HOST,
          port: 3306,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE_NAME,
        },
      });
    }

    return BaseDataBase.CONNECTION_KNEX
  }

  public static async destroyConnection() {
    if (BaseDataBase.CONNECTION_KNEX !== null) {
      await BaseDataBase.CONNECTION_KNEX.destroy()
      BaseDataBase.CONNECTION_KNEX = null
    }
  }
}
```

b) *Utilize o método `destroyConnection` nos momentos oportunos (vulgo, no final dos endpoints)*
```Typescript
 finally {
    await BaseDataBase.destroyConnection()
  }
```