import { useDispatch } from "react-redux"
import "./SearchSongCard.css"
import { addSongNextThunk, setCurrentSongThunk } from "../../../../store/queue";

export default function SearchSongCard({ song }) {
    const dispatch = useDispatch();

    const handlePlay = () => {
        dispatch(setCurrentSongThunk(song.id))
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
