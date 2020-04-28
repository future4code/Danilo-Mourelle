import { readFileSync, writeFile, } from 'fs'
import * as moment from 'moment'
import { Account } from '../Classes/UserAccount'

//Types
/* type account = {
    name: string,
    CPF: number,
    birth: string,
    age: number
    id: number
    balance: number
    statement: bankStatement[]
} */
export type bankStatement = {
    operation: string,
    description?: string,
    date: Date | string,
    value: number,
    operationId: number
}

//Enums
enum operations {
    add = 'Depósito',
    pay = 'Pagamento',
    sendTransfer = 'Tranferência Enviada',
    receveidTransfer = 'Transferência Recebida'
}
//*******FUNÇÕES DE APOIO**********/
export function ageFinder(birthDate: string): number {
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
        (accumulator: number, currentOperation: bankStatement): number => {
            switch (currentOperation.operation) {
                case operations.add:
                    return accumulator + currentOperation.value

                case operations.pay:
                    const operationDate: moment.Moment = moment(currentOperation.date, "DD/MM/YYYY")
                    const today: moment.Moment = moment()
                    console.log(operationDate.diff(today, 'days'))
                    return (operationDate.diff(today, 'days') > 0 ? accumulator : accumulator - currentOperation.value)

                case operations.receveidTransfer:
                    return accumulator + currentOperation.value

                case operations.sendTransfer:
                    return accumulator - currentOperation.value

                default:
                    console.log('Se der erro aqui!!! Fudeu')
                    break;
            }
        }, 0)
    return result
}

//************OPERAÇÕES BANCÁRIAS*************/
export function createAccount(name: string, cpf: string, birthDate: string) {
    let accountsArray: Account[]
    //Função de apoio que retorna idade
    const age: number = ageFinder(birthDate)
    //Se idade maior que 18 anos
    if (age >= 18) {
        //Leitura da base de dados
        try {
            const data: Buffer = readFileSync(require('path').resolve(__dirname, '../../database/accounts.json'))
            const treatedDataJSON: string = data.toString()
            accountsArray = JSON.parse(treatedDataJSON)
        }
        catch (error) {
            console.error("Não foi possível acessar a base de dados", error)
        }
        //Buscando por consta existente
        const previousAccount: Account[] = accountsArray.filter((account: Account) => {
            return account.getAccountCPF === Number(cpf)
        })
        //Se tiver conta no array recusa a criação de nova conta
        if (previousAccount.length > 0) {
            console.log("Este CPF já possui conta cadastrada")
        }
        //Não tendo conta, segue para criação de nova conta
        else {
            const novaConta: Account = new Account(name, cpf, birthDate, age)
            /* const novaConta: account = {
                name: name,
                CPF: Number(cpf),
                birth: birthDate,
                age: ageFinder(birthDate),
                id: Date.now(),
                balance: 0,
                statement: []
            } */
            //Adiciona conta ao array da base de Dados
            accountsArray.push(novaConta)
            //Recria o arquivo do banco de dados com a nova conta
            try {
                writeFile(require('path').resolve(__dirname, '../../database/accounts.json'), JSON.stringify(accountsArray), 'utf8', () => { console.log("Conta criada com sucesso") })
            }
            catch{
                console.log("Erro ao criar a conta")
            }
        }
    }
    //Função de apoio retornou idade menor que 18 anos
    else {
        console.log("Desculpe, mas é necessário ser maior de 18 anos para criar uma conta")
    }
}