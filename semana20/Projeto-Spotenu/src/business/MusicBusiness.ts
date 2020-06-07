import { MusicDatabase } from "../data/MusicDatabase";
import { AlbumDatabase } from "../data/AlbumDatabase";
import { TokenManager } from "../services/TokenManager";
import { IdManager } from "../services/IdManager";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { GenericError } from "../errors/GenericError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { UserType } from "../models/User";
import { NotFoundError } from "../errors/NotFoundError";
import { Music } from "../models/Music";
import { ContentList } from "../messages/ContentList";
import { GenericResult } from "../messages/GenericResult";


export class MusicBusiness {
  constructor(
    private musicDatabase: MusicDatabase,
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
    if (userData.id !== album.getBandId()) {
      throw new UnauthorizedError("Este album não pertence a essa banda")
    }

    const music = await this.musicDatabase.getMusicInAlbumByName(name, albumId)
    if (music) {
      throw new GenericError("Este album já contém essa música")
    }

    const musicId = this.idManager.generateId()

    await this.musicDatabase.createMusic(
      new Music(musicId, name, albumId, userData.id)
    );
  }

  public async getAll(page: string, token: string) {
    if (!page || !token) {
      throw new InvalidParameterError("Missing input");
    }

    const userData = this.tokenManager.retrieveDataFromToken(token)
    if (userData.type !== UserType.CUSTOMER) {
      throw new UnauthorizedError("Access denied")
    }

    const musicList = await this.musicDatabase.getAll(Number(page))

    return new ContentList(musicList.map(music => ({
      id: music.getId(),
      name: music.getName()
    })))
  }

  public async getDetails(id: string, token: string) {
    if (!id || !token) {
      throw new InvalidParameterError("Missing input");
    }

    const userData = this.tokenManager.retrieveDataFromToken(token)
    if (userData.type !== UserType.CUSTOMER) {
      throw new UnauthorizedError("Access denied")
    }

    const music = await this.musicDatabase.getDetails(id)

    music[0].genre = [music[0].genre]

    if (music.length > 0) {
      for (let index = 1; index < music.length; index++) {
        music[0].genre.push(music[index].genre);
      }

    }
    return new GenericResult({details: music[0]} )
  }
}