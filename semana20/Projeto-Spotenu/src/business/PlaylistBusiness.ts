import { PlaylistDatabase } from "../data/PlaylistDatabase";
import { MusicPlaylistRelationDatabase } from "../data/MusicPlaylistRelationDatabase";
import { TokenManager } from "../services/TokenManager";
import { IdManager } from "../services/IdManager";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { NotFoundError } from "../errors/NotFoundError";
import { GenericError } from "../errors/GenericError";
import { Create } from "../messages/Create";
import { UserType } from "../models/User";
import { Playlist } from "../models/Playlist";
import { NotClientError } from "../errors/NotClientError";
import { MusicPlaylistRelation } from "../models/MusicPlaylisRelation";
import { MusicDatabase } from "../data/MusicDatabase";
import { GenericResult } from "../messages/GenericResult";
import { ContentList } from "../messages/ContentList";
import { UserPlaylistRelationDatabase } from "../data/UserPlaylistRelationDatabase";
import { UserPlaylistRelation } from "../models/UserPlaylistRelation";

export class PlaylistBusiness {
  constructor(
    private playlistDatabase: PlaylistDatabase,
    private musicDatabase: MusicDatabase,
    private musicPlaylistRelationDatabase: MusicPlaylistRelationDatabase,
    private userPlaylistRelationDatabase: UserPlaylistRelationDatabase,
    private tokenManager: TokenManager,
    private idManager: IdManager
  ) { }

  public async create(name: string, token: string): Promise<Create> {
    if (!name || !token) {
      throw new InvalidParameterError("Missing input");
    }

    const userData = this.tokenManager.retrieveDataFromToken(token)
    if (userData.type !== UserType.CUSTOMER || userData.isActive === false) {
      throw new UnauthorizedError("Access denied")
    }

    const playlistId = this.idManager.generateId()

    await this.playlistDatabase.create(
      new Playlist(
        playlistId,
        name,
        userData.id,
        true
      )
    )

    return new Create()
  }

  public async addMusic(musicId: string, playlistId: string, token: string): Promise<Create> {
    if (!musicId || !playlistId || !token) {
      throw new InvalidParameterError("Missing input");
    }

    const userData = this.tokenManager.retrieveDataFromToken(token)
    if (userData.type !== UserType.CUSTOMER || userData.isActive === false) {
      throw new NotClientError("Premium customer service only")
    }

    const playlist = await this.playlistDatabase.getPlaylistById(playlistId)
    const relation = await this.userPlaylistRelationDatabase.getRelation(
      new UserPlaylistRelation(
        userData.id,
        playlistId
      )
    )

    if (!playlist && !relation) {
      throw new NotFoundError("Playlist not Found")
    }
    if (playlist?.getCustomerId() !== userData.id && relation?.getUserId() !== userData.id) {
      throw new UnauthorizedError("Access denied")
    }

    const music = await this.musicDatabase.getMusicById(musicId)
    if (!music) {
      throw new NotFoundError("Music not Found")
    }

    await this.musicPlaylistRelationDatabase.create(
      new MusicPlaylistRelation(
        musicId,
        playlistId,
      )
    )

    return new Create()
  }

  public async deleteMusicFromPlaylist(musicId: string, playlistId: string, token: string): Promise<GenericResult> {
    if (!musicId || !playlistId || !token) {
      throw new InvalidParameterError("Missing input");
    }

    const userData = this.tokenManager.retrieveDataFromToken(token)
    if (userData.type !== UserType.CUSTOMER || userData.isActive === false) {
      throw new NotClientError("Premium customer service only")
    }

    const relation = await this.musicPlaylistRelationDatabase.getRelation(
      new MusicPlaylistRelation(
        musicId,
        playlistId,
      ))
    if (!relation) {
      throw new NotFoundError("This music is not in this playlist")
    }

    await this.musicPlaylistRelationDatabase.delete(
      new MusicPlaylistRelation(
        musicId,
        playlistId,
      )
    )

    return new GenericResult()
  }

  public async getAll(token: string, page: string): Promise<ContentList> {
    if (!token || !page) {
      throw new InvalidParameterError("Missing input");
    }

    const userData = this.tokenManager.retrieveDataFromToken(token)
    if (userData.type !== UserType.CUSTOMER || userData.isActive === false) {
      throw new NotClientError("Premium customer service only")
    }

    const playlistList = await this.playlistDatabase.getAll(Number(page), userData.id)


    return new ContentList(playlistList?.map(playlist => ({
      id: playlist.getId(),
      name: playlist.getName()
    })))
  }

  public async sharePlaylist(playlistId: string, token: string): Promise<GenericResult> {
    if (!token || !playlistId) {
      throw new InvalidParameterError("Missing input");
    }

    const userData = this.tokenManager.retrieveDataFromToken(token)
    if (userData.type !== UserType.CUSTOMER || userData.isActive === false) {
      throw new NotClientError("Premium customer service only")
    }

    const playlist = await this.playlistDatabase.getPlaylistById(playlistId)
    if (!playlist) {
      throw new NotFoundError('PlayList Not Found')
    } else if (playlist.getCustomerId() !== userData.id) {
      throw new UnauthorizedError("This playlist is not yours")
    }

    await this.playlistDatabase.share(playlistId)

    return new GenericResult()
  }

  public async followPlaylist(playlistId: string, token: string): Promise<GenericResult> {
    if (!token || !playlistId) {
      throw new InvalidParameterError("Missing input");
    }

    const userData = this.tokenManager.retrieveDataFromToken(token)
    if (userData.type !== UserType.CUSTOMER || userData.isActive === false) {
      throw new NotClientError("Premium customer service only")
    }

    const playlist = await this.playlistDatabase.getPlaylistById(playlistId)
    if (!playlist) {
      throw new NotFoundError('PlayList Not Found')
    } else if (playlist.getIsPrivate()) {
      throw new UnauthorizedError("This playlist is private and can't be followed")
    } else if (playlist.getCustomerId() === userData.id) {
      throw new GenericError("This playlist belongs to you")
    }

    await this.userPlaylistRelationDatabase.create(
      new UserPlaylistRelation(
        userData.id,
        playlistId
      )
    )

    return new GenericResult()
  }

  public async editPlaylist(playlistId: string, name: string, token: string): Promise<GenericResult> {
    if (!token || !playlistId || !name) {
      throw new InvalidParameterError("Missing input");
    }

    const userData = this.tokenManager.retrieveDataFromToken(token)
    if (userData.type !== UserType.CUSTOMER || userData.isActive === false) {
      throw new NotClientError("Premium customer service only")
    }

    const playlist = await this.playlistDatabase.getPlaylistById(playlistId)
    
    if (!playlist) {
      throw new NotFoundError('PlayList Not Found')
    } else if (playlist.customer_id !== userData.id && playlist.user_id !== userData.id) {
      throw new UnauthorizedError("This playlist is not yours or followed by you")
    }

    await this.playlistDatabase.update(playlistId, name)

    return new GenericResult()
  }
}