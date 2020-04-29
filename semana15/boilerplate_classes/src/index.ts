import moment = require("moment")
import { createAccount, getBalance, addMoney, payBill, performTransfer } from "../Functions/functions"

const operation: string = process.argv[2]
const clientName: string = process.argv[3]
const clientCPF: string = process.argv[4]
const third: string = process.argv[5]
const fourth: string = process.argv[6]
const fifth: string = process.argv[7]


enum operations {

    create = "Abrir Conta",
    balance = 'Saldo',
    add = "Depositar",
    pay = 'Pagar',
    transf = 'Transferir'
}


switch (operation) {
    case operations.create:
        if (isNaN(Number(clientCPF)) || !moment(third, "DD/MM/YYYY)").isValid()) {
            console.log("Por favor digite ajuda para verificar formato dos comandos")
        }
        else {
            createAccount(clientName, clientCPF, third)
        }
        break;

    case operations.balance:
        if (isNaN(Number(clientCPF))) {
            console.log("Por favor digite ajuda para verificar formato dos comandos")
        }
        else {
            getBalance(clientName, clientCPF)
        }
        break;

    case operations.add:
        if (isNaN(Number(clientCPF)) || isNaN(Number(third))) {
            console.log("Por favor digite ajuda para verificar formato dos comandos")
        }
        else {
            addMoney(clientName, clientCPF, third)
        }
        break;

    case operations.pay:
        if (fifth) {
            if (isNaN(Number(clientCPF)) || isNaN(Number(third)) || !moment(fifth, "DD/MM/YYYY)").isValid()) {
                console.log("Por favor digite ajuda para verificar formato dos comandos")
            }
            else {
                payBill(clientName, clientCPF, third, fourth, fifth)
            }
        }
        else {
            if (isNaN(Number(clientCPF)) || isNaN(Number(third))) {
                console.log("Por favor digite ajuda para verificar formato dos comandos")
            }
            else {
                payBill(clientName, clientCPF, third, fourth)
            }
        }

        break;

    case operations.transf:
        if (isNaN(Number(clientCPF)) || isNaN(Number(fourth)) || isNaN(Number(fifth))) {
            console.log("Por favor digite ajuda para verificar formato dos comandos")
        }
        else {
            performTransfer(clientName, clientCPF, third, fourth, fifth)
        }
        break;

    case ('Ajuda'):
        console.log('\u001b[95m Os seguintes comandos estão disponíveis:\n\n Abertura de conta: "Abrir Conta" "Seu Nome" CPF(apenas números - 12345678900) data-de-nascimento(formato "DD/MM/YYYY") \n\n Verificação de Saldo: Saldo "Seu Nome" CPF(apenas números - 12345678900) \n\n Depositar: Depositar "Seu Nome" CPF(apenas números - 12345678900) Valor(formato 0.00) \n\n Pagamentos: Pagar "Seu Nome" CPF(apenas números - 12345678900) Valor(formato 0.00) Descrição Data-de-pagamento (formato "DD/MM/YYYY")\n\n Transferir: Transferir "Seu Nome" SeuCPF(apenas números - 12345678900) "Nome Destino" DestCPF(apenas números - 12345678900) Valor(formato 0.00)\n ')
        break;

    default:
        console.log("Por favor digite 'Ajuda' para verificar formato dos comandos")
        break;
}