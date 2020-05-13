import { Request, Response } from 'express'
import { UserDataBase } from '../data/UserDatabase'
import { HashManager } from '../services/HashManager'
import { Autorizer } from '../services/Autorizer'
import { BaseDataBase } from '../data/BaseDatabse'

/*
 - DELETE (/user/:id)
 - Input path params id
 - Only admins can use this endpoint
*/

export const deleteUserByIdEP = async (req: Request, res: Response) => {
  try {
    const data = {
      token: req.headers.authorization as string,
      id: req.params.id
    }

    const autorizer = new Autorizer()
    const userPayload = autorizer.getData(data.token)

    if (userPayload.role !== 'admin') {
      throw new Error('Access Denied')
    }

    const userdatabase = new UserDataBase()
    await userdatabase.deleteUserById(data.id)

    res.sendStatus(200)
  } 
  catch (err) {
    res.status(400).send({
      message: err.message,
    });
  } 
  finally {
    await BaseDataBase.destroyConnection()
  }
}
