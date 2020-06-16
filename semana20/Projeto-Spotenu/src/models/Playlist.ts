export class Playlist {
  constructor(
    private id: string,
    private name: string,
    private customerId: string,
    private isPrivate: boolean
  ){}

  public getId(): string{
    return this.id
  }

  public getName(): string {
    return this.name
  }

  public getCustomerId(): string {
    return this.customerId
  }

  public getIsPrivate(): boolean {
    return this.isPrivate
  }
}