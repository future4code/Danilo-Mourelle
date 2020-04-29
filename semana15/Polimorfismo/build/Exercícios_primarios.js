"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const newClient = {
    name: 'Visconde de Sabugosa',
    registrationNumber: 1,
    consumedEnergy: 25,
    calculateBill() {
        return 4;
    }
};
console.log(newClient.name);
console.log(newClient.registrationNumber);
console.log(newClient.consumedEnergy);
console.log(newClient.calculateBill());
class Place {
    constructor(cep) {
        this.cep = cep;
    }
    getCep() {
        return this.cep;
    }
}
exports.Place = Place;
Place.KVH_BASE_VALUE = 0.75;
class Residence extends Place {
    constructor(residentsQuantity, cep) {
        super(cep);
        this.residentsQuantity = residentsQuantity;
    }
    getResidentsQuantity() {
        return this.residentsQuantity;
    }
}
exports.Residence = Residence;
class Commerce extends Place {
    constructor(floorsQuantity, cep) {
        super(cep);
        this.floorsQuantity = floorsQuantity;
    }
    getFloorsQuantity() {
        return this.floorsQuantity;
    }
}
exports.Commerce = Commerce;
class Industry extends Place {
    constructor(machinesQuantity, cep) {
        super(cep);
        this.machinesQuantity = machinesQuantity;
    }
    getMachinesQuantity() {
        return this.machinesQuantity;
    }
}
exports.Industry = Industry;
const newResidence = new Residence(2, '04321-070');
const newCommerce = new Commerce(1, '04321-070');
const newIndustry = new Industry(20, '04321-070');
console.log(newResidence.getCep());
console.log(newCommerce.getCep());
console.log(newIndustry.getCep());
class ResidentialClient extends Residence {
    constructor(name, registrationNumber, consumedEnergy, cpf, cep, residentsQuantity) {
        super(residentsQuantity, cep);
        this.name = name;
        this.registrationNumber = registrationNumber;
        this.consumedEnergy = consumedEnergy;
        this.cpf = cpf;
    }
    getCPF() {
        return this.cpf;
    }
    calculateBill() {
        return Place.KVH_BASE_VALUE * this.consumedEnergy;
    }
}
exports.newResidentialClient = new ResidentialClient('Danilo Casa', 1, 30, '147258369-87', '04321-070', 2);
class ComercialClient extends Commerce {
    constructor(name, registrationNumber, consumedEnergy, cnpj, floorsQuantity, cep) {
        super(floorsQuantity, cep);
        this.name = name;
        this.registrationNumber = registrationNumber;
        this.consumedEnergy = consumedEnergy;
        this.cnpj = cnpj;
    }
    getCNPJ() {
        return this.cnpj;
    }
    calculateBill() {
        return this.consumedEnergy * Place.KVH_BASE_VALUE * (1 - ComercialClient.KVH_DISCCOUNT);
    }
}
ComercialClient.KVH_DISCCOUNT = 0.3;
exports.newComercialClient = new ComercialClient('Loja', 2, 40, '01586247/0001-58', 3, '04321-070');
class IndustrialClient extends Industry {
    constructor(name, registrationNumber, consumedEnergy, IncRegister, cep, machinesQuantity) {
        super(machinesQuantity, cep);
        this.name = name;
        this.registrationNumber = registrationNumber;
        this.consumedEnergy = consumedEnergy;
        this.IncRegister = IncRegister;
    }
    getIncRegister() {
        return this.IncRegister;
    }
    calculateBill() {
        return this.consumedEnergy * Place.KVH_BASE_VALUE * (1 - IndustrialClient.KVH_DISCCOUNT) + this.machinesQuantity * IndustrialClient.VALUE_MACHINNE;
    }
}
IndustrialClient.KVH_DISCCOUNT = 0.4;
IndustrialClient.VALUE_MACHINNE = 100;
exports.newIndustrialClient = new IndustrialClient('Fábrica', 3, 50, '1-6582449-87', '04321-070', 20);
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
}
const newClientManager = new ClientManager();
newClientManager.registerClient(exports.newResidentialClient);
newClientManager.registerClient(exports.newComercialClient);
newClientManager.registerClient(exports.newIndustrialClient);
console.log(newClientManager.getClientQuantity());
//# sourceMappingURL=Exercícios_primarios.js.map