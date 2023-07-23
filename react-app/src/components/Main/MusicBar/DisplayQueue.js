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
            <h1>{user.username}'s queue</h1>
            <div className="display-queue__current">
                {currentSong.id ?
                    <>
                        <p className="display-queue__now">Now playing</p>
                        <div className="display-queue__current-song">
                            <div>
                                <p className="display-queue__current-title">{currentSong.name}</p>
                                <p className="display-queue__auther">{currentSong.owner.username}</p>
                            </div>
                            <p className="display-queue__description">{currentSong.description}</p>
                        </div>
                    </>
                    :
                    <p>No current song</p>
                }
            </div>
            <ul className="display-queue__ul">
                {nextSongs.length === 0 ? <p className="display-queue__now">No songs in queue</p> : <p className="display-queue__now">Songs in queue</p>}
                {nextSongs.map((song, i) => (
                    <li key={Math.random()} className="display-queue__li">
                        <p className="display-queue__li-title">{song.name}</p>
                        <p className="display-queue__li-auther">By {song.owner.username}</p>
                        <div className="display-queue__li-buttons">
                            {i !== nextSongs.length - 1 ? <i onClick={() => handleMoveForward(i)} className="display-queue__forward fa-solid fa-arrow-down"></i> : <i className="display-queue__forward"></i>}
                            {i !== 0 ? <i onClick={() => handleMoveBackward(i)} className="display-queue__back fa-solid fa-arrow-up"></i> : <i className="display-queue__back"></i>}
                            <i onClick={() => handleDelete(i)} className="display-queue__delete fa-solid fa-trash"></i>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="display-queue__buttons-div">
                <button onClick={closeModal}>Cancel</button>
                <button onClick={handleSave}>Save</button>
            </div>
        </div>
    )
}
