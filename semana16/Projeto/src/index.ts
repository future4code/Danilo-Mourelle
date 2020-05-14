import moment = require('moment');
//******** KNEX E DOTENV ********//
import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

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

//******** SETUP EXPRESS ********//
import express, { Request, Response } from "express";
import { AddressInfo } from "net";

const app = express();

app.use(express.json());

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});

//******** FUNÇÕES ********//
const createUser = async (id: string, name: string, nickname: string, email: string): Promise<void> => {
  await connection('Users')
    .insert({
      id, name, nickname, email
    })
};

const getUserById = async (id: string): Promise<any> => {
  const result = await connection('Users')
    .select("*")
    .where("id", id)

  return result[0]
}

const editUserById = async (id: string, name: string, nickname: string): Promise<any> => {
  if (name) {
    await connection.raw(`
    UPDATE Users SET name = '${name}' WHERE id='${id}'`
    )
  }
  if (nickname) {
    await connection.raw(`
    UPDATE Users SET nickname = '${nickname}' WHERE id='${id}'`
    )
  }
}

const createTaks = async (id: string, title: string, description: string, limit_date: string, creator_user_id: string): Promise<void> => {
  await connection('TodoListTask')
    .insert({
      id: id,
      title: title,
      description: description,
      limit_date: limit_date,
      creator_user_id: creator_user_id
    })
}

const getTaskById = async (taskId: string): Promise<any> => {
  const result = await connection.raw(`
    SELECT 
    tl.id as taskID, 
    tl.title, 
    tl.description, 
    tl.limit_date as limitDate,
    tl.status,
    tl.creator_user_id as creatorUserIs,
    u.nickname as creatorUserNickname
    FROM TodoListTask tl
    INNER JOIN Users u ON tl.creator_user_id = u.id
    WHERE tl.id = '${taskId}'
  `)

  return result[0][0]
}
//******** ENDPOINTS ********//
/*
- Deve ser um PUT (`/user`)
- Receber o name, nickname e email pelo body
- Adicionar usuário na tabela Users
*/
app.put('/user', async (req: Request, res: Response) => {
  const name = req.body.name
  const nickname = req.body.nickname
  const email = req.body.email

  try {
    if (!name || !nickname || !email) {
      throw "Dados incorretos"
    }
    else {
      await createUser(
        Date.now().toString(),
        name,
        nickname,
        email
      )

      res.status(200).send({ message: 'Success' })
    }
  }
  catch (error) {
    res.status(400).send({ message: error })
  }
})

/*
- Deve ser um GET (`/user/:id`)
- Receber o id por *path param*
- Retorna o usuário pelo ID
*/
app.get('/user/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string
    const user = await getUserById(id)

    res.status(200).send({ user })
  }
  catch (error) {
    res.status(400).send({ message: error })
  }
})

/*
- Deve ser um POST (`/user/edit`)
- Receber o id e dados a serem alterados pelo body
- Altera o usuário e retorna com novos dados.
*/
app.post('/user/edit', async (req: Request, res: Response) => {
  const name = req.body.name
  const nickname = req.body.nickname
  const id = req.body.id as string
  try {
    if ((!name && !nickname) || !id) {
      throw "Dados incorretos"
    }
    else {
      await editUserById(
        id,
        name || null,
        nickname || null
      )

      res.status(200).send({ message: 'Success' })
    }
  }
  catch (error) {
    res.status(400).send({ message: error })
  }
})

/*
- Deve ser um PUT (`/task`)
- Receber o title, description, limitDate, creatorUserId pelo body
- Adicionar tarefa na tabela TodoListTask,
*/
app.put('/task', async (req: Request, res: Response) => {
  const title = req.body.title
  const description = req.body.description
  const limit_date = req.body.limitDate
  const creator_user_id = req.body.creatorUserId
  const validDate: boolean = moment(limit_date, "DD/MM/YYYY").isValid()

  try {
    const user = await getUserById(creator_user_id)

    if (!title || !description || !validDate || user.length < 1) {
      throw "Dados incorretos"
    }
    else {
      try {
        await createTaks(
          Date.now().toString(),
          title,
          description,
          moment(limit_date, 'DD/MM/YYYY').format("YYYY-MM-DD"),
          creator_user_id
        )

        res.status(200).send({ message: 'Success' })
      }
      catch (error) {
        res.status(400).send({ message: error })
      }
    }
  }
  catch (error) {
    res.status(400).send({ message: 'Dados incorretos' })
  }
})

/*
- Deve ser um GET (`/task/:id`)
- Receber o id por *path param*
- Retorna a task com as info do user que criou
*/
app.get('/task/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string
    if (!id) {
      throw "ID não pode ser lido"
    }
    try {
      const task = await getTaskById(id)
      if (task.length < 1) throw new Error
      task.limitDate = moment(task.limitDate).utc().format("DD/MM/YYYY")
      res.status(200).send({ task })
    }
    catch (error) {
      res.status(404).send({ message: 'Tarefa não encontrada' })
    }
  }
  catch (error) {
    res.status(400).send({ message: 'error' })
  }
})