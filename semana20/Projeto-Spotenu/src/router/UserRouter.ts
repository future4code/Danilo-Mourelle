import express from "express";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router();

const user = new UserController();

userRouter.post("/band/signup", user.signupBand);
userRouter.post("/customer/signup", user.signupCustomer);
