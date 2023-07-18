import './NavBar.css';
import { NavLink } from 'react-router-dom';

export default function NavBar() {

    return (
        <div className="nav-bar__outer-div">
            <NavLink to="/main/search">
            <i className="fa-solid fa-magnifying-glass"></i>
            </NavLink>
            <NavLink to="/main/song-form">
                <i className="fa-solid fa-upload"></i>
            </NavLink>
            <NavLink to="/main/profile">
                <i className="fa-solid fa-user"></i>
            </NavLink>
        </div>
    )
}
