import { BaseDatabase } from "./BaseDatabase";
import { Album } from "../models/Album";

export class AlbumDatabase extends BaseDatabase {
  tableName: string = "Spotenu_Albuns"
  
  private toModel(dbModel?: any): Album | undefined {
    return (
      dbModel &&
      new Album(
        dbModel.id,
        dbModel.name,
        dbModel.band_id
      )
    )
  }

  public async createAlbum(album: Album): Promise<void> {
    await this.setConnection()
      .insert({
        id: album.getId(),
        name: album.getName(),
        band_id: album.getBandId()
      })
      .into(this.tableName);
  }

  public async getAlbumById(id: string): Promise<Album | undefined> {
    const result = await this.setConnection()
      .select("*")
      .from(this.tableName)
      .where({ id })

    return this.toModel(result[0]);
  }

}