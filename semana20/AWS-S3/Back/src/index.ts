import dotenv from 'dotenv'
import express, { application } from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import { fileRouter } from './router/uploadFile'

dotenv.config();

const app = express()

app.use(cors())
app.use(express.json())
app.use(fileUpload())

app.use("/files", fileRouter)
export default app