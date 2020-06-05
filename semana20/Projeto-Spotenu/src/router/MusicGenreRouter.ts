import express from "express";
import { MusicGenreController } from "../controller/MusicGenreController";

export const musicGenreRouter = express.Router();

const musicGenre = new MusicGenreController()

musicGenreRouter.post("/create", musicGenre.create);
// musicGenreRouter.post("/create", musicGenre.createPost);

// musicGenreRouter.get("/feedtype", musicGenre.getPostsType);
 
