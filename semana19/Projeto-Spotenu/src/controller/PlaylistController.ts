import { Request, Response } from "express";
import { PlaylistBusiness } from "../business/PlaylistBusiness";
import { PlaylistDatabase } from "../data/PlaylistDatabase";
import { MusicDatabase } from "../data/MusicDatabase";
import { MusicPlaylistRelationDatabase } from "../data/MusicPlaylistRelationDatabase";
import { UserPlaylistRelationDatabase } from "../data/UserPlaylistRelationDatabase";
import { TokenManager } from "../services/TokenManager";
import { IdManager } from "../services/IdManager";
import { BaseDatabase } from "../data/BaseDatabase";

export class PlaylistController {
  private static PlaylistBusiness = new PlaylistBusiness(
    new PlaylistDatabase(),
    new MusicDatabase(),
    new MusicPlaylistRelationDatabase(),
    new UserPlaylistRelationDatabase(),
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

  async addMusic(req: Request, res: Response) {
    try {
      const { musicId, playlistId } = req.body;
      const token = req.headers.authorization as string

      const result = await PlaylistController.PlaylistBusiness.addMusic(musicId, playlistId, token);

      res.sendStatus(result.msgCode);
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
    finally {
      await BaseDatabase.desconnectDB()
    }
  }

  async deleteMusicFromPlaylist(req: Request, res: Response) {
    try {
      const { musicId, playlistId } = req.body;
      const token = req.headers.authorization as string

      const result = await PlaylistController.PlaylistBusiness.deleteMusicFromPlaylist(musicId, playlistId, token);

      res.sendStatus(result.msgCode);
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
    finally {
      await BaseDatabase.desconnectDB()
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const page = req.params.page
      const token = req.headers.authorization as string

      const result = await PlaylistController.PlaylistBusiness.getAll(token, page);

      res.status(result.msgCode).send({Playlists: result.message});
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
    finally {
      await BaseDatabase.desconnectDB()
    }
  }

  async sharePlaylist(req: Request, res: Response) {
    try {
      const playlistId = req.params.id
      const token = req.headers.authorization as string

      const result = await PlaylistController.PlaylistBusiness.sharePlaylist(playlistId, token);

      res.sendStatus(result.msgCode)
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
    finally {
      await BaseDatabase.desconnectDB()
    }
  }

  async followPlaylist(req: Request, res: Response) {
    try {
      const playlistId = req.params.id
      const token = req.headers.authorization as string

      const result = await PlaylistController.PlaylistBusiness.followPlaylist(playlistId, token);

      res.sendStatus(result.msgCode)
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
    finally {
      await BaseDatabase.desconnectDB()
    }
  }

  async editPlaylist(req: Request, res: Response) {
    try {
      const playlistId = req.params.id
      const token = req.headers.authorization as string
      const name = req.body.name

      const result = await PlaylistController.PlaylistBusiness.editPlaylist(playlistId, name, token);

      res.sendStatus(result.msgCode)
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
    finally {
      await BaseDatabase.desconnectDB()
    }
  }
}