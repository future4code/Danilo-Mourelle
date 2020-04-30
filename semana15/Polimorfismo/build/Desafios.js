"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exerc_cios_primarios_1 = require("./Exerc\u00EDcios_primarios");
class ClientPersistence {
    static ADD_REGISTRATION(registration) {
        ClientPersistence.CLIENTS_REGISTRATION_NUMBER.push(registration);
    }
}
ClientPersistence.CLIENTS_REGISTRATION_NUMBER = [];
class ResidentialClient extends Exerc_cios_primarios_1.Residence {
    constructor(name, registrationNumber, consumedEnergy, cpf, cep, residentsQuantity) {
        super(residentsQuantity, cep);
        this.name = name;
        this.registrationNumber = registrationNumber;
        this.consumedEnergy = consumedEnergy;
        this.cpf = cpf;
        const existingClient = ClientPersistence.CLIENTS_REGISTRATION_NUMBER.find((number) => {
            return number === registrationNumber;
        });
        if (existingClient) {
            throw new Error(`Já existe um usuário com o número ${registrationNumber}`);
        }
        else {
            ClientPersistence.ADD_REGISTRATION(registrationNumber);
        }
    }
    getCPF() {
        return this.cpf;
    }
    calculateBill() {
        return Exerc_cios_primarios_1.Place.KVH_BASE_VALUE * this.consumedEnergy;
    }
}
class ComercialClient extends Exerc_cios_primarios_1.Commerce {
    constructor(name, registrationNumber, consumedEnergy, cnpj, floorsQuantity, cep) {
        super(floorsQuantity, cep);
        this.name = name;
        this.registrationNumber = registrationNumber;
        this.consumedEnergy = consumedEnergy;
        this.cnpj = cnpj;
        const existingClient = ClientPersistence.CLIENTS_REGISTRATION_NUMBER.find((number) => {
            return number === registrationNumber;
        });
        if (existingClient) {
            throw new Error(`Já existe um usuário com o número ${registrationNumber}`);
        }
        else {
            ClientPersistence.ADD_REGISTRATION(registrationNumber);
        }
    }
    getCNPJ() {
        return this.cnpj;
    }
    calculateBill() {
        return this.consumedEnergy * Exerc_cios_primarios_1.Place.KVH_BASE_VALUE * (1 - ComercialClient.KVH_DISCCOUNT);
    }
}
ComercialClient.KVH_DISCCOUNT = 0.3;
class IndustrialClient extends Exerc_cios_primarios_1.Industry {
    constructor(name, registrationNumber, consumedEnergy, IncRegister, cep, machinesQuantity) {
        super(machinesQuantity, cep);
        this.name = name;
        this.registrationNumber = registrationNumber;
        this.consumedEnergy = consumedEnergy;
        this.IncRegister = IncRegister;
        const existingClient = ClientPersistence.CLIENTS_REGISTRATION_NUMBER.find((number) => {
            return number === registrationNumber;
        });
        if (existingClient) {
            throw `Já existe um usuário com o número ${registrationNumber}`;
        }
        else {
            ClientPersistence.ADD_REGISTRATION(registrationNumber);
        }
    }
    getIncRegister() {
        return this.IncRegister;
    }
    calculateBill() {
        return this.consumedEnergy * Exerc_cios_primarios_1.Place.KVH_BASE_VALUE * (1 - IndustrialClient.KVH_DISCCOUNT) + this.machinesQuantity * IndustrialClient.VALUE_MACHINNE;
    }
}
IndustrialClient.KVH_DISCCOUNT = 0.4;
IndustrialClient.VALUE_MACHINNE = 100;
class ClientManager {
    constructor() {
        this.clients = [];
    }
    getClientQuantity() {
        return this.clients.length;
    }
    registerClient(client) {
        this.clients.push(client);
    }
    calculateBillOfClient(registrationNumber) {
        const foundClient = this.clients.find((client) => {
            return client.registrationNumber === registrationNumber;
        });
        if (foundClient) {
            return foundClient.calculateBill();
        }
        return 0;
    }
    calculateTotalIncome() {
        let TotalValue = 0;
        this.clients.forEach((client) => {
            TotalValue += client.calculateBill();
        });
        return TotalValue;
    }
    deleteUser(registrationNumber) {
        const newClientList = this.clients.filter((client) => {
            return client.registrationNumber !== registrationNumber;
        });
        this.clients = newClientList;
    }
    printAllClients() {
        this.clients.forEach((client) => {
            console.log(client.name + ' - ' +
                client.registrationNumber + ' - ' +
                client.consumedEnergy + ' - ' +
                client.calculateBill());
        });
    }
}
const newClientManager = new ClientManager();
let newComercialClient, newResidentialClient, newIndustrialClient;
try {
    newResidentialClient = new ResidentialClient('Danilo Casa', 1, 30, '147258369-87', '04321-070', 2);
    newClientManager.registerClient(newResidentialClient);
}
catch (error) {
    console.error(error);
}
try {
    newComercialClient = new ComercialClient('Loja', 2, 40, '01586247/0001-58', 3, '04321-070');
    newClientManager.registerClient(newComercialClient);
}
catch (error) {
    console.error(error);
}
try {
    newIndustrialClient = new IndustrialClient('Fábrica', 2, 50, '1-6582449-87', '04321-070', 20);
    newClientManager.registerClient(newIndustrialClient);
}
catch (error) {
    console.error(error);
}
newClientManager.printAllClients();
//# sourceMappingURL=Desafios.js.map