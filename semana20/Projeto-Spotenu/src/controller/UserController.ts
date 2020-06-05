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
    } finally {
      await UserDatabase.desconnectDB()
    }
  }

  async signupCustomer(req: Request, res: Response) {
    try {
      const {
        name,
        nickname,
        email,
        password,
      } = req.body;

      const result = await UserController.UserBusiness.signupCustomer(
        name,
        nickname,
        email,
        password,
      );

      res.status(200).send(result);
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    } finally {
      await UserDatabase.desconnectDB()
    }
  }

  async signupAdmin(req: Request, res: Response) {
    try {
      const {
        name,
        nickname,
        email,
        password,
      } = req.body;

      const token = req.headers.authorization as string

      const result = await UserController.UserBusiness.signupAdmin(
        name,
        nickname,
        email,
        password,
        token
      );

      res.status(200).send(result);
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    } finally {
      await UserDatabase.desconnectDB()
    }
  }

  async login(req: Request, res: Response) {
    try {
      const {
        user,
        password,
      } = req.body;

      const result = await UserController.UserBusiness.login(
        user,
        password
      );

      res.status(200).send(result);
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    } finally {
      await UserDatabase.desconnectDB()
    }
  }

  async getAllBands(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;

      const result = await UserController.UserBusiness.getAllBands(token);

      res.status(200).send(result);
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    } finally {
      await UserDatabase.desconnectDB()
    }
  }

  async approveBand(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;
      const id = req.params.id

      await UserController.UserBusiness.approveBand(token, id);

      res.sendStatus(200);
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    } finally {
      await UserDatabase.desconnectDB()
    }
  }
}
