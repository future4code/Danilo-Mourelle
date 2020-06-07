import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { TokenManager } from "../services/TokenManager";
import { UserDatabase } from "../data/UserDatabase";
import { HashManager } from "../services/HashManager";
import { IdManager } from "../services/IdManager";
import { BaseDatabase } from "../data/BaseDatabase";
import { Create } from "../messages/Create";

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

     const result = await UserController.UserBusiness.signupBand(
        name,
        nickname,
        email,
        password,
        description
      );

      res.sendStatus(result.msgCode);
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    } finally {
      await BaseDatabase.desconnectDB()
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

      res.status(result.msgCode).send({ token: result.token });
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    } finally {
      await BaseDatabase.desconnectDB()
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

      res.status(result.msgCode).send({ token: result.token });
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    } finally {
      await BaseDatabase.desconnectDB()
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

      res.status(result.msgCode).send({ token: result.token });
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    } finally {
      await BaseDatabase.desconnectDB()
    }
  }

  async getAllBands(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;

      const result = await UserController.UserBusiness.getAllBands(token);

      res.status(200).send({bands: result.message});
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    } finally {
      await BaseDatabase.desconnectDB()
    }
  }

  async approveBand(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;
      const id = req.params.id

      const result = await UserController.UserBusiness.approveBand(token, id);

      res.sendStatus(result.msgCode);
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    } finally {
      await BaseDatabase.desconnectDB()
    }
  }

  async approveCustomer(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;
      const id = req.params.id

      const result = await UserController.UserBusiness.approveCustomer(token, id);

      res.sendStatus(result.msgCode);
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    } finally {
      await BaseDatabase.desconnectDB()
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;
      const name = req.body.name

      const result = await UserController.UserBusiness.updateUser(token, name);

      res.sendStatus(result.msgCode);
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    } finally {
      await BaseDatabase.desconnectDB()
    }
  }
}
