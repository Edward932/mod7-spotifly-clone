import './Splash.css'
import { Link } from "react-router-dom";

export default function Splash() {


    return (
        <div className="splash__outer">
            <div className="splash__top-nav">
                <p>(ADD LOGO) Sound spot</p>
                <Link to="/login">Login</Link>
            </div>
            <div className="splash__main">
                <h1>SoundSpot</h1>
                <p>Description ....</p>
                <div className="splash__main-buttons">
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign up</Link>
                </div>
            </div>
            <div className="splash__bottom-links">
                bottom links
            </div>
        </div>
    )
}
