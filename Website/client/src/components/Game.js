import React, {useEffect , useState} from 'react'
import axios from '../axios.js';
import Cookies from 'js-cookie';
import  { useNavigate } from 'react-router-dom'
import { cancelable } from "cancelable-promise";


function Game() {
    const navigate = useNavigate();
    const [userData, setuserData] = useState({});

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

    // useEffect(async () => {
    //     const token = Cookies.get('token');
    //     if(!token) navigate('/');
    //     const response = await axios.get('/getUserData',{
    //         headers: {
    //             'token':token,
    //         }
    //     })
    //     if(!response.data.success){
    //         Cookies.remove('token');
    //         navigate('/');
    //     }
    //     setuserData(response.data);
    // }, [])

    return (
        <div>
            <>User ID:{userData._id}</>
        </div>
    )
}

export default Game
