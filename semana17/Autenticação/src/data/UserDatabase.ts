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