import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import "./config.js"
import Board from './routes/Board.js'

const app = express();
const port = process.env.PORT || 8001;
const DBusername = process.env.DBusername;
const DBpassword = process.env.DBpassword;
const DBname = process.env.DBname;
const DBcluster = process.env.DBcluster;
const connection_url = `mongodb+srv://${DBusername}:${DBpassword}@${DBcluster}.mongodb.net/${DBname}?retryWrites=true&w=majority`;


app.use(express.json())
app.use(Cors());
app.use(Board);

mongoose
    .connect(connection_url)
    .then((result) => {
        console.log("CONNECTED TO DATABASE");
        app.listen(port ,() => [
            console.log(`Listening on Localhost:${port}`)
        ])
    })
    .catch((err) => {
        console.log("CANNOT CONNECT TO DATABASE");
    })
