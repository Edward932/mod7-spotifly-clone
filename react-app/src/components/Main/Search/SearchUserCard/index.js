import { createFollowThunk, deleteFollowThunk } from '../../../../store/users';
import './SearchUserCard.css';
import { useDispatch } from 'react-redux';

export default function SearchUserCard({ user, following }) {
    const dispatch = useDispatch();

    const handleFollow = () => {
        dispatch(createFollowThunk(user.id))
    }

    const handleUnfollow = () => {
        dispatch(deleteFollowThunk(user.id))
    }


    return (
        <div className='search-user-card__outer'>
            <div>
                <i class="fa-solid fa-user"></i> {user.username}
            </div>
            <button>View page (not complete)</button>
            {following[user.id] ? <button onClick={handleUnfollow}>Unfollow(not working)</button> : <button onClick={handleFollow}>Follow</button>}
        </div>
    )
}
