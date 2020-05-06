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
