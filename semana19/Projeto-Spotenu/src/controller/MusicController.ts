import { Request, Response } from 'express'
import { MusicBusiness } from '../business/MusicBusiness'
import { MusicDatabase } from '../data/MusicDatabase'
import { AlbumDatabase } from '../data/AlbumDatabase'
import { TokenManager } from '../services/TokenManager'
import { IdManager } from '../services/IdManager'
import { BaseDatabase } from '../data/BaseDatabase'
import { Create } from '../messages/Create'

export class MusicController {
  private static MusicBusiness = new MusicBusiness(
    new MusicDatabase(),
    new AlbumDatabase(),
    new TokenManager(),
    new IdManager()
  )

  async create(req: Request, res: Response) {
    try {
      const { name, albumId } = req.body;
      const token = req.headers.authorization as string

      const result = await MusicController.MusicBusiness.create(name, albumId, token);

      res.sendStatus(result.msgCode)
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    } finally {
      await BaseDatabase.desconnectDB()
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const page  = req.params.page;
      const token = req.headers.authorization as string

      const result = await MusicController.MusicBusiness.getAll(page, token);

      res.status(result.msgCode).send({musics: result.message})
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    } finally {
      await BaseDatabase.desconnectDB()
    }
  }

  async getDetails(req: Request, res: Response) {
    try {
      const id  = req.params.musicId;
      const token = req.headers.authorization as string

      const result = await MusicController.MusicBusiness.getDetails(id, token);

      res.status(result.msgCode).send(result.message)
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    } finally {
      await BaseDatabase.desconnectDB()
    }
  }
}