export class MusicPlaylistRelation {
  constructor(
    private musicId: string,
    private playlistId: string
  ){}

  public getMusicId(): string {
    return this.musicId
  }

  public getPlaylistId(): string {
    return this.playlistId
  }
}