import { useDispatch } from "react-redux"
import "./SearchSongCard.css"
import { setCurrentSongThunk } from "../../../../store/queue";

export default function SearchSongCard({ song }) {
    const dispatch = useDispatch();

    const handlePlay = () => {
        dispatch(setCurrentSongThunk(song.id))
    }

    return (
        <div className="search-song-card__outer">
            <p>Name: {song.name}</p>
            <p>description: {song.description}</p>
            <div>
                <button>Add to que (not ready)</button>
                <button onClick={handlePlay}>Play</button>
            </div>
        </div>
    )
}
