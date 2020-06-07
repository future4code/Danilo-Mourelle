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

export class PlaylistBusiness {
  constructor(
    private playlistDatabase: PlaylistDatabase,
    private musicDatabase: MusicDatabase,
    private musicPlaylistRelationDatabase: MusicPlaylistRelationDatabase,
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

  public async addMusic(musicId: string, playlistId:string, token: string): Promise<Create> {
    if (!musicId || !playlistId || !token) {
      throw new InvalidParameterError("Missing input");
    }

    const userData = this.tokenManager.retrieveDataFromToken(token)
    if (userData.type !== UserType.CUSTOMER || userData.isActive === false) {
      throw new NotClientError("Premium customer service only")
    }

    const playlist = await this.playlistDatabase.getPlaylistById(playlistId)
    if(!playlist){
      throw new NotFoundError("Playlist not Found")
    }
    if(playlist.getCustomerId() !== userData.id){
      throw new UnauthorizedError("Access denied")
    }

    const music = await this.musicDatabase.getMusicById(musicId)
    if(!music){
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

  public async deleteMusicFromPlaylist(musicId: string, playlistId:string, token: string): Promise<Create> {
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
    if(!relation){
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
}