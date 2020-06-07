import { BaseDatabase } from "./BaseDatabase";
import { UserPlaylistRelation } from "../models/UserPlaylistRelation";

export class UserPlaylistRelationDatabase extends BaseDatabase {
  public static TABLE_NAME: string = 'Spotenu_UserPlaylistRelation'

  private toModel(dbModel?: any): UserPlaylistRelation | undefined {
    return (
      dbModel &&
      new UserPlaylistRelation(
        dbModel.user_id,
        dbModel.playlist_id,
      )
    )
  }

  public async create(relation: UserPlaylistRelation): Promise<void> {
    await this.setConnection()
      .insert({
        user_id: relation.getUserId(),
        playlist_id: relation.getPlaylistId()
      })
      .into(UserPlaylistRelationDatabase.TABLE_NAME);
  }
}