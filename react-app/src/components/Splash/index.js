import './Splash.css'
import { Link } from "react-router-dom";

export default function Splash() {


    return (
        <div className="splash__outer">
            <div className="splash__top-nav">
                <div className='splash__top-nav-home'>
                    <i className="fa-brands fa-spotify"></i>
                    <p>SoundSpot</p>
                </div>
                <Link
                    to="/login"
                    className="splash__top-nav-link"
                >
                    Login
                </Link>
            </div>
            <div className="splash__main">
                <h1>SoundSpot</h1>
                <p className='splash__main-description'>SoundSpot is a digital music, podcast, and video service that gives you access to millions of songs and other content from creators all over the world.</p>
                <div className="splash__main-buttons">
                    <Link className="splash__main-links" to="/login">Login</Link>
                    <Link className="splash__main-links" to="/signup">Sign up</Link>
                </div>
            </div>
            <div className="splash__bottom-links">
                <div className='splash__bottom-corners'>
                    <Link className="splash__button-links" target="_blank" to={{ pathname: "https://github.com/Edward932" }}>Github</Link>
                    <Link className="splash__button-links" to={{ pathname: "https://www.linkedin.com/in/edwardhuffstetler/" }}>LinkedIn</Link>
                </div>
                <div className='splash__bottom-middle'>
                    <Link className="splash__button-links" target="_blank" to={{ pathname: "https://react.dev/" }}>React</Link>
                    <Link className="splash__button-links" target="_blank" to={{ pathname: "https://flask.palletsprojects.com/en/2.3.x/" }}>Flask</Link>
                    <Link className="splash__button-links" target="_blank" to={{ pathname: "https://aws.amazon.com/" }}>AWS</Link>
                    <Link className="splash__button-links" target="_blank" to={{ pathname: "https://redux.js.org/" }}>Redux</Link>
                    <Link className="splash__button-links" target="_blank" to={{ pathname: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" }}>JavaScript</Link>
                    <Link className="splash__button-links" target="_blank" to={{ pathname: "https://www.python.org/" }}>Python</Link>
                </div>
                <div className='splash__bottom-corners'>
                    <Link className="splash__button-links" target="_blank" to={{ pathname: "https://github.com/Edward932/mod7-spotifly-clone" }}>Link to repository</Link>
                </div>
            </div>
        </div>
    )
}
