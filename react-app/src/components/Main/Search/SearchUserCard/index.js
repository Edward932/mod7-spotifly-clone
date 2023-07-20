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
            <div className='search-user-card__user'>
                <i class="fa-solid fa-user"></i> {user.username}
            </div>
            <div className='search-user-card__button-divs'>
                <button className='search-user-card__view'>View page (ND)</button>
            </div>
            <div className='search-user-card__button-divs'>
                {following[user.id] ? <button className='search-user-card__unfollow' onClick={handleUnfollow}>Unfollow</button> : <button className='search-user-card__follow' onClick={handleFollow}>Follow</button>}
            </div>
        </div>
    )
}
