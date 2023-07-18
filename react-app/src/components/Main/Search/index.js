import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchSongsThunk } from "../../../store/songs";
import SearchSongCard from "./SearchSongCard";
import './Search.css';

export default function Search({ setPlayedLength, setPaused, audioEl, setCurrentSong }) {
    const songs = useSelector(state => state.songs.searchSongs);

    const [search, setSearch] = useState("");
    const [type, setType] = useState("songs");
    const [songArray, setSongArray] = useState([])

    const dispatch = useDispatch();

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(type === "songs") {
            dispatch(searchSongsThunk(search));
        } else {
            alert("SEARCH FOR ARTISTS NOT IMPLEMENTED")
        }
    }

    useEffect(() => {
        setSongArray(Object.values(songs))
    }, [songs])


    useEffect(() => {
        setSongArray([])
    }, []);

    const handleType = (e) => {
        e.preventDefault();
        setType(e.target.value)
    }

    return (
        <div className="search__outer">
            <form className="search__form" onSubmit={handleSubmit}>
                <label>
                    <input
                        className="search__input"
                        placeholder="Enter a song or artist name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        maxLength={255}
                    />
                    <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                </label>
                <div className="search__types">
                    <button
                        className={type === "songs" ? "search__radio-active" : "search__radio"}
                        onClick={(e) => handleType(e)}
                        value="songs"

                    >
                        Songs
                    </button>
                    <button
                        className={type === "artists" ? "search__radio-active" : "search__radio"}
                        onClick={(e) => handleType(e)}
                        value="artists"
                    >
                        Artists
                    </button>
                </div>
            </form>
            <div>
                <ul>
                    {songArray.map(song => (
                        <li key={song.id}>
                            <SearchSongCard
                                song={song}
                                setPlayedLength={setPlayedLength}
                                setPaused={setPaused}
                                audioEl={audioEl}
                                setCurrentSong={setCurrentSong}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
