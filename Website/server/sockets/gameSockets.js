import { response } from "express";

const gameSockets = (socket) => {

    socket.on('ping', (callbackFn) => {
        try{
            callbackFn("pong");
        }catch(err){
            console.log(err);
            callbackFn("PLEASE RETRY AFTER SOME TIME");
        }
    })

    socket.on('create-room',(callbackFn) => {
        try{
            if(socket.roomid){
                callbackFn("inroom");
            }else{
                var roomid = new Date();
                roomid = roomid.getTime();
                socket.join(roomid);
                socket.roomid = roomid;
                console.log("\x1b[36m",`${socket.username} created ${socket.roomid}`);
                callbackFn(socket.roomid);
            }
        }catch(error){
            console.log(error);
            callbackFn("Error")
        }
    });

    socket.on('join-room', (data,userData,callbackFn) => {
        try{
            if(socket.adapter.rooms.has(parseInt(data))){
                if(socket.adapter.rooms.get(parseInt(data)).size === 1){
                    var [opponent] = socket.adapter.rooms.get(parseInt(data));
                    callbackFn(data);
                    socket.join(parseInt(data));
                    socket.roomid = parseInt(data);
                    socket.to(socket.roomid).emit('opponent-data',userData);
                    console.log("\x1b[36m",`${socket.username} joined ${socket.roomid}`);
                }else{
                    callbackFn("full");
                }
                console.log();
            }else{
                callbackFn("noroom")
            }

        }catch(error){
            console.log(error);
            callbackFn("Error");
        }
    })

    socket.on('start-game', (data) =>{
        socket.to(socket.roomid).emit('opponent-data',data);
        socket.to(socket.roomid).emit('game-started',data);
    })

    socket.on('delete-room', (callbackFn) => {
        try{
            if(socket.roomid){
                console.log("\x1b[33m",`${socket.username} deleted ${socket.roomid}`);
                socket.to(socket.roomid).emit('opponent-left');
                callbackFn('deleted');
            }else{
                callbackFn('noroom');
            }
        }catch(error){
            console.log(error);
            callbackFn("Error");
        }
    })

    socket.on('opponent-left',() => {
        socket.leave(socket.roomid);
        socket.roomid = null;
    })

    socket.on('make-move',(data) => {
        socket.to(socket.roomid).emit('move',data);
    })

    socket.on('leave-game', (callbackFn) => {
        if(socket.roomid){
            socket.to(socket.roomid).emit('opponent-left');
            socket.leave(socket.roomid);
            socket.roomid = null;
            callbackFn('left');
        }else{
            callbackFn('error');
        }
    })

}


export default gameSockets;