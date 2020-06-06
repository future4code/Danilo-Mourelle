import { BaseDatabase } from "./BaseDatabase";
import { Music } from "../models/Music";

export class MusicDatabse extends BaseDatabase{
  tableName: string = 'Spotenu_Music'

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

  public async createMusic(music:Music): Promise<void> {
    await this.setConnection()
    .insert({
      id: music.getId(),
      name: music.getName(),
      album_id: music.getAlbumId(),
      band_id: music.getBandId()
    })
    .into(this.tableName)
  }

  public async getMusicByIdInAlbum(name:string, albumId: string): Promise<Music | undefined>{
   const result = await this.setConnection()
    .select("*")
    .from(this.tableName)
    .where({
      album_id: albumId,
      name
    })

    return this.toModel(result[0])
  }

  public async getAll(page:number): Promise<Music[]>{
   const result = await this.setConnection()
    .select("*")
    .from(this.tableName)
    .limit(10)
    .offset((page - 1) * 10)
    .orderBy('name')

    return result.map((music: any) => {
      return this.toModel(music) as Music
    })
  }
  
}