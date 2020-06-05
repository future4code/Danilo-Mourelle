import { User, UserType } from "../models/User";
import { UserDatabase } from "../data/UserDatabase";
import { HashManager } from "../services/HashManager";
import { TokenManager } from "../services/TokenManager";
import { IdManager } from "../services/IdManager";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { NotFoundError } from "../errors/NotFoundError";

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

  public async signupCustomer(
    name: string,
    nickname: string,
    email: string,
    password: string,
  ) {
    if (!name || !nickname || !email || !password) {
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
        UserType.CUSTOMER,
        false,
      )
    );

    return {
      token: this.tokenManager.generateToken({
        id,
        isActive: false,
        type: UserType.CUSTOMER
      })
    }
  }

  public async signupAdmin(
    name: string,
    nickname: string,
    email: string,
    password: string,
    token: string
  ) {
    if (!name || !nickname || !email || !password || !token) {
      throw new InvalidParameterError("Missing input");
    }
    if (email.indexOf("@") === -1) {
      throw new InvalidParameterError("Invalid email");
    }
    if (password.length < 10) {
      throw new InvalidParameterError("Invalid password");
    }

    const userData = this.tokenManager.retrieveDataFromToken(token)
    if(userData.type !== UserType.ADMIN){
      throw new UnauthorizedError("Access denied")
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
        UserType.ADMIN,
        true,
      )
    );

    return {
      token: this.tokenManager.generateToken({
        id,
        isActive: true,
        type: UserType.ADMIN
      })
    }
  }

  public async login(
    user:string,
    password: string,
  ) {
    if (!user || !password) {
      throw new InvalidParameterError("Missing input");
    }

    const userFound = await this.userDatabase.getUserEmailorNick(user)
  
    if(!userFound){
      throw new NotFoundError("User Not Found")
    }

    const isPasswordValid = await this.hashManager.compareHash(password, userFound.getPassword())

    if(!isPasswordValid){
      throw new InvalidParameterError("Invalid Password")
    }

    return {
      token: this.tokenManager.generateToken({
        id: userFound.getId(),
        isActive: userFound.getIsActive(),
        type: userFound.getType()
      })
    }
  }
}
