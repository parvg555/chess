import React, {useEffect , useState} from 'react'
import axios from '../axios.js';
import Cookies from 'js-cookie';
import  { useNavigate } from 'react-router-dom'
import { cancelable } from "cancelable-promise";
import './css/Game.css';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import QrCodeIcon from '@mui/icons-material/QrCode';
import LogoutIcon from '@mui/icons-material/Logout';
import LanguageIcon from '@mui/icons-material/Language';
import InfoIcon from '@mui/icons-material/Info';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import { Avatar, IconButton } from "@mui/material";
import MicSharpIcon from '@mui/icons-material/MicSharp';

function Game({logo}) {
    const navigate = useNavigate();
    const [userData, setuserData] = useState({});
    const [boardStatus, setboardStatus] = useState("online");

    useEffect(async () => {
            let isMounted = true;
            const token = Cookies.get('token');
            await axios.get('/getUserData',{
                headers:{
                    'token':token,
                }
            }).then((response) => {
                if(!response.data.success){
                    Cookies.remove('token');
                    navigate('/');
                }
                if(isMounted) setuserData(response.data)
            })
            return () => {
                isMounted = false;
            }
    },[]);


    return (
        <div className='Game'>
            {/* LEFT MENU BAR */}
            <div className='menu'>
                <img  className='menu-logo' src={logo} alt="" />
                <div className='menu-item-container'>
                    <div className='menu-item'>
                        <SportsEsportsIcon fontSize='large' />
                        <h2>Play</h2>
                    </div>
                    <div className='menu-item'>
                        <AccountBoxIcon fontSize='large' />
                        <h2>Profile</h2>
                    </div>
                    <div className='menu-item'>
                        <LightbulbIcon fontSize='large' />
                        <h2>Learn</h2>
                    </div>
                    <div className='menu-item'>
                        <NewspaperIcon fontSize='large' />
                        <h2>News</h2>
                    </div>
                    <div className='menu-item'>
                        <QrCodeIcon fontSize='large' />
                        <h2>QR</h2>
                    </div>
                    
                </div>
                {/* sidebar footer */}
                <div className="sidebar-footer">
                    <div onClick={() => {
                            Cookies.remove('token');
                            navigate('/');
                        }} 
                        className='sidebar-footer-item'
                    >
                        <ExitToAppIcon/>
                        <h2>LogOut</h2>
                    </div>
                    <div className='sidebar-footer-item'>
                        <LanguageIcon/>
                        <h2>Language</h2>
                    </div>
                    <div className='sidebar-footer-item'>
                        <InfoIcon/>
                        <h2>Info</h2>
                    </div>
                    <div className='sidebar-footer-item'>
                        <HelpCenterIcon/>
                        <h2>Help</h2>
                    </div>
                </div> 
            </div>
            {/* GAMING AREA */}
            <div className='gaming-area'>

                <div className='player'>
                    <Avatar src="https://avatars.githubusercontent.com/u/61341517?v=4" variant="rounded" sx={{ width: 46, height: 46 }}/>
                    <div className="player-details">
                        <h2>Player Name</h2>
                        <p>India</p>
                    </div>
                </div>
                <div className='chess-container'>
                    <div className='chess'>
                        {/* <h2>container for chess board</h2> */}
                    </div>
                </div>
                <div className='player'>
                    <Avatar src="https://avatars.githubusercontent.com/u/61341517?v=4" variant="rounded" sx={{ width: 46, height: 46 }}/>
                    <div className="player-details">
                        <h2>Player Name</h2>
                        <p>India</p>
                    </div>
                </div>
            </div>
            {/* RIGHT MENU BAR */}
            <div className="right-menu">
                <div className="right-menu-container">
                    {/* board status */}
                    <div className={`board-status ${boardStatus}`} >
                        Board Id: 21323123123
                    </div>
                    {/* Timer */}
                    <div className="timer">
                        <p>00:00</p>
                    </div>
                    {/* Moves Bar */}
                    <div className="moves">
                        <div className="move">
                            <p className='move-name'>Player 1</p>
                            <p>A1 &#8594; B3</p>
                        </div>
                        <div className="move move_mine">
                            <p className='move-name'>Player 2</p>
                            <p>A4 &#8594; B7</p>
                        </div>
                    </div>
                    {/* Options */}
                    <div className="options">
                        <div className="button">
                            Quit Game
                        </div>
                        <div className='half-button-container'>
                            <div className="button-half">
                                <MicSharpIcon fontSize='large' />
                            </div>
                            <div className="button-half right">
                                <LightbulbIcon fontSize='large' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Game
