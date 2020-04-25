"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const moment = require("moment");
var operations;
(function (operations) {
    operations["add"] = "Dep\u00F3sito";
    operations["pay"] = "Pagamento";
    operations["sendTransfer"] = "Tranfer\u00EAncia Enviada";
    operations["receveidTransfer"] = "Transfer\u00EAncia Recebida";
})(operations || (operations = {}));
function ageFinder(birthDate) {
    const today = new Date();
    const birthDateParts = birthDate.split('/');
    const birthday = new Date(Number(birthDateParts[2]), Number(birthDateParts[1]) - 1, Number(birthDateParts[0]));
    if ((birthday.getMonth() > today.getMonth()) || (birthday.getMonth() === today.getMonth() && birthday.getDate() > today.getDate())) {
        return (today.getFullYear() - birthday.getFullYear() - 1);
    }
    else {
        return (today.getFullYear() - birthday.getFullYear());
    }
}
function getNewBalance(database, accountId) {
    let result = database[accountId].statement.reduce((accumulator, currentOperation) => {
        switch (currentOperation.operation) {
            case operations.add:
                return accumulator + currentOperation.value;
            case operations.pay:
                const operationDate = moment(currentOperation.date, "DD/MM/YYYY");
                const today = moment();
                console.log(operationDate.diff(today, 'days'));
                return (operationDate.diff(today, 'days') > 0 ? accumulator : accumulator - currentOperation.value);
            case operations.receveidTransfer:
                return accumulator + currentOperation.value;
            case operations.sendTransfer:
                return accumulator - currentOperation.value;
            default:
                console.log('Se der erro aqui!!! Fudeu');
                break;
        }
    }, 0);
    return result;
}
function createAccount(name, cpf, birthDate) {
    let accountsArray;
    const age = ageFinder(birthDate);
    if (age >= 18) {
        try {
            const data = fs_1.readFileSync(require('path').resolve(__dirname, '../../database/accounts.json'));
            const treatedDataJSON = data.toString();
            accountsArray = JSON.parse(treatedDataJSON);
        }
        catch (error) {
            console.error("Não foi possível acessar a base de dados", error);
        }
        const previousAccount = accountsArray.filter((account) => {
            return account.CPF === Number(cpf);
        });
        if (previousAccount.length > 0) {
            console.log("Este CPF já possui conta cadastrada");
        }
        else {
            const novaConta = {
                name: name,
                CPF: Number(cpf),
                birth: birthDate,
                age: ageFinder(birthDate),
                id: Date.now(),
                balance: 0,
                statement: []
            };
            accountsArray.push(novaConta);
            try {
                fs_1.writeFile(require('path').resolve(__dirname, '../../database/accounts.json'), JSON.stringify(accountsArray), 'utf8', () => { console.log("Conta criada com sucesso"); });
            }
            catch (_a) {
                console.log("Erro ao criar a conta");
            }
        }
    }
    else {
        console.log("Desculpe, mas é necessário ser maior de 18 anos para criar uma conta");
    }
}
exports.createAccount = createAccount;
function getBalance(name, cpf) {
    let accountsArray;
    try {
        const data = fs_1.readFileSync(require('path').resolve(__dirname, '../../database/accounts.json'));
        const treatedDataJSON = data.toString();
        accountsArray = JSON.parse(treatedDataJSON);
    }
    catch (_a) {
        console.log("Não foi possível acessar a base de dados");
    }
    const previousAccount = accountsArray.filter((account) => {
        return account.CPF === Number(cpf);
    });
    if (previousAccount.length === 1 && previousAccount[0].name === name) {
        console.log(`Seu saldo é de: ${previousAccount[0].balance}`);
    }
    else {
        console.log('Este CPF/Nome não possui conta cadastrada');
    }
}
exports.getBalance = getBalance;
function addMoney(name, cpf, money) {
    let accountsArray;
    let accountIndex;
    try {
        const data = fs_1.readFileSync(require('path').resolve(__dirname, '../../database/accounts.json'));
        const treatedDataJSON = data.toString();
        accountsArray = JSON.parse(treatedDataJSON);
    }
    catch (_a) {
        console.log("Não foi possível acessar a base de dados");
    }
    const previousAccount = accountsArray.filter((account, index) => {
        if (account.CPF === Number(cpf)) {
            accountIndex = index;
            return true;
        }
    });
    if (previousAccount.length === 1 && previousAccount[0].name === name) {
        accountsArray[accountIndex].statement.push({
            operation: operations.add,
            date: moment().format("DD/MM/YYYY"),
            value: Number(money),
            operationId: Date.now()
        });
        console.log(`Seu novo salde será de: ${accountsArray[accountIndex].balance + Number(money)}`);
        const newBalance = getNewBalance(accountsArray, accountIndex);
        accountsArray[accountIndex].balance = newBalance;
        try {
            fs_1.writeFile(require('path').resolve(__dirname, '../../database/accounts.json'), JSON.stringify(accountsArray), 'utf8', () => { console.log("Operação concluida com sucesso"); });
        }
        catch (_b) {
            console.log("Erro ao enviar operação");
        }
    }
    else {
        console.log('Este CPF/Nome não possui conta cadastrada');
    }
}
exports.addMoney = addMoney;
function payBill(name, cpf, amount, description, payAt) {
    let accountsArray;
    let accountIndex;
    let validPayAt = true;
    if (payAt) {
        const today = moment();
        const payDate = moment(payAt, "DD/MM/YYYY");
        const diffInDay = payDate.diff(today, 'days');
        validPayAt = (diffInDay >= 0 ? true : false);
    }
    if (validPayAt) {
        try {
            const data = fs_1.readFileSync(require('path').resolve(__dirname, '../../database/accounts.json'));
            const treatedDataJSON = data.toString();
            accountsArray = JSON.parse(treatedDataJSON);
        }
        catch (_a) {
            console.log("Não foi possível acessar a base de dados");
        }
        const previousAccount = accountsArray.filter((account, index) => {
            if (account.CPF === Number(cpf)) {
                accountIndex = index;
                return true;
            }
            else {
                return false;
            }
        });
        if (previousAccount.length === 1 && previousAccount[0].name === name) {
            if (accountsArray[accountIndex].balance < Number(amount)) {
                console.log('Saldo insuficiente para executar essa operação');
            }
            else {
                accountsArray[accountIndex].statement.push({
                    operation: operations.pay,
                    description: description,
                    date: (payAt ? moment(payAt, 'DD/MM/YYYY').format('DD/MM/YYYY') : moment().format('DD/MM/YYYY')),
                    value: Number(amount),
                    operationId: Date.now()
                });
                const newBalance = getNewBalance(accountsArray, accountIndex);
                accountsArray[accountIndex].balance = newBalance;
                try {
                    fs_1.writeFile(require('path').resolve(__dirname, '../../database/accounts.json'), JSON.stringify(accountsArray), 'utf8', () => { console.log("Operação concluida com sucesso"); });
                }
                catch (_b) {
                    console.log("Erro ao enviar operação");
                }
            }
        }
        else {
            console.log('Este CPF/Nome não possui conta cadastrada');
        }
    }
    else {
        console.log("Data de agendamendo inválida, por favor coloque uma data no formato requerido e/ou no futuro");
    }
}
exports.payBill = payBill;
function performTransfer(senderName, cpfSender, destName, cpfDest, value) {
    let accountsArray;
    let senderAccountIndex;
    let destAccountIndex;
    try {
        const data = fs_1.readFileSync(require('path').resolve(__dirname, '../../database/accounts.json'));
        const treatedDataJSON = data.toString();
        accountsArray = JSON.parse(treatedDataJSON);
    }
    catch (_a) {
        console.log("Não foi possível acessar a base de dados");
    }
    const previousAccount = accountsArray.filter((account, index) => {
        if (account.CPF === Number(cpfSender)) {
            senderAccountIndex = index;
            return true;
        }
        else if (account.CPF === Number(cpfDest)) {
            destAccountIndex = index;
            return true;
        }
        else {
            return false;
        }
    });
    if (previousAccount.length === 2 && accountsArray[senderAccountIndex].name === senderName && accountsArray[destAccountIndex].name === destName) {
        accountsArray[senderAccountIndex].statement.push({
            operation: operations.sendTransfer,
            date: moment().format("DD/MM/YYYY"),
            value: Number(value),
            operationId: Date.now()
        });
        accountsArray[destAccountIndex].statement.push({
            operation: operations.receveidTransfer,
            date: moment().format("DD/MM/YYYY"),
            value: Number(value),
            operationId: Date.now()
        });
        const newSenderBalance = getNewBalance(accountsArray, senderAccountIndex);
        accountsArray[senderAccountIndex].balance = newSenderBalance;
        const newDestBalance = getNewBalance(accountsArray, destAccountIndex);
        accountsArray[destAccountIndex].balance = newDestBalance;
        try {
            fs_1.writeFile(require('path').resolve(__dirname, '../../database/accounts.json'), JSON.stringify(accountsArray), 'utf8', () => { console.log("Operação concluida com sucesso"); });
        }
        catch (_b) {
            console.log("Erro ao enviar operação");
        }
    }
    else {
        console.log('Os dados fornecidos não encontraram constas de Destinatário e/ou Remetente');
    }
}
exports.performTransfer = performTransfer;
//# sourceMappingURL=functions.js.map