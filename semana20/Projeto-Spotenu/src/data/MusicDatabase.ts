import { BaseDatabase } from "./BaseDatabase";
import { Music } from "../models/Music";

export class MusicDatabase extends BaseDatabase {
  public static TABLE_NAME: string = 'Spotenu_Music'

  private toModel(dbModel?: any): Music | undefined {
    return (
      dbModel &&
      new Music(
        dbModel.id,
        dbModel.name,
        dbModel.album_id,
        dbModel.band_id
      )
    )
  }

  public async createMusic(music: Music): Promise<void> {
    await this.setConnection()
      .insert({
        id: music.getId(),
        name: music.getName(),
        album_id: music.getAlbumId(),
        band_id: music.getBandId()
      })
      .into(MusicDatabase.TABLE_NAME)
  }

  public async getMusicByIdInAlbum(name: string, albumId: string): Promise<Music | undefined> {
    const result = await this.setConnection()
      .select("*")
      .from(MusicDatabase.TABLE_NAME)
      .where({
        album_id: albumId,
        name
      })

    return this.toModel(result[0])
  }

  public async getAll(page: number): Promise<Music[]> {
    const result = await this.setConnection()
      .select("*")
      .from(MusicDatabase.TABLE_NAME)
      .limit(10)
      .offset((page - 1) * 10)
      .orderBy('name')

    return result.map((music: any) => {
      return this.toModel(music) as Music
    })
  }

  public async getDetails(id: string): Promise<Music | undefined> {
    const result = await this.setConnection()
      .select("*")
      .from(MusicDatabase.TABLE_NAME)



    return this.toModel(result[0])
  }
}