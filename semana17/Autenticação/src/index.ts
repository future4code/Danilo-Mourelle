import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import { IdGenerator } from "./services/IdGenerator";
import { Autorizer } from "./services/Autorizer";
import { UserDataBase } from "./data/UserDatabase";

dotenv.config();

const app = express();

app.use(express.json());


/*
 - POST (/singup)
 - Input no body de email e password
 - Output no body de token
 */

app.post('/signup', async (req: Request, res: Response) => {
  try {
    const data = {
      email: req.body.email,
      password: req.body.password
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

    const userdatabase = new UserDataBase()
    await userdatabase.createUser(id, data.email, data.password)

    const autorizer = new Autorizer()
    const token = autorizer.generateToken({id})

    res.status(200).send({ token })
  } catch (err) {
    res.status(400).send({ message: err.message })
  }
})

/*
 - POST (/login)
 - Input no body de email e password
 - Output no body de token
 */
app.post('/login', async (req: Request, res: Response) => {
  try {
    const data = {
      email: req.body.email,
      password: req.body.password
    }
    
   if( data.email === '' || !data.email.icludes('@')){
      throw new Error ('Este email não é válido')
    }

    const userdatabase = new UserDataBase()
    const user = await userdatabase.getUserByEmail(data.email)

    if(user.password !== data.password){
      throw new Error ("Senha inválida")
    }

    const autorizer = new Autorizer()
    const token = autorizer.generateToken({id: user.id})

    res.status(200).send({ token })
  } catch (err) {
    res.status(400).send({ message: err.message })
  }
})

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});


