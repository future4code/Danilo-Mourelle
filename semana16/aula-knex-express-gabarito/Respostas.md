### Exercício 1
a) A resposta é um array de arrays, sendo que a que normalmente buscamos está no indice 0 desse array.
b) Função que busca ator pelo nome - *NOTA:* Caso tenha mais de um ator com mesmo nome, traria um array com todos esses atores
```
const getActorByName = async (name: string): Promise<any> => {
  const result = await connection.raw(`
    SELECT * FROM Actor WHERE name = '${name}'
  `)
  return result[0]
}
```
c) Função que retorna a qauntidade de atores por gênero consultado
```
const countActorByGender = async (gender: string): Promise<any> => {
  const result = await connection.raw(`
    SELECT COUNT(*) as count FROM Actor WHERE gender = '${gender}'
  `)
  return result[0][0]
}
```

### Exercício 2
a) Atualizando o salário pelo ID
```
const updateSalaryById = async (id:string, salary: number): Promise<any> => {
  await connection("Actor")
  .update({ salary})
  .where('id',id)
}
```
b) Deletar pelo ID
```
const deleteActorById = async (id:string): Promise<void> => {
  await connection('Actor')
  .delete()
  .where('id', id)
}
```
c) Busca média de salário por gênero
```
const averageSalaryByGender = async (gender:string): Promise<any> => {
  const result = await connection('Actor')
  .avg("salary")
    .where({ gender });

  return result[0];
}
```

### Exercício 3
a) Devido a fomra como esse endpoit está recebendo o input, que nesse caso é através do proprio endereço - *path param*
b) No *try* é onde é enviado a resposta do banco juntamente com o status da consulta. No *catch* faz exatamente a mesma coisa, porém com status indicando falha e mensagem do porque falhou.
c) EndPoint para retornar a quantidade de atores por gênero
```
app.get('/actor', async (req: Request, res: Response) => {
  try {
    const gender = req.query.gender as string
    const quantity = countActorByGender(gender)

    res.status(200).send(quantity)
  }
  catch (err) {
    res.status(400).send({
      message: err.message,
    })
  }
})
```

### Exercício 4
a) Endpoint para atualizar o salario pelo nome do Ator
```
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
```
b) Endpoint para deleta o ator pelo ID
```
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
```

### Exercício 5
- Deve ser um POST (`/movie`)
- Receber todas as informações pelo body
- Criar o filme na tabela
```
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
```

### Exercício 6
- Deve ser um GET (`/movie/all`)
- Não recebe nada
- Retorna todos os filmes. Ele deve retornar, no máximo, uma lista com 15 itens
```
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
```

### Exercício 7

