export class Product {
  constructor(
    private id:string,
    private name:string,
    private price:number,
    private imageLink:string
  ){}

  public getId(): string {
    return this.id
  }

  public getName(): string {
    return this.name
  }

  public getPrice(): number {
    return this.price
  }

  public getImageLink():string {
    return this.imageLink
  } 
}