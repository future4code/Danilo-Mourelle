import { Request, Response } from "express";
import { PlaylistBusiness } from "../business/PlaylistBusiness";
import { PlaylistDatabase } from "../data/PlaylistDatabase";
import { TokenManager } from "../services/TokenManager";
import { IdManager } from "../services/IdManager";
import { BaseDatabase } from "../data/BaseDatabase";

export class PlaylistController {
  private static PlaylistBusiness = new PlaylistBusiness(
    new PlaylistDatabase(),
    new TokenManager(),
    new IdManager()
  )

  async create(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const token = req.headers.authorization as string

     const result = await PlaylistController.PlaylistBusiness.create(name, token);

      res.sendStatus(result.msgCode);
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
    finally {
      await BaseDatabase.desconnectDB()
    }
  }


}