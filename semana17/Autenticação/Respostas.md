### Exercício 1

a) *Qual a sua opinião em relação a usar strings para representar os ids? Você concorda que seja melhor do que usar números?*
  Imagino que é melhor strings do que números uma vez que em um sistema decimal cada caracter teria apenas 10 possibilidades, enquanto que em uma string são aproximadamente 90 possibilidades por caracter em caso de ser case sensitive e aceitar caracteres especiais.

b) *A partir de hoje, vamos tentar isolar, ao máximo, as nossas lógicas em classes. Uma das vantagens disso é, por exemplo, utilizar a hierarquia para fazer modificações simples. Dado isso, crie uma classe que possua um um método público para gerar um id.*
```
import { v4 } from "uuid";

export class IdGenerator {
  public generate(): string {
    return v4();
  }
}
```

### Exercício 2
```
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
```
CREATE TABLE User (
	id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL);
```

c) *Pela mesma justificativa do exercício anterior, crie uma classe para ser responsável pela comunicação do usuário com a tabela de usuários. Ela deve possuir um método que cria o usuário no banco; além disso, as variáveis necessárias para realizar as queries devem ser atributos dessa classe*
```
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
```
const userDatabase = new UserDataBase()
await userDatabase.createUser('001', '1a2b3c', 'algum@email.com')
```




