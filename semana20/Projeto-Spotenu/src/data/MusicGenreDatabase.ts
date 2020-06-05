import { BaseDatabase } from "./BaseDatabase";
import { MusicGenre } from "../models/MusicGenre";

export class MusicGenreDatabase extends BaseDatabase {
  tableName: string = 'Spotenu_MusicGenre'

  private toModel(dbModel?: any): MusicGenre | undefined {
    return (
      dbModel &&
      new MusicGenre(
        dbModel.id,
        dbModel.name,
      )
    )
  }

  public async createMusicGenre(genre: MusicGenre): Promise<void> {
    await this.setConnection()
      .insert({
        id: genre.getId(),
        name: genre.getName(),
      })
      .into(this.tableName);
  }

  public async getMusicGenreByName(name: string): Promise<MusicGenre | undefined> {
    const result = await this.setConnection()
      .select("*")
      .from(this.tableName)
      .where({ name })

      return this.toModel(result[0])
  }
}