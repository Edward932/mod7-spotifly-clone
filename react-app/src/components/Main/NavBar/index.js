import './NavBar.css';
import { NavLink } from 'react-router-dom';

export default function NavBar() {

    return (
        <div className="nav-bar__outer-div">
            <NavLink to="/main/search">
                Search
            </NavLink>
            <NavLink to="/main/song-form">
                Upload new song
            </NavLink>
            <NavLink to="/main/profile">
                My Profile
            </NavLink>
        </div>
    )
}
