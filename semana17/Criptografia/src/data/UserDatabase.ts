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

  public async createUser(id: string, email: string, password: string, role?:string): Promise<void> {
    await this.connection()
      .insert({ id, email, password, role }).into(UserDataBase.TABLE_NAME)
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

  public async deleteUserById (id:string): Promise<void> {
    await this.connection()
    .delete().from(UserDataBase.TABLE_NAME).where({id})
  }
}