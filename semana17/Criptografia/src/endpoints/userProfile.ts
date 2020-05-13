import {Response, Request} from 'express'
import { Autorizer } from '../services/Autorizer'
import { UserDataBase } from '../data/UserDatabase'
import { BaseDataBase } from '../data/BaseDatabse'

/*
 - GET (/user/profile)
 - Input no header com o token vindo do login
 - Output no body com email e password
 */

export const userProfileEP = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string
    
    const autorizer = new Autorizer()
    const userPayload = autorizer.getData(token)

    if(userPayload.role !=="normal"){
      throw new Error ('Access Denied')
    }
    const userdatabase = new UserDataBase()
    const userData = await userdatabase.getUserById(userPayload.id)

    res.status(200).send({ 
      id: userData.id,
      email: userData.email,
      role: userData.role
     })
  } 
  catch (err) {
    res.status(400).send({ message: err.message })
  }
  finally {
    await BaseDataBase.destroyConnection()
  }
}