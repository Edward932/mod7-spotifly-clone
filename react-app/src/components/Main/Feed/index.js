import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedThunk } from '../../../store/songs';
import './Feed.css';
import FeedSongCard from './FeedSongCard';

export default function Feed({ setPlayedLength, setPaused, audioEl, setCurrentSong}) {
    const feedSongs = useSelector(state => state.songs.feedSongs);
    const user = useSelector(state => state.session.user);

    const [songsArr, setSongsArr] = useState(Object.values(feedSongs));


    const dispatch = useDispatch()

    useEffect(() => {
        (async() => {
            const res = await dispatch(getFeedThunk())
            setSongsArr(res.payload);
        })();
    }, [dispatch]);

    return (
        <div className='feed__outer'>
            <h1><i className="fa-regular fa-user"></i> {user.username}'s Feed</h1>
            <ul>
                <li className='feed__display-list'><p>Title</p><p>Description</p><p>Date</p></li>
                {songsArr.map(song => (
                    <li key={song.id}>
                        <FeedSongCard
                                        song={song}
                                        setPlayedLength={setPlayedLength}
                                        setPaused={setPaused}
                                        audioEl={audioEl}
                                        setCurrentSong={setCurrentSong}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}
