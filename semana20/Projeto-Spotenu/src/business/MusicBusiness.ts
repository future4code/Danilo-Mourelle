import { MusicDatabse } from "../data/MusicDatabase";
import { AlbumDatabase } from "../data/AlbumDatabase";
import { TokenManager } from "../services/TokenManager";
import { IdManager } from "../services/IdManager";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { GenericError } from "../errors/GenericError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { UserType } from "../models/User";
import { NotFoundError } from "../errors/NotFoundError";
import { Music } from "../models/Music";


export class MusicBusiness {
  constructor(
    private musicDatabase: MusicDatabse,
    private albumDatabase: AlbumDatabase,
    private tokenManager: TokenManager,
    private idManager: IdManager
  ) { }

  public async create(name: string, albumId: string, token: string) {
    if (!name || !token || !albumId) {
      throw new InvalidParameterError("Missing input");
    }

    const userData = this.tokenManager.retrieveDataFromToken(token)
    if (userData.type !== UserType.BAND) {
      throw new UnauthorizedError("Access denied")
    }

    const album = await this.albumDatabase.getAlbumById(albumId)
    if (!album) {
      throw new NotFoundError("Album não encontrado")
    }

    const music = await this.musicDatabase.getMusicByIdInAlbum(name, albumId)
    if (music) {
      throw new GenericError("Este album já contém essa música")
    }

    const musicId = this.idManager.generateId()

    await this.musicDatabase.createMusic(
      new Music(musicId, name, albumId, userData.id)
    );
  }
}