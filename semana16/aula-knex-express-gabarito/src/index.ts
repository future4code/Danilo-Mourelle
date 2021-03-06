//******** SETUP EXPRESS E DOTENV ********//
import express, { Request, Response } from "express";
import { AddressInfo } from "net";
import dotenv from "dotenv";

dotenv.config();

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

//******** KNEX ********//
import knex from "knex";

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

//******** EXERCÍCIOS ********//
//Exercicio 1
const getActorById = async (id: string): Promise<any> => {
  const result = await connection.raw(`
    SELECT * FROM Actor WHERE id = '${id}'
  `)

  return result[0][0]
}
const getActorByName = async (name: string): Promise<any> => {
  const result = await connection.raw(`
    SELECT * FROM Actor WHERE name = '${name}'
  `)
  return result[0]
}
const countActorByGender = async (gender: string): Promise<any> => {
  const result = await connection.raw(`
    SELECT COUNT(*) as count FROM Actor WHERE gender = '${gender}'
  `)
  return result[0][0]
}

//Exercício 2
const createActor = async (
  id: string,
  name: string,
  salary: number,
  dateOfBirth: Date,
  gender: string
): Promise<void> => {
  await connection
    .insert({
      id: id,
      name: name,
      salary: salary,
      birth_date: dateOfBirth,
      gender: gender,
    })
    .into("Actor");
};
const updateSalaryById = async (id: string, salary: number): Promise<void> => {
  await connection("Actor")
    .update({ salary })
    .where('id', id)
}
const deleteActorById = async (id: string): Promise<void> => {
  await connection('Actor')
    .delete()
    .where('id', id)
}
const averageSalaryByGender = async (gender: string): Promise<any> => {
  const result = await connection('Actor')
    .avg("salary")
    .where({ gender });

  return result[0];
}

//Exercício 3
app.get("/actor/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const actor = await getActorById(id);

    res.status(200).send(actor);
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

app.get('/actor', async (req: Request, res: Response) => {
  try {
    const gender = req.query.gender as string
    const quantity = await countActorByGender(gender)

    res.status(200).send(quantity)
  }
  catch (err) {
    res.status(400).send({
      message: err.message,
    })
  }
})

//Exercício 4
app.put("/actor", async (req: Request, res: Response) => {
  try {
    await createActor(
      req.body.id,
      req.body.name,
      req.body.salary,
      new Date(req.body.dateOfBirth),
      req.body.salary
    );

    res.status(200).send();
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});
/*
- Deve ser um POST (`/actor`)
- Receber o salário e o id pelo body
- Simplesmente atualizar o salário do ator com id em questão
*/
app.post("/actor", async (req: Request, res: Response) => {
  try {
    await updateSalaryById(
      req.body.id,
      req.body.salary,
    )

    res.status(200).send();
  } catch (err) {
    res.status(400).send({
      message: err.message,
    })
  }
})
/*
- Deve ser um DELETE (`/actor/:id`)
- Receber id do ator como *path param*
- Simplesmente deletar o ator da tabela
*/
app.delete("/actor/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string
    await deleteActorById(id)

    res.status(200).send();
  } catch (err) {
    res.status(400).send({
      message: err.message,
    })
  }
})

//Exercício 5
/*
- Deve ser um POST (`/movie`)
- Receber todas as informações pelo body
- Criar o filme na tabela
*/
app.post('/movies', async (req: Request, res: Response) => {
  try {
    await createMovie(
      req.body.id,
      req.body.title,
      req.body.synopsis,
      new Date(req.body.releaseDate),
      new Date(req.body.playingLimitDate)
    )

    res.status(200).send({ message: 'Ator criado com sucesso' });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    })
  }
})

//Exercicio 6
/*
- Deve ser um GET (`/movie/all`)
- Não recebe nada
- Retorna todos os filmes. Ele deve retornar, no máximo, uma lista com 15 itens
*/

app.get('/movie/all', async (req: Request, res: Response) => {
  try {
    const moviesList = await getAllMovies()

    res.status(200).send({ Movies: moviesList })
  } catch (err) {
    res.status(400).send({
      message: err.message,
    })
  }
})

//Exercício 7
/*
- Deve ser um GET (`/movie/search`)
- Deve receber o termo de busca como uma query string (`/movie/search?query=`)
- Faz a busca entre todos os filmes que tenham o termo de busca no nome ou na sinopse. Além disso, a lista deve vir ordenada pela data de lançamento
*/
const searchMovieQueryBuilder = async (term: string): Promise<any> => {
  const result = await connection('Movie').where("title", "LIKE", `%${term}%`).orWhere("synposis", "LIKE", `%${term}%`)

  return result;
};

app.get('/movie/search', async (req: Request, res: Response) => {
  try {
    const moviesWithTerm = await searchMovieQueryBuilder(req.query.query as string)

    res.status(200).send({ Movies: moviesWithTerm })
  } catch (err) {
    res.status(400).send({
      message: err.message,
    })
  }
})


//Funções de apoio ja dadas

const searchActor = async (name: string): Promise<any> => {
  const result = await connection.raw(`
    SELECT * FROM Actor WHERE name = "${name}"
  `);
  return result;
};




const getAllMovies = async (): Promise<any> => {
  const result = await connection.raw(`
    SELECT * FROM Movie LIMIT 15
  `);

  return result[0];
};

const avgSalary = async (gender: string): Promise<any> => {
  const result = await connection("Actor")
    .avg("salary as average")
    .where({ gender });

  return result[0].average;
};
(async () => {
  console.log(await avgSalary("female"));
})();

const createMovie = async (
  id: string,
  title: string,
  synopsis: string,
  releaseDate: Date,
  playingLimitDate: Date
) => {
  await connection
    .insert({
      id: id,
      title: title,
      synopsis: synopsis,
      releas_date: releaseDate,
      playing_limit_date: playingLimitDate,
    })
    .into("Movie");
};



const searchMovie = async (term: string): Promise<any> => {
  const result = await connection.raw(`
    SELECT * FROM Movie 
    WHERE title LIKE '%${term}%' OR synposis LIKE '%${term}%'
    ORDER BY release_date
  `);

  return result[0];
};



app.get("/movie/search", async (req: Request, res: Response) => {
  try {
    const movies = await searchMovie(req.query.query as string);

    res.status(200).send({
      movies: movies,
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});
