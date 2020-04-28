class User {
    constructor(id, email, name, password) {
        console.log("Chamando o construtor da classe User");
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;
    }
    getId() {
        return this.id;
    }
    getEmail() {
        return this.email;
    }
    getName() {
        return this.name;
    }
    introduceYourself() {
        return 'Olá, bom dia. Eu sou ' + this.name;
    }
}
const eu = new User('primeiro', 'eu@eu.com', 'Eu', 'eu123');
console.log('Email: ' + eu.getEmail());
console.log('Nome: ' + eu.getName());
console.log('Id: ' + eu.getId());
class Customer extends User {
    constructor(id, email, name, password, creditCard) {
        super(id, email, name, password);
        this.purchaseTotal = 0;
        console.log("Chamando o construtor da classe Customer");
        this.creditCard = creditCard;
    }
    getCreditCard() {
        return this.creditCard;
    }
}
const newCustomer = new Customer('customer1', 'customer@customer.com', 'CUSTOMER', '123456', '1233 1233 1312 3444');
console.log('Email: ' + newCustomer.getEmail(), 'Nome: ' + newCustomer.getName(), 'Id: ' + newCustomer.getId(), 'Número do cartão: ' + newCustomer.getCreditCard(), 'Total de compras: ' + newCustomer.purchaseTotal);
console.log(newCustomer.introduceYourself());
class Employee extends User {
    constructor(id, email, name, password, admissionDate, baseSalary) {
        super(id, email, name, password);
        console.log("Chamando o construtor da classe Employee");
        this.admissionDate = admissionDate;
        this.baseSalary = baseSalary;
    }
    getAdmissionDat() {
        return this.admissionDate;
    }
    getBaseSalary() {
        return this.baseSalary;
    }
    calculateTotalSalary() {
        return this.baseSalary + 400;
    }
}
const employee = new Employee('employee1', 'employee@employee.com', 'EMPLOYEE', '123456', '28/04/2020', 3500.50);
console.log('Email: ' + employee.getEmail(), 'Nome: ' + employee.getName(), 'Id: ' + employee.getId(), 'Data de admissão: ' + employee.getAdmissionDat(), 'Salário base: ' + employee.getBaseSalary());
console.log(employee.calculateTotalSalary());
class Seller extends Employee {
    constructor() {
        super(...arguments);
        this.salesQuantity = 0;
    }
    setSalesQuantity(newValue) {
        return this.salesQuantity = newValue;
    }
    calculateTotalSalary() {
        return this.baseSalary + 400 + 5 * this.salesQuantity;
    }
}
const seller = new Seller('seller1', 'seller@selle.com', 'SELLER', 'seller1234', '20/12/2012', 3000);
console.log(seller.getName());
console.log(seller.getEmail());
console.log(seller.getId());
console.log(seller.getAdmissionDat());
console.log(seller.getBaseSalary());
console.log(seller.calculateTotalSalary());
seller.setSalesQuantity(30);
const newSeller = new Seller('seller2', 'seller2@selle.com', 'SELLER2', 'seller1234', '20/12/2015', 2500);
newSeller.setSalesQuantity(50);
console.log(newSeller.calculateTotalSalary());
//# sourceMappingURL=Exercícios_primarios.js.map