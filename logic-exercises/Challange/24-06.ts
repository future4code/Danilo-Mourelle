import * as readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const qtdQuestion = () => {
  return new Promise((res, rej) => {
    rl.question(`Quantos itens tem sua Lista?\n`, (qtd) => {
      res(qtd)
    })
  })
}

const productQuestion = (number: number) => {
  return new Promise((res, rej) => {
    rl.question(`Insira o item #${number + 1}: `, (age) => {
      res(age)
    })
  })
}

const main = async () => {
  const qtd = await qtdQuestion() as number
  let products: string[] = []
  for (let index = 0; index < qtd; index++) {
    const product = await productQuestion(index) as string
    products.push(product)
  }
  rl.close()
  console.log(`Sua lista é:\n ${products}`)
}

main()