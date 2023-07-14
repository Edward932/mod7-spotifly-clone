import { useDispatch } from "react-redux"
import "./SearchSongCard.css"
import { addSongNextThunk, setCurrentSongThunk } from "../../../../store/queue";
import { getSongThunk } from "../../../../store/songs";

export default function SearchSongCard({ song, setPlayedLength, setPaused, audioEl, setCurrentSong }) {
    const dispatch = useDispatch();

    const handlePlay =  async () => {
        dispatch(setCurrentSongThunk(song.id));
        const newSong = await dispatch(getSongThunk(song.id));
        setCurrentSong({})
        setCurrentSong(newSong?.payload);
        setPlayedLength(0);
        setPaused(false);
        audioEl.current.play();
    }

    const handleAddQueue = () => {
        dispatch(addSongNextThunk(song.id));
    }

    return (
        <div className="search-song-card__outer">
            <p>Name: {song.name}</p>
            <p>description: {song.description}</p>
            <div>
                <button onClick={handleAddQueue}>Add to que</button>
                <button onClick={handlePlay}>Play</button>
            </div>
        </div>
    )
}
