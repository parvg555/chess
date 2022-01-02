import express from 'express'
import {Server, Socket} from 'socket.io'
import http from 'http'
const app = express();
const port = process.env.PORT || 8001;

app.use(express.json());

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors : {
        origin: ["*", "file://","192.168.1.4","192.168.1.1"],
        transports: ['websocket', 'polling']
    },
    allowEIO3: true,
})

app.get('/' , (req,res) => {
    return res.send("TEST TCP");
})

io.sockets.on("connection" , (socket) => {
    console.log(`NEW CONNECTION ${socket.id}`);

    socket.on('disconnect', () => {
        console.log("Disconnected");
    })

    socket.on("error", (err) => {
        socket.disconnect();
    });
});

httpServer.listen(port,() => {
    console.log(`Listening on Localhost:${port}`);
})