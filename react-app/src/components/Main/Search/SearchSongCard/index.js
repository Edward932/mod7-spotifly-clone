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
            <div className="search-song-card__title-div">
                <p className="search-song-card__title">{song.name}</p>
                <p className="search-song-card__auther">{song.owner.username}</p>
            </div>
            <p className="search-song-card__description">{song.description}</p>
            <div className="search-song-card__buttons">
                <i onClick={handleAddQueue}className="fa-solid fa-plus"></i>
                <i onClick={handlePlay} className="fa-solid fa-circle-play"></i>
            </div>
        </div>
    )
}
