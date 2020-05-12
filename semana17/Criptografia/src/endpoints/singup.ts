import { Request, Response } from 'express'
import { IdGenerator } from '../services/IdGenerator'
import { HashManager } from '../services/HashManager'
import { UserDataBase } from '../data/UserDatabase'
import { Autorizer } from '../services/Autorizer'
import { BaseDataBase } from '../data/BaseDatabse'

/*
 - POST (/singup)
 - Input no body de email e password
 - Output no body de token
 */

export const singupEP = async (req: Request, res: Response) => {
  try {
    const data = {
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    }
    console.log(data)
    if (data.email === '' || !data.email.includes('@')) {
      throw new Error('Este email não é válido')
    }
    if (data.password.length < 6) {
      throw new Error('Senha menor que 6 caracteres')
    }

    const idGenerator = new IdGenerator()
    const id = idGenerator.generate()

    const hashManager = new HashManager()
    const hash = await hashManager.generateHash(data.password)

    const userdatabase = new UserDataBase()
    await userdatabase.createUser(id, data.email, hash, data.role)

    const autorizer = new Autorizer()
    const token = autorizer.generateToken({
      id,
      role: data.role
    })

    res.status(200).send({ token })
  } catch (err) {
    res.status(400).send({ message: err.message })
  }
  finally {
    await BaseDataBase.destroyConnection()
  }
}