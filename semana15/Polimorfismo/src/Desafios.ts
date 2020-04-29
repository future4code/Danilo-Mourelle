import { Client, Residence, Place, Commerce, Industry } from "./Exercícios_primarios"

abstract class ClientPersistence {
  public static CLIENTS_REGISTRATION_NUMBER: number[] = [];

  public static ADD_REGISTRATION(registration: number): void {
    ClientPersistence.CLIENTS_REGISTRATION_NUMBER.push(registration)
  }
}

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
    const existingClient = ClientPersistence.CLIENTS_REGISTRATION_NUMBER.find((number) => {
      return number === registrationNumber
    })

    if (existingClient) {
      throw new Error(`Já existe um usuário com o número ${registrationNumber}`)
    } else {
      ClientPersistence.ADD_REGISTRATION(registrationNumber);
    }
  }

  getCPF(): string {
    return this.cpf
  }

  calculateBill(): number {
    return Place.KVH_BASE_VALUE * this.consumedEnergy
  }
}

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
    const existingClient = ClientPersistence.CLIENTS_REGISTRATION_NUMBER.find((number) => {
      return number === registrationNumber
    })

    if (existingClient) {
      throw new Error(`Já existe um usuário com o número ${registrationNumber}`)
    } else {
      ClientPersistence.ADD_REGISTRATION(registrationNumber);
    }
  }

  getCNPJ(): string {
    return this.cnpj
  }

  private static KVH_DISCCOUNT: number = 0.3

  calculateBill(): number {
    return this.consumedEnergy * Place.KVH_BASE_VALUE * (1 - ComercialClient.KVH_DISCCOUNT)
  }
}

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
    const existingClient = ClientPersistence.CLIENTS_REGISTRATION_NUMBER.find((number) => {
      return number === registrationNumber
    })

    if (existingClient) {
      throw `Já existe um usuário com o número ${registrationNumber}`
    } else {
      ClientPersistence.ADD_REGISTRATION(registrationNumber);
    }
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

  public printAllClients(): void {
    this.clients.forEach((client) => {
      console.log(
        client.name + ' - ' +
        client.registrationNumber + ' - ' +
        client.consumedEnergy + ' - ' +
        client.calculateBill()
      )
    })
  }
}

const newClientManager = new ClientManager()

let newComercialClient: ComercialClient, newResidentialClient: ResidentialClient, newIndustrialClient: IndustrialClient

try {
  newResidentialClient = new ResidentialClient('Danilo Casa', 1, 30, '147258369-87', '04321-070', 2)
  newClientManager.registerClient(newResidentialClient)
}
catch (error) {
  console.error(error)
}
try {
  newComercialClient = new ComercialClient('Loja', 2, 40, '01586247/0001-58', 3, '04321-070')
  newClientManager.registerClient(newComercialClient)
}
catch (error) {
  console.error(error)
}
try {
  newIndustrialClient = new IndustrialClient('Fábrica', 2, 50, '1-6582449-87', '04321-070', 20)
  newClientManager.registerClient(newIndustrialClient)
}
catch (error) {
  console.error(error)
}


newClientManager.printAllClients()