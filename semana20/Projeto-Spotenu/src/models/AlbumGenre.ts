export class AlbumGenre{
  constructor(
    private albumId: string,
    private genreid: string
    ){}

    public getAlbumId(): string{
      return this.albumId
    }

    public getGenreId():string {
      return this.genreid
    }
}