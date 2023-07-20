import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedThunk } from '../../../store/songs';

export default function Feed() {
    const feedSongs = useSelector(state => state.songs.feedSongs);

    const [songsArr, setSongsArr] = useState(Object.values(feedSongs));


    const dispatch = useDispatch()

    useEffect(() => {
        (async() => {
            const res = await dispatch(getFeedThunk())
            setSongsArr(res.payload);
        })();
    }, []);


    console.log(songsArr);

    return (
        <div>
            <h1>FEED</h1>
            <ul>
                {songsArr.map(song => (
                    <li key={song.id}>
                        {song.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}
