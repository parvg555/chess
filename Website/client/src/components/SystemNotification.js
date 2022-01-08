import React from 'react'

import CloseIcon from '@mui/icons-material/Close';

import './css/SystemNotification.css';

function SystemNotification({notification,setnotification}) {
    return (
        <>
            {notification.title?(
                <div className='notification'>
                    <div className='notification-dialogue'>
                        <div className='notification-cross'>
                        <CloseIcon 
                            fontSize='large'
                            onClick = {() => {
                                setnotification({});
                            }}
                        />
                        </div>
                        <div className='notification-gameOver'>
                            {notification.title}
                        </div>
                        <div className='notification-reason'>
                            {notification.text}
                        </div>
                    </div>
                </div>
            ):('')}
        </>
    )
}

export default SystemNotification
