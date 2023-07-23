import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUserSongsThunk } from '../../../store/songs';
import ProfileSongCard from './ProfileSongCard';
import OpenModalButton from '../../OpenModalButton';
import "./Profile.css";
import ProfileSettings from './ProfileSettings';

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
    }, [newDelete, songsStore])


    return (
        <div>
            <div className='profile__top-div'>
                <h1><i className="fa-regular fa-user"></i> {user?.username}</h1>
                <OpenModalButton
                    modalComponent={<ProfileSettings />}
                    buttonText={"Settings"}/>
            </div>
            <ul>
                {songs.length === 0 ? "You have not uploaded any songs." : <div className="profile__column-headers"><p>Title</p><p>Description</p></div>}
                {songs.map(song => (
                    <li key={song.id}>
                        <ProfileSongCard song={song} setNewDelete={setNewDelete} newDelete={newDelete} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
