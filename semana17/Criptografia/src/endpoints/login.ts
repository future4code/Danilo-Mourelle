import { Request, Response } from 'express'
import { UserDataBase } from '../data/UserDatabase'
import { HashManager } from '../services/HashManager'
import { Autorizer } from '../services/Autorizer'
import { BaseDataBase } from '../data/BaseDatabse'

/*
 - POST (/login)
 - Input no body de email e password
 - Output no body de token
 */

export const loginEP = async (req: Request, res: Response) => {
  try {
    const data = {
      email: req.body.email,
      password: req.body.password
    }

    if (data.email === '' || !data.email.includes('@')) {
      throw new Error('Este email não é válido')
    }

    const userdatabase = new UserDataBase()
    const user = await userdatabase.getUserByEmail(data.email)

    const hashManager = new HashManager()
    const isPasswordCorrect = await hashManager.compare(data.password, user.password)

    if (!isPasswordCorrect) {
      throw new Error("Senha inválida")
    }

    const autorizer = new Autorizer()
    const token = autorizer.generateToken({
      id: user.id,
      role: user.role
    })

    res.status(200).send({ token })
  } catch (err) {
    res.status(400).send({ message: err.message })
  }
  finally {
    await BaseDataBase.destroyConnection()
  }
}