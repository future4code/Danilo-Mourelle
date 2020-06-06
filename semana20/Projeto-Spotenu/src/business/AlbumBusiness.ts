import { AlbumDatabase } from "../data/AlbumDatabase";
import { AlbumGenreDatabase } from "../data/AlbumGenreDatabase";
import { MusicGenreDatabase } from "../data/MusicGenreDatabase";
import { TokenManager } from "../services/TokenManager";
import { IdManager } from "../services/IdManager";
import { Album } from "../models/Album";
import { UserType } from "../models/User";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { GenericError } from "../errors/GenericError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { AlbumGenre } from "../models/AlbumGenre";
import { PartialContent } from "../messages/PartialContent";
import { GenericResult } from "../messages/GenericResult";

export class AlbumBusiness {
  constructor(
    private albumDatabase: AlbumDatabase,
    private albumGenreDatabase: AlbumGenreDatabase,
    private musicGenrerDatabase: MusicGenreDatabase,
    private tokenManager: TokenManager,
    private idManager: IdManager
  ) { }

  public async create(name: string, genreIdList: string[], token: string) {
    if (!name || !token || genreIdList.length === 0) {
      throw new InvalidParameterError("Missing input");
    }

    const userData = this.tokenManager.retrieveDataFromToken(token)
    if (userData.type !== UserType.BAND) {
      throw new UnauthorizedError("Access denied")
    }

    const albumId = this.idManager.generateId()
    
    await this.albumDatabase.createAlbum(
      new Album(albumId, name, userData.id)
    );

    let genrerNotFound: string = ''
    for (const genreId of genreIdList) {
      const result = await this.musicGenrerDatabase.getMusicGenreById(genreId)
      if (result) {
        await this.albumGenreDatabase.createAlbumGenre(
          new AlbumGenre(albumId, genreId)
        )
      } else {
        genrerNotFound = `${genrerNotFound}, ${genreId}`
      }
    }

    if(genrerNotFound){
      return new PartialContent(`Os gêneros ${genrerNotFound} não foram encontrados`)
    } else {
      return new GenericResult("Todos os gêneros foram adicionados")
    }
  }
}