import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchSongsThunk } from "../../../store/songs";
import SearchSongCard from "./SearchSongCard";
import './Search.css';
import { getFollowingThunk, searchUsersThunk } from "../../../store/users";
import SearchUserCard from "./SearchUserCard";

export default function Search({ setPlayedLength, setPaused, audioEl, setCurrentSong }) {
    const songs = useSelector(state => state.songs.searchSongs);
    const users = useSelector(state => state.users.searchUsers);
    const following = useSelector(state => state.users.following);

    const [search, setSearch] = useState("");
    const [type, setType] = useState("songs");
    const [songArray, setSongArray] = useState([]);
    const [usersArray, setUsersArray] = useState([]);
    const [followingState, setFollowingState] = useState(following);


    const dispatch = useDispatch();

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(type === "songs") {
            dispatch(searchSongsThunk(search));
        } else if (type === "artists") {
            dispatch(searchUsersThunk(search))
        }
    }

    useEffect(() => {
        (async() => {
            const res = await dispatch(getFollowingThunk())
            const normalizedFolloing = {}
            res.payload.forEach(following => {
                normalizedFolloing[following.following] = following
            })
            setFollowingState(normalizedFolloing);
        })()
    }, [dispatch]);

    useEffect(() => {
        setSongArray(Object.values(songs));
    }, [songs]);

    useEffect(() => {
        setUsersArray(Object.values(users));
    }, [users]);

    useEffect(() => {
        setFollowingState(following);
    }, [following])


    useEffect(() => {
        setSongArray([]);
        setUsersArray([]);
    }, [type]);

    const handleType = (e) => {
        e.preventDefault();
        setType(e.target.value)
    }

    return (
        <div className="search__outer">
            <form className="search__form" onSubmit={handleSubmit}>
                <div className="search__div">
                    <input
                        className="search__input"
                        placeholder="Enter a song or artist name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        maxLength={255}
                    />
                    <button className="search__submit" type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>
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
            <div className="search__list-div">
                <div className="search__column-headers">{type === "songs" ? <><p>Title</p><p>Description</p></> : <p>Name</p> }</div>
                <ul className="search__list">
                    {type === "songs"
                        ?
                            songArray.map(song => (
                                <li key={song.id}>
                                    <SearchSongCard
                                        song={song}
                                        setPlayedLength={setPlayedLength}
                                        setPaused={setPaused}
                                        audioEl={audioEl}
                                        setCurrentSong={setCurrentSong}
                                    />
                                </li>
                            ))
                        :
                            usersArray.map(user => (
                                <li key={user.id}>
                                    <SearchUserCard following={followingState} user={user} />
                                </li>
                            ))
                    }
                </ul>
            </div>
        </div>
    )
}
