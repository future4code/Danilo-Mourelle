import express from 'express'
import { PlaylistController } from '../controller/PlaylistController'

export const playlistRouter = express.Router()

const playlist = new PlaylistController()

playlistRouter.post('/create', playlist.create)
playlistRouter.post('/music/add', playlist.addMusic)
playlistRouter.post('/follow/:id',playlist.followPlaylist)

playlistRouter.get('/getall/:page', playlist.getAll)

playlistRouter.put('/edit/:id', playlist.editPlaylist)
playlistRouter.put('/share/:id', playlist.sharePlaylist)

playlistRouter.delete('/music/delete', playlist.deleteMusicFromPlaylist)