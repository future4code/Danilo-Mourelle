"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const firstParameter = process.argv[2];
const secondParameter = process.argv[3];
const thirdParameter = process.argv[4];
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
function createAccount(name, cpf, birthDate) {
    let accountsArray;
    try {
        const data = fs_1.readFileSync('../database/accounts.json');
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
            balance: 0
        };
        accountsArray.push(novaConta);
        try {
            fs_1.writeFile('../database/accounts.json', JSON.stringify(accountsArray), 'utf8', () => { console.log("Conta criada com sucesso"); });
        }
        catch (_a) {
            console.log("Erro ao criar a conta");
        }
    }
}
function getBalance(name, cpf) {
    let accountsArray;
    try {
        const data = fs_1.readFileSync('../database/accounts.json');
        const treatedDataJSON = data.toString();
        accountsArray = JSON.parse(treatedDataJSON);
    }
    catch (_a) {
        console.log("Não foi possível acessar a base de dados");
    }
    const previousAccount = accountsArray.filter((account) => {
        return account.CPF === Number(cpf);
    });
    if (previousAccount.length > 0) {
        console.log(`Seu saldo é de: ${previousAccount[0].balance}`);
    }
    else {
        console.log('Este CPF não possui conta cadastrada');
    }
}
getBalance(firstParameter, secondParameter);
//# sourceMappingURL=projeto.js.map