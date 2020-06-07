import { Request, Response } from "express";
import { MusicGenreBusiness } from "../business/MusicGenreBusiness";
import { MusicGenreDatabase } from "../data/MusicGenreDatabase";
import { TokenManager } from "../services/TokenManager";
import { IdManager } from "../services/IdManager";
import { BaseDatabase } from "../data/BaseDatabase";

export class MusicGenreController {
  private static MusicGenreBusiness = new MusicGenreBusiness(
    new MusicGenreDatabase(),
    new TokenManager(),
    new IdManager()
  )

  async create(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const token = req.headers.authorization as string

      const result = await MusicGenreController.MusicGenreBusiness.create(name, token);

      res.sendStatus(result.msgCode);
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
    finally {
      await BaseDatabase.desconnectDB()
    }
  }

  async getAllMusicGenre(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string

      const result = await MusicGenreController.MusicGenreBusiness.getAllMusicGenre(token);

      res.status(result.msgCode).send({genres: result.message});
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
    finally {
      await BaseDatabase.desconnectDB()
    }
  }
}