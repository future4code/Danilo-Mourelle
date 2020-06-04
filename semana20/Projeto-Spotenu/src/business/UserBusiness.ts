import { User, UserType } from "../models/User";
import { UserDatabase } from "../data/UserDatabase";
import { HashManager } from "../services/HashManager";
import { TokenManager } from "../services/TokenManager";
import { IdManager } from "../services/IdManager";
import { InvalidParameterError } from "../errors/InvalidParameterError";

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private hashManager: HashManager,
    private tokenManager: TokenManager,
    private idManager: IdManager
  ) { }

  public async signupBand(
    name: string,
    nickname: string,
    email: string,
    password: string,
    description: string
  ) {
    if (!name || !nickname || !email || !password || !description) {
      throw new InvalidParameterError("Missing input");
    }
    if (email.indexOf("@") === -1) {
      throw new InvalidParameterError("Invalid email");
    }
    if (password.length < 6) {
      throw new InvalidParameterError("Invalid password");
    }

    const id = this.idManager.generateId()
    const hashPassword = await this.hashManager.generateHash(password);

    await this.userDatabase.createUser(
      new User(
        id,
        name,
        nickname,
        email,
        hashPassword,
        UserType.BAND,
        false,
        description
      )
    );
  }

  public async login(email: string, password: string) {
    if (!email || !password) {
      throw new Error("Preencha os campos");
    }

    const userDatabase = new UserDatabase();
    const user = await userDatabase.getUserEmail(email);

    if (!user) {
      throw new Error("Email ou senha incorreta.");
    }

    const hashManager = new HashManager();
    const checkHash = await hashManager.compareHash(
      password,
      user.getPassword()
    );

    if (!checkHash) {
      throw new Error("Email ou senha incorreta.");
    }

    return user.getId();
  }
}
