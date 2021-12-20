import mongoose from 'mongoose'
import express from 'express'
import "./config.js"
import AuthRouter from './routes/auth.js'
import cookieParser from 'cookie-parser'
import Cors from 'cors'
import Game from './routes/game.js'

const app = express()
const port = process.env.PORT || 8001;
const DBusername = process.env.DBusername;
const DBpassword = process.env.DBpassword;
const DBname = process.env.DBname;
const DBcluster = process.env.DBcluster;


app.use(express.json());
app.use(Cors());
app.use(cookieParser());
app.use(AuthRouter);
app.use(Game);

const connection_url = `mongodb+srv://${DBusername}:${DBpassword}@${DBcluster}.mongodb.net/${DBname}?retryWrites=true&w=majority`;


mongoose
    .connect(connection_url)
    .then((result) => {
        console.log("Connected To Database");
        app.listen(port, () => console.log(`Listening on Localhost:${port}`))
    })
    .catch((err) => {
        console.log("Error Connecting to Database");
    });
