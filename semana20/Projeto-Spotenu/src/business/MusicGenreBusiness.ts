import { MusicGenreDatabase } from "../data/MusicGenreDatabase";
import { TokenManager } from "../services/TokenManager";
import { IdManager } from "../services/IdManager";
import { MusicGenre } from "../models/MusicGenre";
import { UserType } from "../models/User";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { GenericError } from "../errors/GenericError";
import { UnauthorizedError } from "../errors/UnauthorizedError";

export class MusicGenreBusiness {
  constructor(
    private musicGenreDatabse: MusicGenreDatabase,
    private tokenManager: TokenManager,
    private idManager: IdManager
  ) { }

  public async create(name: string, token: string) {
    if (!name || !token) {
      throw new InvalidParameterError("Missing input");
    }

    const userData = this.tokenManager.retrieveDataFromToken(token)
    if (userData.type !== UserType.ADMIN) {
      throw new UnauthorizedError("Access denied")
    }

    const result = await this.musicGenreDatabse.getMusicGenreByName(name.toLowerCase())
    if (result) {
      throw new GenericError("Este gênero já existe")
    }

    const id = this.idManager.generateId()

    await this.musicGenreDatabse.createMusicGenre(
      new MusicGenre(id, name.toLowerCase())
    );
  }
}