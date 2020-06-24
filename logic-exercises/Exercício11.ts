import * as readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let name, age
const nameQuestion = () => {
  return new Promise((res, rej) => {
    rl.question(`Qual o seu nome?\n`, (name) => {
      res(name)
    })
  })
}

const ageQuestion = () => {
  return new Promise((res, rej) => {
    rl.question(`Qual a sua idade?\n`, (age) => {
      res(age)
    })
  })
}

const main = async () => {
  const nome = await nameQuestion()
  const idade = await ageQuestion()
  rl.close()
  console.log({ nome, idade })
}

main()