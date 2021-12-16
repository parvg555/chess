import React,{useRef,useState,useEffect} from 'react'
import './css/Login.css'
import FacebookLogo from '../assets/logo/facebook.svg'
import GoogleLogo from '../assets/logo/google.svg'
import LindedinLogo from '../assets/logo/linkedin.svg'
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import Chess from 'chess.js';

import { Chessboard } from 'react-chessboard';

function Login({logo}) {
    const chessboardRef = useRef();
    const [login, setLogin] = useState(true);
    const [available, setAvailable] = useState(false);
    const [game, setGame] = useState(new Chess());
    const [latestTimeout, setLatestTimeout] = useState();



    function safeGameMutate(modify) {
        setGame((g) => {
          const update = { ...g };
          modify(update);
          return update;
        });
    }

    useEffect(() => {
        setTimeout(makeRandomMove, 3000);
        return () => {
          clearTimeout(latestTimeout);
        };
    }, []);

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
                <div className='login__create-container__social-container' >
                    <img className='login__create-container__social-container--facebook' src={FacebookLogo} alt="Facebook Logo" />
                    <img
                    className='login__create-container__social-container--google' 
                    src={GoogleLogo} alt="Google Logo" />
                    <img className='login__create-container__social-container--linkedin' src={LindedinLogo} alt="LinkedIn Logo" />
                </div>
                <span className="login__create-container--info-text">or use email for your registration</span>
                <div className='login__create-container__form-container'>
                    <form className='login__create-container__form-container__form'>

                        <div className='login__create-container__form-container__form__input'>
                            <PersonIcon/>
                            <input type="text" placeholder='Username' />
                            {available?(<DoneIcon style={{color:'green'}}/>):(<ClearIcon style={{color:'red'}}/>)}
                            
                        </div>

                        <div className='login__create-container__form-container__form__input'>
                            <EmailIcon/>
                            <input type="email" placeholder='Email' />
                        </div>

                        <div className='login__create-container__form-container__form__input'>
                            <LockIcon/>
                            <input type="Password" placeholder='Password' />
                        </div>
                        <button
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
                            animationDuration ={3000}
                            id="RandomVsRandom"
                            arePiecesDraggable={false}
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
                            <form className='login__hello-container__form'>
                                <div className='login__hello-container__form__input'>
                                    <PersonIcon/>
                                    <input type="text" placeholder='Username'/>
                                </div>
                                <div
                                className='login__hello-container__form__input'>
                                    <LockIcon/>
                                    <input type="password" 
                                    placeholder='Password'/>
                                </div>
                                <button className='login__hello-container__button'> Log In</button>
                            </form>
                        
                        <div onClick={() => setLogin(!login)} className="login__hello-container__button">
                        Sign Up
                    </div>
            </div>


        </div>
    )
}

export default Login
