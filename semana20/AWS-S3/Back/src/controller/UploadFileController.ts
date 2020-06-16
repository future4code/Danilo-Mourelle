import { Request, Response } from 'express'
import { S3Service } from "../services/S3Service"

export class UploadFileController {
  public async uploadFile(req: Request, res: Response): Promise<void> {
    try {
      const file = req.files && req.files.file as any
      if(!file){
        throw new Error ("File not sent")
      }

      const s3service = new S3Service()
      const result = await s3service.uploadFile({
        name:file.name, 
        file:file.data
      })

      res.status(200).send(result)
    } catch (error) {
      res.status(400).send(error.msg)
    }
  }
}