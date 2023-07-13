import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUserSongsThunk } from '../../../store/songs';
import ProfileSongCard from './ProfileSongCard';

export default function Profile () {
    const user = useSelector(state => state.session.user);
    const songsStore = useSelector(state => state.songs.userSongs);
    const [newDelete, setNewDelete] = useState(false);

    const dispatch = useDispatch();

    const [songs, setSongs] = useState(Object.values(songsStore));

    useEffect(() => {
        (async () => {
            const fetched_songs = await dispatch(getUserSongsThunk());
            setSongs(Object.values(fetched_songs.payload));
        })();

    }, [dispatch]);

    useEffect(() => {
        setSongs(Object.values(songsStore))
    }, [newDelete])


    return (
        <div>
            <h1>{user.username}</h1>
            <ul>
                {songs.map(song => (
                    <li key={song.id}>
                        <ProfileSongCard song={song} setNewDelete={setNewDelete} newDelete={newDelete} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
