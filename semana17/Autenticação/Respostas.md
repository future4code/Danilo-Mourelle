### Exercício 1

a) *Qual a sua opinião em relação a usar strings para representar os ids? Você concorda que seja melhor do que usar números?*
  Imagino que é melhor strings do que números uma vez que em um sistema decimal cada caracter teria apenas 10 possibilidades, enquanto que em uma string são aproximadamente 90 possibilidades por caracter em caso de ser case sensitive e aceitar caracteres especiais.

b) *A partir de hoje, vamos tentar isolar, ao máximo, as nossas lógicas em classes. Uma das vantagens disso é, por exemplo, utilizar a hierarquia para fazer modificações simples. Dado isso, crie uma classe que possua um um método público para gerar um id.*
```TypeScript
import { v4 } from "uuid";

export class IdGenerator {
  public generate(): string {
    return v4();
  }
}
```

### Exercício 2
```TypeScript
const userTableName = "User";

const connection = knex({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
  },
});

const createUser = async (id: string, email: string, password: string) => {
  await connection
    .insert({
      id,
      email,
      password,
    })
    .into(userTableName);
};
```
a) *Explique o código acima com as suas palavras.*
O primeiro const serve para armazenar o nome da tabela; o segundo const serve para fazer a conexão com o banco de dados MySQL através do knex, o ultimo const serve para fazer a função que através do knex irá realizar a query de inserir uma nova linha na tabela do banco de dados.

b) *Comece criando a tabela de usuários. Coloque a query que você utilizou no arquivo de respostas.*
```SQL
CREATE TABLE User (
	id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL);
```

c) *Pela mesma justificativa do exercício anterior, crie uma classe para ser responsável pela comunicação do usuário com a tabela de usuários. Ela deve possuir um método que cria o usuário no banco; além disso, as variáveis necessárias para realizar as queries devem ser atributos dessa classe*
```TypeScript
export class UserDataBase {
  private connection() {
    return knex({
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

  private static TABLE_NAME: string = 'User'

  public async createUser(id: string, password: string, email: string): Promise<void> {
    await this.connection()
      .insert({ id, email, password }).into(UserDataBase.TABLE_NAME)
  }
}
```

d) *Crie um usuário utilizando somente a classe que você criou*
```TypeScript
const userDatabase = new UserDataBase()
await userDatabase.createUser('001', '1a2b3c', 'algum@email.com')
```

### Exercício 3
```TypeScript
import * as jwt from "jsonwebtoken";

const expiresIn = "1min"
const generateToken = (id: string): string => {
  const token = jwt.sign(
    {
      id
    },
    process.env.JWT_KEY as string,
    {
      expiresIn
    }
  );
  return token;
}
```

a) *O que a linha ```as string faz?``` Por que precisamos usar ela ali?* 
A linha ```as string``` faz com que o TypeScript não interprete que há uma possibilidade de o retorno da process.env ser ```undefined``` o que daria um erro ao transpilar. Dessa forma garantimos que o que será passado será recebido e considerado como uma string.

b) *Agora, crie a classe que será responsável pela autorização dos usuários com um método que gere o token. Além disso, crie uma interface a parte para representar o input desse método. Lembre-se de colocar todas as constantes em atributos da classe.*
```TypeScript
import * as jwt from 'jsonwebtoken'

export class Autorizer{
  public generateToken(payload: AuthenticationData): string {
    const token = jwt.sign(
      {
        id: payload.id
      },
      process.env.JWT_KEY as string
    )
    return token
  }
}
interface AuthenticationData {
  id: string
}
```

### Exercício 4
Com essas três classes preparadas podemos criar o nosso endpoint. As informações dele são:
- *Verbo/Método*: POST
- *Path*: `/signup`
- *Input:* O body da requisição deve ser
    ```json
    {
    	"email": "email do usuário",
    	"password": "senha do usuário"
    }
    ```
- *Output*: O body da resposta deve ser
    ```json
    {
    	"token": "token gerado pelo jwt"
    }
    ```

a) *Crie o endpoint que realize isso, com as classes que você implementou anteriormente*
```TypeScript
app.post('/signup', async (req: Request, res: Response) => {
  try {
    const idGenerator = new IdGenerator()
    const id = idGenerator.generate()

    const userdatabase = new UserDataBase()
    await userdatabase.createUser(id, req.body.email, req.body.password)

    const autorizer = new Autorizer()
    const token = autorizer.generateToken({id})
    res.status(200).send({ token })
  } catch (err) {

  }
})
```

b) *Altere o seu endpoint para ele não aceitar um email vazio ou que não possua um "@"*
```TypeScript
app.post('/signup', async (req: Request, res: Response) => {
  try {
    const data = {
      email: req.body.email,
      password: req.body.password
    }

    if( data.email === '' || !data.email.icludes('@')){
      throw new Error ('Este email não é válido')
    }
    
    const idGenerator = new IdGenerator()
    const id = idGenerator.generate()

    const userdatabase = new UserDataBase()
    await userdatabase.createUser(id, data.email, data.password)

    const autorizer = new Autorizer()
    const token = autorizer.generateToken({id})
    res.status(200).send({ token })
  } catch (err) {
    res.status(400).send({message:err.message})
  }
})
```
c) *Altere o seu endpoint para ele só aceitar uma senha com 6 caracteres ou mais*

