import React,{useRef,useState,useEffect} from 'react'
import './css/Login.css';
import FacebookLogo from '../assets/logo/facebook.svg';
import GoogleLogo from '../assets/logo/google.svg';
import LindedinLogo from '../assets/logo/linkedin.svg';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Chess from 'chess.js';
import axios from '../axios.js';
import  { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { cancelable } from "cancelable-promise";

import { Chessboard } from 'react-chessboard';
import useWindowDimensions from './getWindowDimensions.js';

function Login({logo}) {
    const {height,width} = useWindowDimensions();
    const chessboardRef = useRef();
    const [login, setLogin] = useState(true);
    const [available, setAvailable] = useState(false);
    const [game, setGame] = useState(new Chess());
    const [latestTimeout, setLatestTimeout] = useState();

    const [loginMessage,setloginMessage] = useState("");
    const [signupMessage,setsignupMessage] = useState("");

    const navigate = useNavigate();

    const [loginForm, setloginForm] = useState({
        username: "",
        password: ""
    })

    const [signupForm, setsignupForm] = useState({
        name:"",
        username: "",
        email: "",
        password: ""
    })


    useEffect(() => {
        let isMounted = true;
        const token = Cookies.get('token')
        const redirect = (token) => {
            if(token && isMounted){
                navigate('/game');
            }
        }
        redirect(token);
        return () => {
            isMounted = false;
        }
    },[]);

    function safeGameMutate(modify) {
        setGame((g) => {
          const update = { ...g };
          modify(update);
          return update;
        });
    }

    const createNewUser = async (e) => {
        e.preventDefault();
        if(!available){
            setsignupForm("Username Already Taken");
        }else{
            const {data} = await axios.post("/register",{
                name:signupForm.name,
                username:signupForm.username,
                email:signupForm.email,
                password:signupForm.password
            })
            if(data.success) {
                setloginMessage("Account Created! Please login");
                setloginForm(prevState => ({
                    ...prevState,
                    username:data.username
                }))
                setsignupForm({
                    username: "",
                    email: "",
                    password: ""
                })
                setAvailable(false);
                setsignupMessage("");
                setLogin(true);
            }else{
                setsignupMessage(data.message);
            }
        }
    }

    const Login = async (e) => {
        e.preventDefault();
        const {data} = await axios.post("/login",{
            username:loginForm.username,
            password:loginForm.password
        })
        if(data.success){
            Cookies.set('token',data.token,{expires:30});
            navigate('/game');
        }else{
            setloginMessage(data.message)
        }
    }
    

    useEffect(() => {
        setTimeout(makeRandomMove, 3000);
        return () => {
          clearTimeout(latestTimeout);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } ,[]);

    const resetGame = () => {
        clearTimeout(latestTimeout);
        safeGameMutate((game) => {
            game.reset();
        });
        chessboardRef.current.clearPremoves();
        const timeout = setTimeout(makeRandomMove, 3000);
        setLatestTimeout(timeout);
    }

    const makeRandomMove = () => {
        const possibleMoves = game.moves();
    
        // exit if the game is over
        if (game.game_over() === true || game.in_draw() === true || possibleMoves.length === 0) {
          resetGame();
          return
        }
    
        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        safeGameMutate((game) => {
          game.move(possibleMoves[randomIndex]);
        });
    
        const timeout = setTimeout(makeRandomMove, 3000);
        setLatestTimeout(timeout);
    }

    return (
        <div className='login'>

            {/* this is the brown bar which moves left and right */}
            <div 
                className = {`login__colored-container ${!login?'login__colored-container--left':'login__colored-container--right'}`}
            >
            </div>
            {/* Signup Sidebar */}
            <div 
                className={`login__welcome-back ${!login? 'login__welcome-back--active':'login__welcome-back--inactive'}`}
            >
                <div 
                    className="login__welcome-back__logo-container"
                >
                    <img src={logo} alt="TouchMeNot" className='login__welcome-back__logo-container--image'/>
                    TouchMeNot
                </div>

                <div className='login__welcome-back__main-container'>

                    <div className='login__welcome-back__main-container__text-container'>
                        <span className='login__welcome-back__main-container__text-container--title'>Welcome Back</span>
                        <span className='login__welcome-back__main-container__text-container--secondary'>To Keep Playing, please log in.</span>
                    </div>
                    <div onClick={() => setLogin(!login)}
                    className='login__welcome-back__main-container__button-container'>
                        Log In
                    </div>
                </div>
            </div>

            {/* Login Create Container */}

            <div className={`login__create-container ${!login?'login__create-container--active':'login__create-container--inactive'}`}>
            Create Account

                {/* uncomment this section to enable social signup */}

                {/* <div className='login__create-container__social-container' >
                    <img className='login__create-container__social-container--facebook' src={FacebookLogo} alt="Facebook Logo" />
                    <img
                    className='login__create-container__social-container--google' 
                    src={GoogleLogo} alt="Google Logo" />
                    <img className='login__create-container__social-container--linkedin' src={LindedinLogo} alt="LinkedIn Logo" />
                </div> */}
                <span className="login__create-container--info-text">or use email for your registration</span>
                <div className='login__create-container__form-container'>
                    <form className='login__create-container__form-container__form' onSubmit={(e) => {
                        e.preventDefault();
                    }}>
                         <div className='login__create-container__form-container__form__input'>
                         <PersonIcon/>
                            <input value={signupForm.name} 
                                    type="text" 
                                    placeholder='Full Name' 
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setsignupForm(prevState => ({
                                            ...prevState,
                                            name:value
                                        }));
                                    }}
                            />
                        </div>

                        <div className='login__create-container__form-container__form__input'>
                            <AlternateEmailIcon/>
                            <input value={signupForm.username}
                                    onChange={async (e) => {
                                        const value = e.target.value;
                                        setsignupForm(prevState => ({
                                            ...prevState,
                                            username:value
                                        }));
                                        const response = await axios.post("/validUsername",{
                                            "username":value
                                        })
                                        if (response.data.valid) setAvailable(true);
                                        else setAvailable(false);
                                    }}
                                    type="text" 
                                    placeholder='Username' 
                            />
                            {signupForm.username!==''?(
                                available?(<DoneIcon style={{color:'green'}}/>):(<ClearIcon style={{color:'red'}}/>)
                                ):("")
                            }
                            
                        </div>

                        <div className='login__create-container__form-container__form__input'>
                            <EmailIcon/>
                            <input value={signupForm.email} 
                                    type="email" 
                                    placeholder='Email' 
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setsignupForm(prevState => ({
                                            ...prevState,
                                            email:value
                                        }));
                                    }}
                            />
                        </div>

                        <div className='login__create-container__form-container__form__input'>
                            <LockIcon/>
                            <input value={signupForm.password} 
                                    type="Password" 
                                    placeholder='Password' 
                                    onChange = {(e) => {
                                        const value = e.target.value;
                                        setsignupForm(prevState => ({
                                            ...prevState,
                                            password:value
                                        }))
                                    }}
                            />
                        </div>
                        <span className="login__create-container--info-text-notification">{signupMessage}</span>
                        <button
                                onClick={createNewUser}
                                className="login__create-container__form-container__form--submit">
                                Sign Up
                        </button>
                    </form>
                    {!login?(<button
                        onClick={() => setLogin(!login)}
                        className="login__create-container__form-container__form--Login">
                                Login
                    </button>):('')}
                    
                </div>
            </div>

            {/* Chess Container */}

            <div className={`login__login-container ${login ? 'login__login-container--active' : 'login__login-container--inactive'}`}>
                        <div className="long__login-container__chess_container">
                        <Chessboard
                            animationDuration ={2000}
                            id="RandomVsRandom"
                            arePiecesDraggable={false}
                            customDarkSquareStyle = {{
                                backgroundColor:'#769656'
                            }}
                            customLightSquareStyle={{
                                backgroundColor:'#eeeed2'
                            }}
                            boardWidth={(width/100)*45}
                            position={game.fen()}
                            ref={chessboardRef}
                            customBoardStyle={{
                                transition: 'all .7s ease-in-out',
                                borderRadius: '4px',
                                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)'
                            }}
                        />
                        </div>
            </div>

            {/* Login Sidebar */}
            <div className={`login__hello-container ${login ? 'login__hello-container--active' : 'login__hello-container--inactive'}`}>
          
                <img src={logo} alt="TouchMeNot" className='login__hello-container--image'/>
                            <form className='login__hello-container__form' onSubmit={(e) => {
                                e.preventDefault();
                            }}>
                                <div className='login__hello-container__form__input'>
                                    <PersonIcon/>
                                    <input
                                        value={loginForm.username}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setloginForm(prevState => ({
                                                ...prevState,
                                                username:value
                                            }))
                                        }}
                                        type="text" 
                                        placeholder='Username'
                                    />
                                </div>
                                <div
                                className='login__hello-container__form__input'>
                                    <LockIcon/>
                                    <input 
                                        value={loginForm.password}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setloginForm(prevState => ({
                                                ...prevState,
                                                password:value
                                            }))
                                        }}
                                        type="password" 
                                        placeholder='Password'
                                    />
                                </div>
                                <span className='loginmessage'>{loginMessage}</span>
                                <button className='login__hello-container__button'
                                onClick={Login}> Log In</button>
                                <div onClick={() => setLogin(!login)} className="login__hello-container__button">
                                Sign Up</div>
                            </form>
                        
                        
                    
            </div>


        </div>
    )
}

export default Login
