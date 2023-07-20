import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedThunk } from '../../../store/songs';
import './Feed.css';
import FeedSongCard from './FeedSongCard';

export default function Feed({ setPlayedLength, setPaused, audioEl, setCurrentSong}) {
    const feedSongs = useSelector(state => state.songs.feedSongs);

    const [songsArr, setSongsArr] = useState(Object.values(feedSongs));


    const dispatch = useDispatch()

    useEffect(() => {
        (async() => {
            const res = await dispatch(getFeedThunk())
            setSongsArr(res.payload);
        })();
    }, []);

    return (
        <div>
            <h1>FEED</h1>
            <ul>
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
