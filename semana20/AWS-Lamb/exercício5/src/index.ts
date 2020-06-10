import knex from 'knex'
import Knex from 'knex'

let connectionKnex: Knex | null = null
const connection = () => {
  if (connectionKnex === null) {
    connectionKnex = knex({
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
  return connectionKnex
}

const destroyConnection = async () => {
  if (connectionKnex !== null) {
    await connectionKnex.destroy()
    connectionKnex = null
  }
}

async function createUser(name: string, cartoonName: string, imageLink: string): Promise<void> {
  await connection()
    .insert({
      name,
      cartoon_name: cartoonName,
      image_link: imageLink
    })
    .into('Cartoon')
}

export const handler = async (event: any) => {
  try {
    const { name, cartonName, imageLink } = event

    if (!name || !cartonName || !imageLink) {
      throw new Error('Missing Inputs')
    }

    await createUser(name, cartonName, imageLink)

    return { message: "User created" }
  }
  catch (err) {
    return { message: err.message }
  }
  finally {
    await destroyConnection()
  }
}