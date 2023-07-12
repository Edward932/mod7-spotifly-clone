import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchSongsThunk } from "../../../store/songs";

export default function Search() {
    const songs = useSelector(state => state.songs.searchSongs);

    const [search, setSearch] = useState("");
    const [type, setType] = useState("songs");
    const [songArray, setSongArray] = useState(Object.values(songs))

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

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        placeholder="enter a song or artist name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </label>
                <div>
                    Search for:
                    <label>
                        Songs
                        <input
                            type="radio"
                            name="search-type"
                            value="songs"
                            checked={type === "songs"}
                            onChange={(e) => setType(e.target.value)}
                        />
                    </label>
                    <label>
                        Artists
                        <input
                            type="radio"
                            name="search-type"
                            value="artists"
                            checked={type === "artists"}
                            onChange={(e) => setType(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit">Search</button>
            </form>
            <div>
                <ul>
                    {songArray.map(song => (
                        <li key={song.id}>{song.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
