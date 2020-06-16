import { BaseDatabase } from "./BaseDatabase";
import { AlbumGenre } from "../models/AlbumGenre";

export class AlbumGenreDatabase extends BaseDatabase{
  public static TABLE_NAME: string = 'Spotenu_AlbunsGenre'
  
  public async createAlbumGenre(albumGenre: AlbumGenre): Promise<void> {
    await this.setConnection()
      .insert({
        album_id: albumGenre.getAlbumId(),
        genre_id: albumGenre.getGenreId()
      })
      .into(AlbumGenreDatabase.TABLE_NAME);
  }
}