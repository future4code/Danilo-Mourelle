import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import { IdGenerator } from "./services/IdGenerator";
import { Autorizer } from "./services/Autorizer";
import { UserDataBase } from "./data/UserDatabase";
import { HashManager } from "./services/HashManager";
import { loginEP } from "./endpoints/login";
import { singupEP } from "./endpoints/singup";
import { userProfileEP } from "./endpoints/userProfile";

dotenv.config();

const app = express();

app.use(express.json());


app.post('/signup', singupEP)
app.post('/login', loginEP)

app.get('/user/profile', userProfileEP)

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});


