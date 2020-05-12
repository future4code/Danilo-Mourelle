### Exercício 1
A primeira implementação que vamos fazer refere-se à classe que vai cuidar do hash da nossa senha. Vamos utilizar um bem famoso e muito recomendado para senhas de usuários: bcryptjs. A principal vantagem dele é que é gerada uma string aleatória e atrelada à saída da criptografia. Isso **impede** que se faça o ataque chamado de *rainbow table*, que consiste em montar uma tabela com infinitas possibilidades da saída do hash. 
```Typescript
import * as bcrypt from "bcryptjs";

const rounds = Number(process.env.BCRYPT_COST);
const salt = await bcrypt.genSalt(rounds);
const result = await bcrypt.hash(s, salt);
console.log("encrypted message: ", result);
```

a) *O que são os ```round``` e ```salt```? Que valores são recomendados para o ```round```? Que valor você usou? Por quê?*
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