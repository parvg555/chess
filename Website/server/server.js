import mongoose from 'mongoose'
import express from 'express'
import "./config.js"
import AuthRouter from './routes/auth.js'
import cookieParser from 'cookie-parser'
import Cors from 'cors'
import UserData from './routes/UserData.js'
import {Server} from 'socket.io'
import http from 'http'
import { serialize } from 'v8'


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
app.use(UserData);

app.get('/',(req,res) => {
    return res.send("TOUCH ME NOT");
})

const connection_url = `mongodb+srv://${DBusername}:${DBpassword}@${DBcluster}.mongodb.net/${DBname}?retryWrites=true&w=majority`;

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors:{
        origin:["http://localhost:3000" , "*"],
        methods:["GET","POST"]
    },
})

// COLOR LIBRARY FOR CONSOLE LOG

// Reset = "\x1b[0m"
// Bright = "\x1b[1m"
// Dim = "\x1b[2m"
// Underscore = "\x1b[4m"
// Blink = "\x1b[5m"
// Reverse = "\x1b[7m"
// Hidden = "\x1b[8m"

// FgBlack = "\x1b[30m"
// FgRed = "\x1b[31m"
// FgGreen = "\x1b[32m"
// FgYellow = "\x1b[33m"
// FgBlue = "\x1b[34m"
// FgMagenta = "\x1b[35m"
// FgCyan = "\x1b[36m"
// FgWhite = "\x1b[37m"

// BgBlack = "\x1b[40m"
// BgRed = "\x1b[41m"
// BgGreen = "\x1b[42m"
// BgYellow = "\x1b[43m"
// BgBlue = "\x1b[44m"
// BgMagenta = "\x1b[45m"
// BgCyan = "\x1b[46m"
// BgWhite = "\x1b[47m"

io.on("connection", (socket) => {
    console.log('\x1b[32m',`NEW SOCKET CONNECTION:${socket.id}`);

    socket.on("disconnect", () => {
        console.log('\x1b[31m',`SOCKET DISCONNECTED:${socket.id}`);
    })

})


mongoose
    .connect(connection_url)
    .then((result) => {
        console.log("Connected To Database");
        httpServer.listen(port, () => console.log(`Listening on Localhost:${port}`))
    })
    .catch((err) => {
        console.log('\x1b[31m',"Error Connecting to Database");
    });
