import express from "express";
import { MusicController } from "../controller/MusicController";


export const musicRouter = express.Router();

const music = new MusicController();

musicRouter.post("/create", music.create);
