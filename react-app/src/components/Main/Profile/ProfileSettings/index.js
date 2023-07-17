import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../../context/Modal"
import { logout } from "../../../../store/session";
import { useHistory } from 'react-router-dom';
import './ProfileSettings.css';

export default function ProfileSettings () {
    const user = useSelector(state => state.session.user);

    const { closeModal } = useModal();
    const history = useHistory();
    const dispatch = useDispatch();

    const handleLogout = async() => {
        await dispatch(logout());
        history.push("");
        closeModal();
    }

    if(!user) {
        return (
            <h1>Loging out ...</h1>
        )
    }

    return (
        <div className="profile-settings__outer">
            <div className="profile-settings__upper">
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
            </div>
            <div>
                <button onClick={closeModal}>Close</button>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}
