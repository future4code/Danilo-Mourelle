const readline = (require("readline"))

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const getNumber = () => {
  return new Promise((res, rej) => {
    rl.question('', (number) => {
      res(number)
    })
  })
}


const main = async () => {
  let sum = 0
  let number
  console.log('Caculadora')
  do {
    number = await getNumber()
    sum += Number(number)
  } while (number != '0')
  rl.close()
  console.log(sum)
}

main()