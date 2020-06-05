import { Request, Response } from "express";
import { MusicGenreBusiness } from "../business/MusicGenreBusiness";
import { MusicGenreDatabase } from "../data/MusicGenreDatabase";
import { TokenManager } from "../services/TokenManager";
import { IdManager } from "../services/IdManager";

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

      await MusicGenreController.MusicGenreBusiness.create(name, token);

      res.sendStatus(200);
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
    finally {
      MusicGenreDatabase.desconnectDB()
    }
  }
}