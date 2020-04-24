import { readFileSync, writeFile, } from 'fs'
import * as moment from 'moment'

//Types
type account = {
    name: string,
    CPF: number,
    birth: string,
    age: number
    id: number
    balance: number
    statement: bankStatement[]
}
type bankStatement = {
    operation: string,
    description?: string,
    date: Date | string,
    value: number,
    operationId: number
}

//Enums
enum operations {
    add = 'Depósito',
    pay = 'Pagamento'
}
//*******FUNÇÕES DE APOIO**********/
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
function getNewBalance(database: account[], accountId: number): number {
    let result: number = database[accountId].statement.reduce(
        (accumulator: number, current: bankStatement): number => {
            return (current.operation === operations.add ? accumulator + current.value : accumulator - current.value)
        }, 0)
    return result
}

//************OPERAÇÕES BANCÁRIAS*************/
export function createAccount(name: string, cpf: string, birthDate: string) {
    let accountsArray: account[]
    const age: number = ageFinder(birthDate)
    if (age > 18) {
        try {
            const data: Buffer = readFileSync('../../database/accounts.json')
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
                balance: 0,
                statement: []
            }

            accountsArray.push(novaConta)
            try {
                writeFile('../../database/accounts.json', JSON.stringify(accountsArray), 'utf8', () => { console.log("Conta criada com sucesso") })
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

export function getBalance(name: string, cpf: string) {
    let accountsArray: account[]
    try {
        const data: Buffer = readFileSync('../../database/accounts.json')
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

export function addMoney(name: string, cpf: string, money: string) {
    let accountsArray: account[]
    let accountIndex: number
    //leitura da base de dados
    try {
        const data: Buffer = readFileSync('../../database/accounts.json')
        const treatedDataJSON: string = data.toString()
        accountsArray = JSON.parse(treatedDataJSON)
    }
    catch {
        console.log("Não foi possível acessar a base de dados")
    }
    //buscando por consta existente
    const previousAccount: account[] = accountsArray.filter((account: account, index: number) => {
        if (account.CPF === Number(cpf)) {
            accountIndex = index
            return true
        }
    })
    //Se tiver conta no array add no saldo
    if (previousAccount.length > 0) {
        accountsArray[accountIndex].statement.push({
            operation: operations.add,
            date: moment().format("DD/MM/YYYY"),
            value: Number(money),
            operationId: Date.now()
        })
        console.log(`Seu novo salde será de: ${accountsArray[accountIndex].balance + Number(money)}`)
        //Colocar a funcção que recalcula o saldo

        //recria o novo banco de dados
        try {
            writeFile('../../database/accounts.json', JSON.stringify(accountsArray), 'utf8', () => { console.log("Operação concluida com sucesso") })
        }
        catch{
            console.log("Erro ao enviar operação")
        }
    }
    //Se não tiver conta no array, avisa conta inexistente
    else {
        console.log('Este CPF não possui conta cadastrada')
    }
}


export function payBill(nome: string, cpf: string, amount: string, description: string, payAt?: string) {
    let accountsArray: account[]
    let accountIndex: number
    let validPayAt: boolean = false
    //Verifica se data não no passado
    if (payAt) {
        const today: moment.Moment = moment()
        const payDate: moment.Moment = moment(payAt, "DD/MM/YYYY")
        const diffInDay: number = today.diff(payDate, 'days')
        validPayAt = (diffInDay >= 0 ? true : false)
    }
    //Se data válida para transação
    if (validPayAt) {
        //leitura da base de dados
        try {
            const data: Buffer = readFileSync('../../database/accounts.json')
            const treatedDataJSON: string = data.toString()
            accountsArray = JSON.parse(treatedDataJSON)
        }
        catch {
            console.log("Não foi possível acessar a base de dados")
        }
        //buscando por consta existente
        const previousAccount: account[] = accountsArray.filter((account: account, index: number) => {
            if (account.CPF === Number(cpf)) {
                accountIndex = index
                return true
            }
        })
        //Se tiver conta no array segue paras próximas verificações
        if (previousAccount.length > 0) {
            //Se saldo menor que valor da conta, não realiza operação
            if (accountsArray[accountIndex].balance < Number(amount)) {
                console.log('Saldo insuficiente para executar essa operação')
            }
            else {
                accountsArray[accountIndex].statement.push({
                    operation: operations.pay,
                    description: description,
                    date: moment(payAt, 'DD/MM/YYY').format('DD/MM/YYY'),
                    value: Number(amount),
                    operationId: Date.now()
                })
                console.log(`Seu novo salde será de: ${accountsArray[accountIndex].balance - Number(amount)}`)
                //Colocar a funcção que recalcula o saldo

                //recria o novo banco de dados
                try {
                    writeFile('../../database/accounts.json', JSON.stringify(accountsArray), 'utf8', () => { console.log("Operação concluida com sucesso") })
                }
                catch{
                    console.log("Erro ao enviar operação")
                }
            }
        }
        //Se não tiver conta no array, avisa conta inexistente
        else {
            console.log('Este CPF não possui conta cadastrada')
        }
    }
}
