import { Request, Response } from 'express'
import { MusicBusiness } from '../business/MusicBusiness'
import { MusicDatabse } from '../data/MusicDatabase'
import { AlbumDatabase } from '../data/AlbumDatabase'
import { TokenManager } from '../services/TokenManager'
import { IdManager } from '../services/IdManager'
import { BaseDatabase } from '../data/BaseDatabase'
import { Create } from '../messages/Create'

export class MusicController {
  private static MusicBusiness = new MusicBusiness(
    new MusicDatabse(),
    new AlbumDatabase(),
    new TokenManager(),
    new IdManager()
  )

  async create(req: Request, res: Response) {
    try {
      const { name, albumId } = req.body;
      const token = req.headers.authorization as string

      await MusicController.MusicBusiness.create(name, albumId, token);

      res.sendStatus(new Create().msgCode)
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    } finally {
      await BaseDatabase.desconnectDB()
    }
  }
}