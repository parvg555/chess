import Router from 'express';
import {Authorizer} from "./verifyToken.js";
import User from '../models/User.js';


const Game = Router();


Game.get('/getUserData', Authorizer, async(req,res) => {
    const user = await User.findOne({
        _id:req.user._id
    })
    return res.send({
        'success':true,
        '_id':user._id,
        'name':user.name,
        'username':user.username,
        'email':user.email,
        'boardid':user.boardid
    });
})

export default Game