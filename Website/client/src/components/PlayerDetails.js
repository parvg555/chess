import React from 'react'

import './css/Game.css'

import {Avatar} from "@mui/material";
import { height } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


function PlayerDetails({image,name,details,visible}) {

    function stringAvatar(name) {
        if(!name) name = "undefined"
        const FirstName = name.split(' ')[0][0];
        const LastName = name.split(' ')[name.split(' ').length - 1][0]

        return {
          sx: {
            bgcolor: "#769656",
            width: 46,
            height: 46,
          },
          children: `${FirstName}${LastName}`,
        };
    }

    return (
        <div className={`player ${!visible && 'hidden'}`}>
            {   details !=='waiting' ?(
                <Avatar {...stringAvatar(name)} variant="rounded"/>
                ):(
                    <Box sx={{display:'flex'}}>
                        <CircularProgress sx={{color:'#dfd9d9'}}/>
                    </Box>
                )
            }
            <div className="player-details">
                <h2>{name}</h2>
                <p>
                    {   details !=='waiting' &&
                        <>
                            @{details}
                        </>
                    }
                </p>
            </div>
        </div>
    )
}

export default PlayerDetails
