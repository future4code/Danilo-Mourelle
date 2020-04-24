import { readFileSync, writeFile, } from 'fs'

const firstParameter: string = process.argv[2]
const secondParameter: string = process.argv[3]
const thirdParameter: string = process.argv[4]

type account = {
  name: string,
  CPF: number,
  birth: string,
  age: number
  id: number
}

type opeações = {
  create: string,
  balance: string,
  add: string,
  pay: string,
  transf: string
}

function ageFinder(birthDate: string): number {
  const today: Date = new Date()
  const birthDateParts: string[] = birthDate.split('/')
  const birthday: Date = new Date(Number(birthDateParts[2]), Number(birthDateParts[1]) - 1, Number(birthDateParts[0]))

  if ((birthday.getMonth() > today.getMonth()) || (birthday.getMonth() === today.getMonth() && birthday.getDate() > today.getDate())) {
    return (today.getFullYear() - birthday.getFullYear() - 1)
  }
  else {
    return (today.getFullYear() - birthday.getFullYear())
  }
}

function createAccount(name: string, cpf: string, birthDate: string) {

  try {
    const data: Buffer = readFileSync('../database/accounts.json')
    const treatedDataJSON: string = data.toString()
    const accountsArray: any = JSON.parse(treatedDataJSON)

    accountsArray.forEach((account: account, array: account[]) => {
      if (account.CPF === Number(cpf)) {
        console.log("Este CPF já possui conta cadastrada")
      } else {
        const novaConta: account = {
          name: name,
          CPF: Number(cpf),
          birth: birthDate,
          age: ageFinder(birthDate),
          id: Date.now()
        }
        array.push(novaConta)
        writeFile('../database/accounts.json', JSON.stringify(array), 'utf8', () => { console.log("Conta criada com sucesso") })
      }
    });
  }
  catch (error) {
    console.error("Não foi possível verificar existência de contas", error)
  }
}