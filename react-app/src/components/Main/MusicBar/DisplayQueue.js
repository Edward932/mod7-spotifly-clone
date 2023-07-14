import { useDispatch, useSelector } from "react-redux"
import "./DisplayQueue.css";
import { useEffect, useState } from "react";
import { getNextSongsThunk } from "../../../store/queue";

export default function DisplayQueue() {
    const currentSong = useSelector(state => state.songs.currentSong);
    const user = useSelector(state => state.session.user)

    const dispatch = useDispatch();

    const [nextSongs, setNextSongs] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await dispatch(getNextSongsThunk());
            setNextSongs(res.payload)
        })();
    }, [dispatch])

    return (
        <div className="display-queue__outer-div">
            <h3>{user.username}'s queue</h3>
            <div className="display-queue__current">
                {currentSong ?
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
                {nextSongs.map(song => (
                    <li key={song.id} className="display-queue__li">
                        <div>
                            <p>{song.name} by {song.owner.username}</p>
                            <p>{song.description}</p>
                        </div>
                        <div>
                            <button>Move up</button>
                            <button>Move down</button>
                            <button>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
