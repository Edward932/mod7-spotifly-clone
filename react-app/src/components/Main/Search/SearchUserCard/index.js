import { createFollowThunk } from '../../../../store/users';
import './SearchUserCard.css';
import { useDispatch } from 'react-redux';

export default function SearchUserCard({ user }) {
    const dispatch = useDispatch();

    const handleFollow = () => {
        dispatch(createFollowThunk(user.id))
    }

    return (
        <div className='search-user-card__outer'>
            <div>
                <i class="fa-solid fa-user"></i> {user.username}
            </div>
            <button>View page</button>
            <button onClick={handleFollow}>Follow</button>
        </div>
    )
}
