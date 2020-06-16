import { InvalidParameterError } from "../errors/InvalidParameterError";

export class User {
  constructor(
    private id: string,
    private name: string,
    private nickname: string,
    private email: string,
    private password: string,
    private type: UserType,
    private isActive: boolean,
    private description?: string
  ) { }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getNickname(): string {
    return this.nickname;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public getType(): UserType {
    return this.type;
  }

  public getIsActive(): boolean {
    return this.isActive;
  }

  public getDescription(): string | undefined {
    return this.description;
  }
}

export const stringToUserType = (input: string): UserType => {
  switch (input) {
    case "BAND":
      return UserType.BAND;
    case "ADMIN":
      return UserType.ADMIN;
    case "CUSTOMER":
      return UserType.CUSTOMER;
    default:
      throw new InvalidParameterError("Invalid user role");
  }
};

export enum UserType {
  BAND = 'BAND',
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER'
}