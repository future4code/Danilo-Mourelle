import { BaseDatabase } from "./BaseDatabase";
import { MusicGenre } from "../models/MusicGenre";

export class MusicGenreDatabase extends BaseDatabase {
  public static TABLE_NAME: string = 'Spotenu_MusicGenre'

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
      .into(MusicGenreDatabase.TABLE_NAME);
  }

  public async getMusicGenreByName(name: string): Promise<MusicGenre | undefined> {
    const result = await this.setConnection()
      .select("*")
      .from(MusicGenreDatabase.TABLE_NAME)
      .where({ name })

      return this.toModel(result[0])
  }

  public async getMusicGenreById(id: string): Promise<MusicGenre | undefined> {
    const result = await this.setConnection()
      .select("*")
      .from(MusicGenreDatabase.TABLE_NAME)
      .where({ id })

      return this.toModel(result[0])
  }

  public async getAllMusicGenre(): Promise<MusicGenre[]> {
    const result = await this.setConnection()
      .select("*")
      .from(MusicGenreDatabase.TABLE_NAME)
      
      return result.map((genre: any) => {
        return this.toModel(genre) as MusicGenre
      })
  }
}