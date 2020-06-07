import express from 'express'
import { PlaylistController } from '../controller/PlaylistController'

export const playlistRouter = express.Router()

const playlist = new PlaylistController()

playlistRouter.post('/create', playlist.create)
playlistRouter.post('/music/add', playlist.addMusic)

playlistRouter.get('/getall/:page', playlist.getAll)

playlistRouter.delete('/music/delete', playlist.deleteMusicFromPlaylist)