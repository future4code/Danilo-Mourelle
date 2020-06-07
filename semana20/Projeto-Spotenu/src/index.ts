import dotenv from "dotenv";
import { AddressInfo } from "net";
import express from "express";
import { userRouter } from "./router/UserRouter";
import { musicGenreRouter } from "./router/MusicGenreRouter";
import { albumRouter } from "./router/AlbumRouter";
import { musicRouter } from "./router/musicRouter";
import { playlistRouter } from "./router/playlistRouter";

dotenv.config();

const app = express();
app.use(express.json());

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});

app.use("/user", userRouter);
app.use("/music/genre", musicGenreRouter);
app.use('/album', albumRouter);
app.use('/music', musicRouter)
app.use('/playlist', playlistRouter)


