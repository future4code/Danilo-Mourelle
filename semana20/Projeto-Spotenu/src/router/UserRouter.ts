import express from "express";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router();

const user = new UserController();

userRouter.post("/band/signup", user.signupBand);
userRouter.post("/customer/signup", user.signupCustomer);
userRouter.post("/admin/signup", user.signupAdmin)
userRouter.post("/login", user.login)

userRouter.get("/band", user.getAllBands)

userRouter.put("/band/:id", user.approveBand)
userRouter.put('/customer/:id', user.approveCustomer)