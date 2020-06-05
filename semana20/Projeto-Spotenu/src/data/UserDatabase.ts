import { BaseDatabase } from "./BaseDatabase";
import { User, stringToUserType, UserType } from "../models/User";

export class UserDatabase extends BaseDatabase {
  tableName: string = "Spotenu_Users";


  private toModel(dbModel?: any): User | undefined {
    return (
      dbModel &&
      new User(
        dbModel.id,
        dbModel.name,
        dbModel.nickname,
        dbModel.email,
        dbModel.password,
        stringToUserType(dbModel.type),
        super.convertTinyintToBoolean(dbModel.active),
        dbModel.description
      )
    )
  }

  public async createUser(user: User): Promise<void> {
    await this.setConnection()
      .insert({
        id: user.getId(),
        name: user.getName(),
        nickname: user.getNickname(),
        email: user.getEmail(),
        password: user.getPassword(),
        type: user.getType(),
        active: super.convertBooleanToTinyint(user.getIsActive()),
        description: user.getDescription() || null
      })
      .into(this.tableName);
  }

  public async getUserEmailorNick(user: string): Promise<User | undefined> {
    const result = await this.setConnection()
      .select("*")
      .from(this.tableName)
      .where({ email: user })
      .orWhere({ nickname: user });

    return this.toModel(result[0]);
  }

  public async getUserId(id: string): Promise<User | undefined> {
    const result = await this.setConnection()
      .select("*")
      .from(this.tableName)
      .where({ id });

    return this.toModel(result[0]);
  }

  public async getAllBands(): Promise<User[]> {
    const result = await this.setConnection()
      .select("*")
      .from(this.tableName)
      .where({ type: UserType.BAND });

    return result.map((band: any) => {
      return this.toModel(band) as User
    })
  }

  public async activateUser(id: string): Promise<void> {
    await this.setConnection()
      .update({ active: 1 })
      .from(this.tableName)
      .where({ id });
  }
}
