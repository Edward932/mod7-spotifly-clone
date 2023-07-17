import { useDispatch, useSelector } from "react-redux"
import "./DisplayQueue.css";
import { useEffect, useState } from "react";
import { getNextSongsThunk, setNextSongsThunk } from "../../../store/queue";
import { useModal } from "../../../context/Modal";

export default function DisplayQueue() {
    const currentSong = useSelector(state => state.songs.currentSong);
    const user = useSelector(state => state.session.user);

    const { closeModal } = useModal();

    const dispatch = useDispatch();

    const [nextSongs, setNextSongs] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await dispatch(getNextSongsThunk());
            setNextSongs(res.payload)
        })();
    }, [dispatch])

    const handleSave = () => {
        dispatch(setNextSongsThunk(nextSongs.map(song => song.id)));
        closeModal();
    }

    const handleDelete = (index) => {
        setNextSongs([...nextSongs.slice(0, index), ...nextSongs.slice(index + 1)])
    }

    const handleMoveForward = (index) => {
        const newNextSongs = nextSongs.slice();
        [newNextSongs[index], newNextSongs[index + 1]] = [newNextSongs[index + 1], newNextSongs[index]];
        setNextSongs(newNextSongs);
    }

    const handleMoveBackward = (index) => {
        const newNextSongs = nextSongs.slice();
        [newNextSongs[index], newNextSongs[index - 1]] = [newNextSongs[index - 1], newNextSongs[index]];
        setNextSongs(newNextSongs);
    }

    return (
        <div className="display-queue__outer-div">
            <h3>{user.username}'s queue</h3>
            <div className="display-queue__current">
                {currentSong.id ?
                    <>
                        <p>Now playing:</p>
                        <p>Name: {currentSong.name}</p>
                        <p>Artist: {currentSong.owner.username}</p>
                        <p>description: {currentSong.description}</p>
                    </>
                    :
                    <p>No current song</p>
                }
            </div>
            <ul>
                {nextSongs.length == 0 && "No songs in queue"}
                {nextSongs.map((song, i) => (
                    <li key={Math.random()} className="display-queue__li">
                        <div>
                            <p>{song.name} by {song.owner.username}</p>
                            <p>{song.description}</p>
                            <p>Index: {i}</p>
                        </div>
                        <div>
                            <button onClick={() => handleMoveForward(i)} disabled={i === nextSongs.length - 1}>Move forward</button>
                            <button onClick={() => handleMoveBackward(i)} disabled={i == 0}>Move backward</button>
                            <button onClick={() => handleDelete(i)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div>
                <button onClick={closeModal}>Cancel</button>
                <button onClick={handleSave}>Save</button>
            </div>
        </div>
    )
}
