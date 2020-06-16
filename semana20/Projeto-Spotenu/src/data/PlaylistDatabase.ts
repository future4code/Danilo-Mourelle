import { BaseDatabase } from "./BaseDatabase";
import { Playlist } from "../models/Playlist";
import { UserPlaylistRelationDatabase } from "./UserPlaylistRelationDatabase";

export class PlaylistDatabase extends BaseDatabase {
  public static TABLE_NAME: string = 'Spotenu_Playlist'

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

  public async getPlaylistById(playlistId: string): Promise<any | undefined> {
    const result = await this.setConnection()
      .raw(
        `SELECT * FROM ${PlaylistDatabase.TABLE_NAME} pl 
        LEFT JOIN ${UserPlaylistRelationDatabase.TABLE_NAME} rel ON pl.id = rel.playlist_id
        WHERE pl.id = '${playlistId}' OR rel.playlist_id = '${playlistId}'`
      )

    return result[0][0]
  }

  public async getAll(page: number, customerId: string): Promise<Playlist[] | undefined> {
    const result = await this.setConnection()
      .raw(
        `SELECT * FROM ${PlaylistDatabase.TABLE_NAME} pl 
        LEFT JOIN ${UserPlaylistRelationDatabase.TABLE_NAME} rel ON pl.id = rel.playlist_id
        WHERE pl.customer_id = '${customerId}' OR rel.user_id = '${customerId}'
        ORDER BY pl.name LIMIT 10 OFFSET ${(page - 1) * 10}`
      )


    return result[0].map((playlist: any) => {
      return this.toModel(playlist) as Playlist
    })
  }

  public async share(id: string): Promise<void> {
    await this.setConnection()
      .update({ privacy: super.convertBooleanToTinyint(false) })
      .from(PlaylistDatabase.TABLE_NAME)
      .where({ id })
  }

  public async update(id: string, name:string): Promise<void> {
    await this.setConnection()
      .update({ name })
      .from(PlaylistDatabase.TABLE_NAME)
      .where({ id })
  }
}