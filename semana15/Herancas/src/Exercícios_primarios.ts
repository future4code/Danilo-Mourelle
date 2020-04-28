class User {
  private id: string;
  private email: string;
  private name: string;
  private password: string;

  constructor(
    id: string,
    email: string,
    name: string,
    password: string
  ) {
    console.log("Chamando o construtor da classe User")
    this.id = id
    this.email = email
    this.name = name
    this.password = password
  }

  public getId(): string {
    return this.id
  }

  public getEmail(): string {
    return this.email
  }

  public getName(): string {
    return this.name
  }
  public introduceYourself(): string {
    return 'Olá, bom dia. Eu sou ' + this.name
  }
}

const eu = new User('primeiro', 'eu@eu.com', 'Eu', 'eu123')

console.log('Email: ' + eu.getEmail())
console.log('Nome: ' + eu.getName())
console.log('Id: ' + eu.getId())

//***** RESPOSTAS EXERCÍCIO 1 *****/
/*A. Não é possível pegar a senha, uma vez que ela é private e não tem nenhum getter
  B. Foi chamada 1 vez e eu nem tinha reparado*/

class Customer extends User {
  public purchaseTotal: number = 0;
  private creditCard: string;

  constructor(
    id: string,
    email: string,
    name: string,
    password: string,
    creditCard: string
  ) {
    super(id, email, name, password);
    console.log("Chamando o construtor da classe Customer");
    this.creditCard = creditCard;
  }

  public getCreditCard(): string {
    return this.creditCard;
  }
}

const newCustomer = new Customer('customer1', 'customer@customer.com', 'CUSTOMER', '123456', '1233 1233 1312 3444')

//***** RESPOSTAS EXERCÍCIO 2 *****/
/*A. 1 VEZ
B. 2 VEZES - Uma do exercício anterior e outra desse segundo exercícío uma vez que o construtor da classe Customer chama 'super' o que fez 
com que executasse o contrutor da classe User com os parametros passaddos*/

console.log(
  'Email: ' + newCustomer.getEmail(),
  'Nome: ' + newCustomer.getName(),
  'Id: ' + newCustomer.getId(),
  'Número do cartão: ' + newCustomer.getCreditCard(),
  'Total de compras: ' + newCustomer.purchaseTotal
)

//***** RESPOSTAS EXERCÍCIO 3 *****/
/* Não é possível pois a mesma está privada na classe User, inclusive não seria possível nem acessa-la dentro da subclasse Customer */

//***** RESPOSTAS EXERCÍCIO 4 *****/
console.log(newCustomer.introduceYourself())

//***** RESPOSTAS EXERCÍCIO 5 *****/
/* Ops, feito já no exercício 4.... queimei largada, sorry */

class Employee extends User {
  protected baseSalary: number
  protected admissionDate: string
  protected static BENEFITS_VALUE: number = 400

  constructor(
    id: string,
    email: string,
    name: string,
    password: string,
    admissionDate: string,
    baseSalary: number
  ) {
    super(id, email, name, password);
    console.log("Chamando o construtor da classe Employee");
    this.admissionDate = admissionDate
    this.baseSalary = baseSalary
  }

  public getAdmissionDat(): string {
    return this.admissionDate;
  }

  public getBaseSalary(): number {
    return this.baseSalary;
  }
  public calculateTotalSalary(): number {
    return this.baseSalary + Employee.BENEFITS_VALUE
  }
}

const employee = new Employee('employee1', 'employee@employee.com', 'EMPLOYEE', '123456', '28/04/2020', 3500.50)

console.log(
  'Email: ' + employee.getEmail(),
  'Nome: ' + employee.getName(),
  'Id: ' + employee.getId(),
  'Data de admissão: ' + employee.getAdmissionDat(),
  'Salário base: ' + employee.getBaseSalary()
)

//***** RESPOSTAS EXERCÍCIO 6 *****/
/* A. 1 VEZ também, igual à nova instância da subclasse Customer
   B. Todos menos a senha. */

//***** RESPOSTAS EXERCÍCIO 7 *****/
console.log(employee.calculateTotalSalary())


class Seller extends Employee {
  private salesQuantity: number = 0
  private static SELLING_COMMISSION: number = 5

  public setSalesQuantity(newValue: number): number {
    return this.salesQuantity = newValue
  }

  public calculateTotalSalary(): number {
    return this.baseSalary + Employee.BENEFITS_VALUE + Seller.SELLING_COMMISSION * this.salesQuantity
  }
}

const seller = new Seller('seller1', 'seller@selle.com', 'SELLER', 'seller1234', '20/12/2012', 3000)

console.log(seller.getName())
console.log(seller.getEmail())
console.log(seller.getId())
console.log(seller.getAdmissionDat())
console.log(seller.getBaseSalary())
console.log(seller.calculateTotalSalary())


//***** RESPOSTAS EXERCÍCIO 8 *****/
/* A. Foram necessárias todos os parametros do contrutor User + Employee
   B. Novamente não consegui acessar as infos de senha...*/

seller.setSalesQuantity(30)

//***** RESPOSTAS EXERCÍCIO 9 *****/
/* Não é possível imprimir porque não temos um getter e o atributo está com encapsulamento privado*/

const newSeller = new Seller('seller2', 'seller2@selle.com', 'SELLER2', 'seller1234', '20/12/2015', 2500)
newSeller.setSalesQuantity(50)
console.log(newSeller.calculateTotalSalary())

//***** RESPOSTAS EXERCÍCIO 10 *****/
/* Foi impresso o total com a correção da classe Employee, inclusive o VSCode passa a mostrar o calculateTotalSalary como metodo de Seller e não mais Employee */






