export interface Client {
  name: string;
  // Refere-se ao nome do cliente

  registrationNumber: number;
  // Refere-se ao número de cadastro do cliente na concessionária
  // como se fosse um id

  consumedEnergy: number;
  // Refere-se à energia consumida pelo cliente no mês

  calculateBill(): number;
  // Retorna o valor da conta em reais
}

const newClient: Client = {
  name: 'Visconde de Sabugosa',
  registrationNumber: 1,
  consumedEnergy: 25,
  calculateBill(): number {
    return 4
  }
}

//***** EXERCÍCIO 1 *****//
console.log(newClient.name)
console.log(newClient.registrationNumber)
console.log(newClient.consumedEnergy)
console.log(newClient.calculateBill())
/*Sim, foi possível imprimir todas as infos pq em interface não há encapsulamento*/


export abstract class Place {
  constructor(protected cep: string) { }

  public getCep(): string {
    return this.cep;
  }

  protected static KVH_BASE_VALUE = 0.75
}

//***** EXERCÍCIO 2 *****//
//const newPlace = new Place('01234-567')
/* A. Cannot create an instance of an abstract class
   B. Tirar o abstract ou criar uma subclasse e criar uma instancia dessa subclasse */

export class Residence extends Place {
  constructor(
    protected residentsQuantity: number,
    // Refere-se ao número de moradores da casa

    cep: string
  ) {
    super(cep);
  }
  getResidentsQuantity(): number {
    return this.residentsQuantity
  }
}

export class Commerce extends Place {
  constructor(
    protected floorsQuantity: number,
    // Refere-se à quantidade de andares do lugar

    cep: string
  ) {
    super(cep);
  }

  getFloorsQuantity(): number {
    return this.floorsQuantity
  }
}

export class Industry extends Place {
  constructor(
    protected machinesQuantity: number,
    // Refere-se à quantidade de máquinas do local 

    cep: string
  ) {
    super(cep);
  }
  getMachinesQuantity(): number {
    return this.machinesQuantity
  }
}

const newResidence = new Residence(2, '04321-070')
const newCommerce = new Commerce(1, '04321-070')
const newIndustry = new Industry(20, '04321-070')
console.log(newResidence.getCep())
console.log(newCommerce.getCep())
console.log(newIndustry.getCep())

class ResidentialClient extends Residence implements Client {
  constructor(
    public name: string,
    public registrationNumber: number,
    public consumedEnergy: number,
    private cpf: string,
    cep: string,
    residentsQuantity: number
  ) {
    super(residentsQuantity, cep)
  }

  getCPF(): string {
    return this.cpf
  }

  calculateBill(): number {
    return Place.KVH_BASE_VALUE * this.consumedEnergy
  }
}

export const newResidentialClient = new ResidentialClient('Danilo Casa', 1, 30, '147258369-87', '04321-070', 2)

//***** EXERCÍCIO 4 *****//
/* A. Possui name, registrationNumber, consumedEnergy, getCEP(), getCPF(), calculateBill(), getResidentsQuantity() */

class ComercialClient extends Commerce implements Client {
  constructor(
    public name: string,
    public registrationNumber: number,
    public consumedEnergy: number,
    private cnpj: string,
    floorsQuantity: number,
    cep: string
  ) {
    super(floorsQuantity, cep)
  }

  getCNPJ(): string {
    return this.cnpj
  }

  private static KVH_DISCCOUNT: number = 0.3

  calculateBill(): number {
    return this.consumedEnergy * Place.KVH_BASE_VALUE * (1 - ComercialClient.KVH_DISCCOUNT)
  }
}

export const newComercialClient = new ComercialClient('Loja', 2, 40, '01586247/0001-58', 3, '04321-070')

//***** EXERCÍCIO 5 *****//
/* A. Tudo aquilo herdado da interface Client e da classe Place 
   B. As diferneças são os atributos e métodos definidos na própria classe (cnpj e getCNPJ())*/

class IndustrialClient extends Industry implements Client {
  constructor(
    public name: string,
    public registrationNumber: number,
    public consumedEnergy: number,
    private IncRegister: string,
    cep: string,
    machinesQuantity: number
  ) {
    super(machinesQuantity, cep)
  }

  getIncRegister(): string {
    return this.IncRegister
  }

  private static KVH_DISCCOUNT: number = 0.4
  private static VALUE_MACHINNE: number = 100

  calculateBill(): number {
    return this.consumedEnergy * Place.KVH_BASE_VALUE * (1 - IndustrialClient.KVH_DISCCOUNT) + this.machinesQuantity * IndustrialClient.VALUE_MACHINNE
  }
}
export const newIndustrialClient = new IndustrialClient('Fábrica', 3, 50, '1-6582449-87', '04321-070', 20)

//***** EXERCÍCIO 6 *****//
/* A. Vai ser filha da classe Industry
   B. Implemente a interface Client assim como as outras subclasses
   C. Muito boa pergunta, não sei....*/

class ClientManager {
  private clients: Client[] = []

  getClientQuantity(): number {
    return this.clients.length
  }

  registerClient(client: Client): void {
    this.clients.push(client)
  }

  public calculateBillOfClient(registrationNumber: number): number {

    const foundClient = this.clients.find((client) => {
      return client.registrationNumber === registrationNumber
    })

    if (foundClient) {
      // verificando se o usuário existe
      return foundClient.calculateBill()
    }

    return 0;
  }

  public calculateTotalIncome(): number {
    let TotalValue: number = 0
    this.clients.forEach((client) => {
      TotalValue += client.calculateBill()
    })
    return TotalValue
  }

  public deleteUser(registrationNumber: number): void {
    const newClientList = this.clients.filter((client) => {
      return client.registrationNumber !== registrationNumber
    })
    this.clients = newClientList
  }
}

const newClientManager = new ClientManager()
newClientManager.registerClient(newResidentialClient)
newClientManager.registerClient(newComercialClient)
newClientManager.registerClient(newIndustrialClient)

console.log(newClientManager.getClientQuantity())

