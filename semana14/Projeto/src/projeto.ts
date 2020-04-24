import { readFileSync, writeFile, } from 'fs'
import * as moment from 'moment'

const firstParameter: string = process.argv[2]
const secondParameter: string = process.argv[3]
const thirdParameter: string = process.argv[4]

type account = {
  name: string,
  CPF: number,
  birth: string,
  age: number
  id: number
  balance: number
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
  let accountsArray: account[]
  const age: number = ageFinder(birthDate)
  if (age > 18) {
    try {
      const data: Buffer = readFileSync('../database/accounts.json')
      const treatedDataJSON: string = data.toString()
      accountsArray = JSON.parse(treatedDataJSON)
    }
    catch (error) {
      console.error("Não foi possível acessar a base de dados", error)
    }

    const previousAccount: account[] = accountsArray.filter((account: account) => {
      return account.CPF === Number(cpf)
    })

    if (previousAccount.length > 0) {
      console.log("Este CPF já possui conta cadastrada")
    }
    else {
      const novaConta: account = {
        name: name,
        CPF: Number(cpf),
        birth: birthDate,
        age: ageFinder(birthDate),
        id: Date.now(),
        balance: 0
      }

      accountsArray.push(novaConta)
      try {
        writeFile('../database/accounts.json', JSON.stringify(accountsArray), 'utf8', () => { console.log("Conta criada com sucesso") })
      }
      catch{
        console.log("Erro ao criar a conta")
      }
    }
  }
  else {
    console.log("Desculpe, mas é necessário ser maior de 18 anos para criar uma conta")
  }
}

function getBalance(name: string, cpf: string) {
  let accountsArray: account[]
  try {
    const data: Buffer = readFileSync('../database/accounts.json')
    const treatedDataJSON: string = data.toString()
    accountsArray = JSON.parse(treatedDataJSON)
  }
  catch {
    console.log("Não foi possível acessar a base de dados")
  }

  const previousAccount: account[] = accountsArray.filter((account: account) => {
    return account.CPF === Number(cpf)
  })
  if (previousAccount.length > 0) {
    console.log(`Seu saldo é de: ${previousAccount[0].balance}`)
  }
  else {
    console.log('Este CPF não possui conta cadastrada')
  }
}

function addMoney(name: string, cpf: string, money: string) {
  let accountsArray: account[]
  //leitura da base de dados
  try {
    const data: Buffer = readFileSync('../database/accounts.json')
    const treatedDataJSON: string = data.toString()
    accountsArray = JSON.parse(treatedDataJSON)
  }
  catch {
    console.log("Não foi possível acessar a base de dados")
  }
  //buscando por consta existente
  const previousAccount: account[] = accountsArray.filter((account: account) => {
    return account.CPF === Number(cpf)
  })
  //Se tiver conta no array add no saldo
  if (previousAccount.length > 0) {
    accountsArray.forEach((account: account, index: number, thisArray: account[]) => {
      //Ao achar a conta, adiciona
      if (account.CPF === Number(cpf)) {
        thisArray[index].balance += Number(money)
        console.log(`Seu novo salde será de: ${thisArray[index].balance}`)
      }
    })
    //recria o novo banco de dados
    try {
      writeFile('../database/accounts.json', JSON.stringify(accountsArray), 'utf8', () => { console.log("Operação concluida com sucesso") })
    }
    catch{
      console.log("Erro ao criar a conta")
    }
  }
  //Se não tiver conta no array, avisa conta inexistente
  else {
    console.log('Este CPF não possui conta cadastrada')
  }
}

function payBill(nome: string, cpf: string, amount: string, description: string, payAt?: string) {
  let accountsArray: account[]
  //leitura da base de dados
  try {
    const data: Buffer = readFileSync('../database/accounts.json')
    const treatedDataJSON: string = data.toString()
    accountsArray = JSON.parse(treatedDataJSON)
  }
  catch {
    console.log("Não foi possível acessar a base de dados")
  }
  //buscando por consta existente
  const previousAccount: account[] = accountsArray.filter((account: account) => {
    return account.CPF === Number(cpf)
  })
  //Se tiver conta no array segue paras próximas verificações
  if (previousAccount.length > 0) {
    if 
  }
  //Se não tiver conta no array, avisa conta inexistente
  else {
    console.log('Este CPF não possui conta cadastrada')
  }
}

getBalance(firstParameter, secondParameter)