import { PlaylistDatabase } from "../data/PlaylistDatabase";
import { TokenManager } from "../services/TokenManager";
import { IdManager } from "../services/IdManager";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { NotFoundError } from "../errors/NotFoundError";
import { GenericError } from "../errors/GenericError";
import { Create } from "../messages/Create";
import { UserType } from "../models/User";
import { Playlist } from "../models/Playlist";

export class PlaylistBusiness {
  constructor(
    private playlistDatabase: PlaylistDatabase,
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
}