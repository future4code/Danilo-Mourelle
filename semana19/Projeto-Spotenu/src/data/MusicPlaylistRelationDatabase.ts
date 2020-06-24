import { BaseDatabase } from "./BaseDatabase";
import { MusicPlaylistRelation } from "../models/MusicPlaylisRelation";

export class MusicPlaylistRelationDatabase extends BaseDatabase {
  public static TABLE_NAME: string = 'Spotenu_MusicPlaylistRelation'

  private toModel(dbModel?: any): MusicPlaylistRelation | undefined {
    return (
      dbModel &&
      new MusicPlaylistRelation(
        dbModel.music_id,
        dbModel.playlist_id,
      )
    )
  }

  public async create(relation: MusicPlaylistRelation): Promise<void> {
    await this.setConnection()
      .insert({
        music_id: relation.getMusicId(),
        playlist_id: relation.getPlaylistId(),
      })
      .into(MusicPlaylistRelationDatabase.TABLE_NAME);
  }

  public async getRelation(relation: MusicPlaylistRelation): Promise<MusicPlaylistRelation | undefined>{
    const result = await this.setConnection()
    .select("*")
    .from(MusicPlaylistRelationDatabase.TABLE_NAME)
    .where({
      music_id: relation.getMusicId(),
      playlist_id: relation.getPlaylistId(),
    })

    return this.toModel(result[0])
  }

  public async delete(relation: MusicPlaylistRelation): Promise<void> {
    await this.setConnection()
      .delete()
      .where({
        music_id: relation.getMusicId(),
        playlist_id: relation.getPlaylistId(),
      })
      .from(MusicPlaylistRelationDatabase.TABLE_NAME);
  }
}