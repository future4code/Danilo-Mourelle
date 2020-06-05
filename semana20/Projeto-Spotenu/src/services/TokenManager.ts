import * as jwt from "jsonwebtoken";
import { UserType } from "../models/User";

export class TokenManager {
  public generateToken(payload: TokenContent): string {
    return jwt.sign(payload, process.env.JWT_KEY as string, {
      expiresIn: "20min",
    });
  }

  public retrieveDataFromToken(token: string): TokenContent {
    const data = jwt.verify(token, process.env.JWT_KEY as string) as any;
    return {
      isActive: data.isActive,
      type: data.type,
      id: data.string
    }
  }
}

interface TokenContent {
  isActive: boolean,
  type: UserType,
  id: string
}