```TypeScript
app.post('/signup', async (req: Request, res: Response) => {
  try {
    const data = {
      email: req.body.email,
      password: req.body.password
    }

    if( data.email === '' || !data.email.icludes('@')){
      throw new Error ('Este email não é válido')
    }
    if (data.password.length < 6 ){
      throw new Error ('Senha menor que 6 caracteres')
    }
    
    const idGenerator = new IdGenerator()
    const id = idGenerator.generate()

    const userdatabase = new UserDataBase()
    await userdatabase.createUser(id, data.email, data.password)

    const autorizer = new Autorizer()
    const token = autorizer.generateToken({id})
    res.status(200).send({ token })
  } catch (err) {
    res.status(400).send({message:err.message})
  }
})
```

### Exercício 5
Para o login, vamos precisar alterar somente a classe que se comunica com o banco. No login, vamos receber o email e a senha do usuário. Então, vamos precisar de um método que realize essa busca no banco de dados para gente. 

a) *Altere a classe do seu banco de dados para que ele tenha um método que retorne as informações de um usuário a partir do email*
```TypeScript
export class UserDataBase {
  private connection() {
    return knex({
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

  private static TABLE_NAME: string = 'User'

  public async createUser(id: string, email: string, password: string): Promise<void> {
    await this.connection()
      .insert({ id, email, password }).into(UserDataBase.TABLE_NAME)
  }

  public async getUserByEmail (email: string): Promise<any> {
    const result = await this.connection()
    .select('*').from(UserDataBase.TABLE_NAME).where({email})

    return result [0]
  }
}
```

b) *Teste a sua função*
```TypeScript
async function test(){
    const userdatabase = new UserDatabase()
    console.log(await userDataBase.getUserByEmail("algum@email.com"))
}
test()
```

### Exercício 6 
Agora, vamos implementar o endpoint de login, com as seguintes especificações:

- *Verbo/Método*: POST
- *Path*: `/login`
- *Input:* O body da requisição deve ser

    ```json
    {
    	"email": "email do usuário",
    	"password": "senha do usuário"
    }
    ```

- *Output*: O body da resposta deve ser

    ```json
    {
    	"token": "token gerado pelo jwt"
    }
    ```
  
a) *Crie o endpoint que realize isso, com as classes que você implementou anteriormente*
```TypeScript
app.post('/login', async (req: Request, res: Response) => {
  try {
    const data = {
      email: req.body.email,
      password: req.body.password
    }


    const userdatabase = new UserDataBase()
    const user = await userdatabase.getUserByEmail(data.email)

    if(user.password !== data.password){
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

b) *Altere o seu endpoint para ele não aceitar um email vazio ou que não possua um ```"@"```*
```TypeScript
app.post('/login', async (req: Request, res: Response) => {
  try {
    const data = {
      email: req.body.email,
      password: req.body.password
    }

   if( data.email === '' || !data.email.icludes('@')){
      throw new Error ('Este email não é válido')
    }

    const userdatabase = new UserDataBase()
    const user = await userdatabase.getUserByEmail(data.email)

    if(user.password !== data.password){
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

### Exercício 7
```TypeScript
const expiresIn = "1min";

const getData = (token: string): AuthenticationData => {
  const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
  const result = {
    id: payload.id,
  };
  return result;
};
```

a) *O que a linha ```as any``` faz? Por que precisamos usá-la ali?*
Porque nós realmente não temos ideia do que foi inserido no payloado no momento da geração do token, portanto, o retorno dele se enquadra em qualquer coisa mesmo.

b) *Altere a sua classe do JWT para que ela tenha um método que realize a mesma funcionalidade da função acima*
```TypeScript
export class Autorizer{
  public generateToken(payload: AuthenticationData): string {
    const token = jwt.sign(
      {
        id: payload.id
      },
      process.env.JWT_KEY as string
    )
    return token
  }

  public getData(token:string): AuthenticationData {
    const payload = jwt.verify(
      token,
      process.env.JWT_KEY as string
    ) as any

    return ({ id: payload.id})
  }
}

interface AuthenticationData {
  id: string
}
```

### Exercício 8 
Agora, vamos criar um endpoint que retorne as informações do usuário logado. As especificações dele estão abaixo:

- *Verbo/Método*: GET
- *Path*: `/user/profile`
- *Input:* Deve receber, nos headers, o token de autenticação:

    ```
    Authorization: token.do.usuario
    ```

- *Output*: O body da resposta deve ser

    ```json
    {
    	"id": "id do usuário",
    	"email": "email do usuário"
    }
    ```

a) *Comece alterando a classe do banco de dados para que ela tenha um método que retorne o usuário a partir do id*
```TypeScript
export class UserDataBase {
  private connection() {
    return knex({
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

  private static TABLE_NAME: string = 'User'

  public async createUser(id: string, email: string, password: string): Promise<void> {
    await this.connection()
      .insert({ id, email, password }).into(UserDataBase.TABLE_NAME)
  }

  public async getUserByEmail (email: string): Promise<any> {
    const result = await this.connection()
    .select('*').from(UserDataBase.TABLE_NAME).where({email})

    return result [0]
  }

  public async getUserById (id:string): Promise<any> {
    const result = await this.connection().raw(`
      SELECT * FROM ${UserDataBase.TABLE_NAME} WHERE id="${id}"
    `)

    return result[0][0]
  }
}
```

b) *Crie o endpoint com as especificações passadas*
```TypeScript
app.get('/user/profile', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string
    
    const autorizer = new Autorizer()
    const userPayload = autorizer.getData(token)

    const userdatabase = new UserDataBase()
    const userData = await userdatabase.getUserById(userPayload.id)

    res.status(200).send({ 
      id: userPayload.id,
      email: userData.email
     })
  } catch (err) {
    res.status(400).send({ message: err.message })
  }
})
```