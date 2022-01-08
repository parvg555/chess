import React from 'react'
import Cookies from 'js-cookie';
import  { useNavigate } from 'react-router-dom';

import './css/Game.css';

import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import QrCodeIcon from '@mui/icons-material/QrCode';
import LanguageIcon from '@mui/icons-material/Language';
import InfoIcon from '@mui/icons-material/Info';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';

function LeftMenu({logo,ComingSoon}) {

    const navigate = useNavigate();

    return (
        <div className='menu'>
            <img  className='menu-logo' src={logo} alt="" />
            <div className='menu-item-container'>
                <div className='menu-item'>
                    <SportsEsportsIcon fontSize='large' />
                    <h2>Play</h2>
                </div>
                <div 
                    className='menu-item'
                    onClick={() => {
                        ComingSoon();
                    }}
                >
                    <AccountBoxIcon fontSize='large' />
                    <h2>Profile</h2>
                </div>
                <div 
                    className='menu-item'
                    onClick={() => {
                        ComingSoon();
                    }}
                >
                    <LightbulbIcon fontSize='large' />
                    <h2>Learn</h2>
                </div>
                <div 
                    className='menu-item'
                    onClick={() => {
                        ComingSoon();
                    }}
                >
                    <NewspaperIcon fontSize='large' />
                    <h2>News</h2>
                </div>
                <div 
                    className='menu-item'
                    onClick={() => {
                        ComingSoon();
                    }}
                >
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
                <div 
                    className='sidebar-footer-item'
                    onClick={() => {
                        ComingSoon();
                    }}
                >
                    <LanguageIcon/>
                    <h2>Language</h2>
                </div>
                <div 
                    className='sidebar-footer-item'
                    onClick={() => {
                        ComingSoon();
                    }}
                >
                    <InfoIcon/>
                    <h2>Info</h2>
                </div>
                <div 
                    className='sidebar-footer-item'
                    onClick={() => {
                        ComingSoon();
                    }}
                >
                    <HelpCenterIcon/>
                    <h2>Help</h2>
                </div>
            </div> 
        </div>
    )
}

export default LeftMenu
