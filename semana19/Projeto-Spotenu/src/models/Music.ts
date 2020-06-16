export class Music{
  constructor(
    private id: string,
    private name: string,
    private albumId: string,
    private bandId: string
  ){}

  public getId(): string {
    return this.id
  }

  public getName(): string{
    return this.name
  }
  
  public getAlbumId():string{
    return this.albumId
  }

  public getBandId():string{
    return this.bandId
  }
}