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
    pay = 'Pagamento',
    sendTransfer = 'Tranferência Enviada',
    receveidTransfer = 'Transferência Recebida'
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
            switch (current.operation) {
                case operations.add:
                    return accumulator + current.value

                case operations.pay:
                    const operationDate: moment.Moment = moment(current.date, "DD/MM/YYYY")
                    const today: moment.Moment = moment()
                    return (operationDate.diff(today, 'days') > 0 ? accumulator : accumulator - current.value)

                case operations.receveidTransfer:
                    return accumulator + current.value

                case operations.sendTransfer:
                    return accumulator - current.value

                default:
                    console.log('Se der erro aqui!!! Fudeu')
                    break;
            }
        }, 0)
    return result
}

//************OPERAÇÕES BANCÁRIAS*************/
export function createAccount(name: string, cpf: string, birthDate: string) {
    let accountsArray: account[]
    //Função de apoio que retorna idade
    const age: number = ageFinder(birthDate)
    //Se idade maior que 18 anos
    if (age > 18) {
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
        const previousAccount: account[] = accountsArray.filter((account: account) => {
            return account.CPF === Number(cpf)
        })
        //Se tiver conta no array recusa a criação de nova conta
        if (previousAccount.length > 0) {
            console.log("Este CPF já possui conta cadastrada")
        }
        //Não tendo conta, segue para criação de nova conta
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

export function getBalance(name: string, cpf: string) {
    let accountsArray: account[]
    //Se idade maior que 18 anos
    try {
        const data: Buffer = readFileSync(require('path').resolve(__dirname, '../../database/accounts.json'))
        const treatedDataJSON: string = data.toString()
        accountsArray = JSON.parse(treatedDataJSON)
    }
    catch {
        console.log("Não foi possível acessar a base de dados")
    }
    //Buscando por consta existente
    const previousAccount: account[] = accountsArray.filter((account: account) => {
        return account.CPF === Number(cpf)
    })
    //Se tiver conta no array e nome da conta igual ao nome inserido segue paras próximas verificações
    if (previousAccount.length === 1 && previousAccount[0].name === name) {
        console.log(`Seu saldo é de: ${previousAccount[0].balance}`)
    }
    else {
        console.log('Este CPF/Nome não possui conta cadastrada')
    }
}

export function addMoney(name: string, cpf: string, money: string) {
    let accountsArray: account[]
    let accountIndex: number
    //Leitura da base de dados
    try {
        const data: Buffer = readFileSync(require('path').resolve(__dirname, '../../database/accounts.json'))
        const treatedDataJSON: string = data.toString()
        accountsArray = JSON.parse(treatedDataJSON)
    }
    catch {
        console.log("Não foi possível acessar a base de dados")
    }
    //Buscando por consta existente
    const previousAccount: account[] = accountsArray.filter((account: account, index: number) => {
        if (account.CPF === Number(cpf)) {
            accountIndex = index
            return true
        }
    })
    //Se tiver conta no array e nome da conta igual ao nome inserido cria operação depósito no extrato
    if (previousAccount.length === 1 && previousAccount[0].name === name) {
        accountsArray[accountIndex].statement.push({
            operation: operations.add,
            date: moment().format("DD/MM/YYYY"),
            value: Number(money),
            operationId: Date.now()
        })
        console.log(`Seu novo salde será de: ${accountsArray[accountIndex].balance + Number(money)}`)
        //Função de apoio que recalcula o saldo
        const newBalance: number = getNewBalance(accountsArray, accountIndex)
        accountsArray[accountIndex].balance = newBalance
        //Recria o arquivo do banco de dados com a nova conta
        try {
            writeFile(require('path').resolve(__dirname, '../../database/accounts.json'), JSON.stringify(accountsArray), 'utf8', () => { console.log("Operação concluida com sucesso") })
        }
        catch{
            console.log("Erro ao enviar operação")
        }
    }
    //Se não tiver conta no array, avisa conta inexistente
    else {
        console.log('Este CPF/Nome não possui conta cadastrada')
    }
}


export function payBill(name: string, cpf: string, amount: string, description: string, payAt?: string) {
    let accountsArray: account[]
    let accountIndex: number
    let validPayAt: boolean = false
    //Valida se data não está no passado
    if (payAt) {
        const today: moment.Moment = moment()
        const payDate: moment.Moment = moment(payAt, "DD/MM/YYYY")
        const diffInDay: number = today.diff(payDate, 'days')
        validPayAt = (diffInDay >= 0 ? true : false)
    }
    //Se data válida para transação
    if (validPayAt) {
        //Leitura da base de dados
        try {
            const data: Buffer = readFileSync(require('path').resolve(__dirname, '../../database/accounts.json'))
            const treatedDataJSON: string = data.toString()
            accountsArray = JSON.parse(treatedDataJSON)
        }
        catch {
            console.log("Não foi possível acessar a base de dados")
        }
        //Buscando por consta existente e index da conta na base de dados
        const previousAccount: account[] = accountsArray.filter((account: account, index: number) => {
            if (account.CPF === Number(cpf)) {
                accountIndex = index
                return true
            }
            else {
                return false
            }
        })
        //Se tiver conta no array e nome da conta igual ao nome inserido segue paras próximas verificações
        if (previousAccount.length === 1 && previousAccount[0].name === name) {
            //Se saldo menor que valor da conta, não realiza operação
            if (accountsArray[accountIndex].balance < Number(amount)) {
                console.log('Saldo insuficiente para executar essa operação')
            }
            //Se saldo maior que valor da conta, cria operação de pagamento no extrato
            else {
                accountsArray[accountIndex].statement.push({
                    operation: operations.pay,
                    description: description,
                    date: moment(payAt, 'DD/MM/YYY').format('DD/MM/YYY'),
                    value: Number(amount),
                    operationId: Date.now()
                })
                //Função de apoio que recalcula o saldo
                const newBalance: number = getNewBalance(accountsArray, accountIndex)
                accountsArray[accountIndex].balance = newBalance
                //recria o novo banco de dados
                try {
                    writeFile(require('path').resolve(__dirname, '../../database/accounts.json'), JSON.stringify(accountsArray), 'utf8', () => { console.log("Operação concluida com sucesso") })
                }
                catch{
                    console.log("Erro ao enviar operação")
                }
            }
        }
        //Se não tiver conta no array, avisa conta inexistente
        else {
            console.log('Este CPF/Nome não possui conta cadastrada')
        }
    }
    //Notifica data de pagamento iválida
    else {
        console.log("Data de agendamendo inválida, por favor coloque uma data no formato requerido e/ou no futuro")
    }
}

export function performTransfer(senderName: string, cpfSender: string, destName: string, cpfDest: string, value: string) {
    let accountsArray: account[]
    let senderAccountIndex: number
    let destAccountIndex: number
    //Leitura da base de dados
    try {
        const data: Buffer = readFileSync(require('path').resolve(__dirname, '../../database/accounts.json'))
        const treatedDataJSON: string = data.toString()
        accountsArray = JSON.parse(treatedDataJSON)
    }
    catch {
        console.log("Não foi possível acessar a base de dados")
    }
    //Buscando por consta existente e index da conta na base de dados
    const previousAccount: account[] = accountsArray.filter((account: account, index: number) => {
        if (account.CPF === Number(cpfSender)) {
            senderAccountIndex = index
            return true
        }
        else if (account.CPF === Number(cpfDest)) {
            destAccountIndex = index
            return true
        }
        else {
            return false
        }
    })
    //Se tiver contas no array e nomes das contas iguais aos nomes inseridos cria operação de transferência no extrato
    if (previousAccount.length === 2 && accountsArray[senderAccountIndex].name === senderName && accountsArray[destAccountIndex].name === destName) {
        //Criando a operação de Envio de Transfer na conta do Sender
        accountsArray[senderAccountIndex].statement.push({
            operation: operations.sendTransfer,
            date: moment().format("DD/MM/YYYY"),
            value: Number(value),
            operationId: Date.now()
        })
        //Criando a operação de Recebimento de Transfer na conta do Dest
        accountsArray[senderAccountIndex].statement.push({
            operation: operations.receveidTransfer,
            date: moment().format("DD/MM/YYYY"),
            value: Number(value),
            operationId: Date.now()
        })
        //Função de apoio que recalcula o saldo do Sender
        const newSenderBalance: number = getNewBalance(accountsArray, senderAccountIndex)
        accountsArray[senderAccountIndex].balance = newSenderBalance
        //Função de apoio que recalcula o saldo do Dest
        const newDestBalance: number = getNewBalance(accountsArray, destAccountIndex)
        accountsArray[destAccountIndex].balance = newDestBalance
        //Recria o arquivo do banco de dados com a nova conta
        try {
            writeFile(require('path').resolve(__dirname, '../../database/accounts.json'), JSON.stringify(accountsArray), 'utf8', () => { console.log("Operação concluida com sucesso") })
        }
        catch{
            console.log("Erro ao enviar operação")
        }
    }
    //Notifica que algum dato está inválido
    else {
        console.log('Os dados fornecidos não encontraram constas de Destinatário e/ou Remetente')
    }
}
