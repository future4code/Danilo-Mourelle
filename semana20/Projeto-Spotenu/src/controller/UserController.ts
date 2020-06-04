import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { TokenManager } from "../services/TokenManager";
import { UserDatabase } from "../data/UserDatabase";
import { HashManager } from "../services/HashManager";
import { IdManager } from "../services/IdManager";

export class UserController {
  private static UserBusiness = new UserBusiness(
    new UserDatabase(),
    new HashManager(),
    new TokenManager(),
    new IdManager
  )

  async signupBand(req: Request, res: Response) {
    try {
      const {
        name,
        nickname,
        email,
        password,
        description
      } = req.body;

      await UserController.UserBusiness.signupBand(
        name,
        nickname,
        email,
        password,
        description
      );

      res.sendStatus(200);
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const result = await UserController.UserBusiness.login(email, password);

      const token = new TokenManager().generateToken({ id: result });

      res.status(200).send({ token });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
}
