import { User, UserType } from "../models/User";
import { UserDatabase } from "../data/UserDatabase";
import { HashManager } from "../services/HashManager";
import { TokenManager } from "../services/TokenManager";
import { IdManager } from "../services/IdManager";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { NotFoundError } from "../errors/NotFoundError";
import { GenericError } from "../errors/GenericError";
import { Token } from "../messages/Token";

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
  ): Promise<void> {
    if (!name || !nickname || !email || !password || !description) {
      throw new InvalidParameterError("Missing input");
    }
    if (email.indexOf("@") === -1) {
      throw new InvalidParameterError("Invalid email");
    }
    if (password.length < 6) {
      throw new InvalidParameterError("Invalid password");
    }
    let result = await this.userDatabase.getUserEmailorNick(email)
    if (result) {
      throw new InvalidParameterError("Email já cadastrado");
    }
    result = await this.userDatabase.getUserEmailorNick(nickname)
    if (result) {
      throw new InvalidParameterError("Nickname já cadastrado");
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
  ): Promise<Token> {
    if (!name || !nickname || !email || !password) {
      throw new InvalidParameterError("Missing input");
    }
    if (email.indexOf("@") === -1) {
      throw new InvalidParameterError("Invalid email");
    }
    if (password.length < 6) {
      throw new InvalidParameterError("Invalid password");
    }
    let result = await this.userDatabase.getUserEmailorNick(email)
    if (result) {
      throw new InvalidParameterError("Email já cadastrado");
    }
    result = await this.userDatabase.getUserEmailorNick(nickname)
    if (result) {
      throw new InvalidParameterError("Nickname já cadastrado");
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

    return new Token(
      201,
      this.tokenManager.generateToken({
        id,
        isActive: false,
        type: UserType.CUSTOMER
      })
    )
  }

  public async signupAdmin(
    name: string,
    nickname: string,
    email: string,
    password: string,
    token: string
  ): Promise<Token> {
    if (!name || !nickname || !email || !password || !token) {
      throw new InvalidParameterError("Missing input");
    }
    if (email.indexOf("@") === -1) {
      throw new InvalidParameterError("Invalid email");
    }
    if (password.length < 10) {
      throw new InvalidParameterError("Invalid password");
    }
    let result = await this.userDatabase.getUserEmailorNick(email)
    if (result) {
      throw new InvalidParameterError("Email já cadastrado");
    }
    result = await this.userDatabase.getUserEmailorNick(nickname)
    if (result) {
      throw new InvalidParameterError("Nickname já cadastrado");
    }
    const userData = this.tokenManager.retrieveDataFromToken(token)
    if (userData.type !== UserType.ADMIN) {
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

    return new Token(
      201,
      this.tokenManager.generateToken({
        id,
        isActive: true,
        type: UserType.ADMIN
      })
    )
  }

  public async login(
    user: string,
    password: string,
  ): Promise<Token> {
    if (!user || !password) {
      throw new InvalidParameterError("Missing input");
    }

    const userFound = await this.userDatabase.getUserEmailorNick(user)

    if (!userFound) {
      throw new NotFoundError("User Not Found")
    }
    if (userFound.getType() === UserType.BAND && !userFound.getIsActive()) {
      throw new UnauthorizedError("Sua banda precisa ser aprovada para liberar essa função")
    }

    const isPasswordValid = await this.hashManager.compareHash(password, userFound.getPassword())

    if (!isPasswordValid) {
      throw new InvalidParameterError("Invalid Password")
    }

    return new Token(
      202,
      this.tokenManager.generateToken({
        id: userFound.getId(),
        isActive: userFound.getIsActive(),
        type: userFound.getType()
      })
    )
  }

  public async getAllBands(
    token: string,
  ) {
    if (!token) {
      throw new InvalidParameterError("Missing input");
    }

    const userData = this.tokenManager.retrieveDataFromToken(token)
    if (userData.type !== UserType.ADMIN) {
      throw new UnauthorizedError("Access denied")
    }

    const bandList = await this.userDatabase.getAllBands()

    return {
      Bands: bandList.map(band => ({
        name: band.getName(),
        email: band.getEmail(),
        nickname: band.getNickname(),
        isActive: band.getIsActive()
      }))
    }
  }

  public async approveBand(
    token: string,
    id: string
  ) {
    if (!token) {
      throw new InvalidParameterError("Missing input");
    }

    const userData = this.tokenManager.retrieveDataFromToken(token)
    if (userData.type !== UserType.ADMIN) {
      throw new UnauthorizedError("Access denied")
    }

    const userFound = await this.userDatabase.getUserId(id)
    if (!userFound) {
      throw new NotFoundError("User Not Found")
    }
    if(userFound.getType() !== UserType.BAND){
      throw new GenericError("User not a band")
    }
    if (userFound.getIsActive()) {
      throw new GenericError("User already approved")
    }

    await this.userDatabase.activateUser(id)
  }

  public async approveCustomer(
    token: string,
    id: string
  ) {
    if (!token) {
      throw new InvalidParameterError("Missing input");
    }

    const userData = this.tokenManager.retrieveDataFromToken(token)
    if (userData.type !== UserType.ADMIN) {
      throw new UnauthorizedError("Access denied")
    }

    const userFound = await this.userDatabase.getUserId(id)
    if (!userFound) {
      throw new NotFoundError("User Not Found")
    }
    if(userFound.getType() !== UserType.CUSTOMER){
      throw new GenericError("User not a customer")
    }
    if (userFound.getIsActive()) {
      throw new GenericError("User already approved")
    }

    await this.userDatabase.activateUser(id)
  }
}
