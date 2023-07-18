import './Splash.css'
import { Link } from "react-router-dom";

export default function Splash() {


    return (
        <div className="splash__outer">
            <div className="splash__top-nav">
                <div className='splash__top-nav-home'>
                    <i class="fa-brands fa-spotify"></i>
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
                bottom links
            </div>
        </div>
    )
}
