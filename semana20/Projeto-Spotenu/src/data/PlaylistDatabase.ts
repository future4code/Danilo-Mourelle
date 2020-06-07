import { BaseDatabase } from "./BaseDatabase";
import { Playlist } from "../models/Playlist";

export class PlaylistDatabase extends BaseDatabase{
  public static TABLE_NAME:string = 'Spotenu_Playlist'

  private toModel(dbModel?: any): Playlist | undefined {
    return (
      dbModel &&
      new Playlist(
        dbModel.id,
        dbModel.name,
        dbModel.customer_id,
        super.convertTinyintToBoolean(dbModel.privacy),
      )
    )
  }

  public async create(playlist: Playlist): Promise<void> {
    await this.setConnection()
      .insert({
        id: playlist.getId(),
        name: playlist.getName(),
        privacy: super.convertBooleanToTinyint(playlist.getIsPrivate()),
        customer_id: playlist.getCustomerId()
      })
      .into(PlaylistDatabase.TABLE_NAME);
  }
}