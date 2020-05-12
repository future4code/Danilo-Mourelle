import { Request, Response } from 'express'
import { UserDataBase } from '../data/UserDatabase'
import { Autorizer } from '../services/Autorizer'
import { BaseDataBase } from '../data/BaseDatabse'

/*
 - GET (/user/:id)
 - Token into headers, id into path params
 - Output into body
*/

export const userByIdEP = async (req: Request, res: Response) => {
  try {
    const data = {
      token: req.headers.authorization as string,
      id: req.params.id
    }

    const autorizer = new Autorizer()
    const userPayload = autorizer.getData(data.token)

    const userdatabase = new UserDataBase()
    const userData = await userdatabase.getUserById(data.id)

    res.status(200).send({
      id: userData.id,
      email: userData.email,
      role: userData.role,
    });
  }
  catch (err) {
    res.status(400).send({ message: err.message })
  }
  finally {
    await BaseDataBase.destroyConnection()
  }
}