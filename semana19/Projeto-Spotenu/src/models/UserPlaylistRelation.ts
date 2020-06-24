export class UserPlaylistRelation {
  constructor(
    private userId: string,
    private playlistId: string
  ){}

  public getUserId(): string {
    return this.userId
  }

  public getPlaylistId(): string {
    return this.playlistId
  }
}