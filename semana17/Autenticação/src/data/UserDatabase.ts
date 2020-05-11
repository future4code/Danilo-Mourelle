import knex from 'knex'

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

const userDatabase = new UserDataBase()
await userDatabase.createUser('001', '1a2b3c', 'algum@email.com')