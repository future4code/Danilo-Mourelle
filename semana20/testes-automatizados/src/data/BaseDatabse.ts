import knex from 'knex'
import Knex from 'knex'

import dotenv from "dotenv";

dotenv.config();

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