import express from 'express'
import { UploadFileController } from '../controller/UploadFileController'

export const fileRouter = express.Router()

fileRouter.put("/upload", new UploadFileController().uploadFile)