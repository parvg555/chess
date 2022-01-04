import Router from 'express';
import Board from '../models/Board.js';

const BoardRouter = Router();

BoardRouter.get('/GetStatus/:connection_string',async (req,res) => {
    // console.log(req.params.connection_string);
    try{
        const board = await Board.findOne({
            connection_string:req.params.connection_string
        })
        var time_now = new Date();
        if(board){
            res.send({
                "success":true,
                "online":(time_now - board.ping) < 10000 ? true :false,
                "status":board.status
            })
        }else{
            res.send({
                "success":false,
                "message":"Unable to find Board"
            })
        }
    }catch{
        res.send({
            "success":false,
            "message":"An Error Occured"
        })
    }
})

BoardRouter.get('/ping/:connection_string', async (req,res) => {
    try{
        var time_now = new Date();
        const response = await Board.updateOne(
            {connection_string: req.params.connection_string},
            {
                $set:{
                    "ping":time_now,
                },
                $currentDate: {lastModified: true}
            }
        )
        const board = await Board.findOne({
            connection_string:req.params.connection_string
        })
        // console.log(response);
        const ResponseString = `${board.to}_${board.from}`;
        res.send(ResponseString);
    }catch(err){
        res.send({
            "success":false,
            "message":err,
        })
    }
})

BoardRouter.get('/setComplete/:connection_string', async(req,res) => {
    try {
        const response = await Board.updateOne(
            {connection_string: req.params.connection_string},
            {
                $set: {
                    "status":"available",
                    "from":null,
                    "to":null
                },
                $currentDate: {lastModified: true}
            }
        ) 

        res.send({
            "success":true
        })

    }catch(err){
        res.send({
            "success":false,
            "message":err
        })
    }
})

BoardRouter.post('/registerBoard', async (req,res) => {
    // console.log(req.body);
    const board = new Board ({
        connection_string: req.body.connection_string,
        status: "available"
    })
    try {
        const SavedBoard = await board.save();
        res.send({
            "success":true,
            "_id":board._id
        })
    }catch(err){
        res.send({
            "success":false,
            "message":err.msg
        })
    }
})


BoardRouter.post('/sendMove', async (req,res) => {
    try {
        const response = await Board.updateOne(
            {connection_string: req.body.connection_string},
            {
                $set: {
                    "from":req.body.from,
                    "to":req.body.to,
                    "status":"processing",
                },
                $currentDate: {lastModified: true}
            }
        ) 

        res.send({
            "success":true
        })

    }catch(err){
        res.send({
            "success":false,
            "message":err
        })
    }
})

export default BoardRouter;