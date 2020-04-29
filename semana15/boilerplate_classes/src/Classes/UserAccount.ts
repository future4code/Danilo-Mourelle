import { bankStatement, ageFinder } from "../Functions/functions"
import * as moment from 'moment'

export class Account {
    private name: string
    private CPF: number
    private birthDate: string
    private age: number
    private id: number
    private balance: number
    private statement: bankStatement[]

    constructor(name: string, cpf: string, birthDate: string, age: number) {
        this.name = name
        this.CPF = Number(cpf)
        this.birthDate = moment(birthDate, "DD/MM/YYYY").format("DD/MM/YYY")
        this.age = age
        this.id = Date.now()
        this.balance = 0
        this.statement = []
    }
    getAccountCPF(){
        return this.CPF
    }

    getBalance(){
        return this.balance
    }

    addBalance(value: number){
        this.balance += value
    }
}
