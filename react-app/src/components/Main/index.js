import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import MusicBar from "./MusicBar";
import { useEffect, useRef, useState } from "react";
import './Main.css'
import { getSongThunk } from "../../store/songs";
import SongForm from "./SongForm";
import NavBar from "./NavBar";
import Search from "./Search";

export default function Main() {
    let songIdStore = 6; //useSelector(state => state.queue.currentSong);
    const currentSongStore = useSelector(state => state.songs.currentSong);

    const [songId, setSongId] = useState(songIdStore)
    const [currentSong, setCurrentSong] = useState(currentSongStore);

    const [paused, setPaused] = useState(true);
    const [playedLength, setPlayedLength] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            // await dispatch(getQueue());  --- Get queue is not made yet
            const newSong = await dispatch(getSongThunk(songId));
            setCurrentSong(newSong?.payload);
        })();
    }, [songId]);


    useEffect(() => {
        if(paused) {
            audioEl.current.pause();
        } else {
            audioEl.current.play();
        }
    }, [paused]);

    const nextSong = () => {
        setSongId(songId + 1)
        console.log(songId)
    }

    const audioEl = useRef();

    const changePlayBar = () => {
        const total = audioEl.current.duration;
        const playedSoFar = audioEl.current.currentTime;

        setPlayedLength(playedSoFar / total);
    }

    return (
        <div className="main__outer-div">
            <div className="main__main-div">
                <NavBar />
                <Switch>
                    <Route path="/main/song-form">
                        <SongForm />
                    </Route>
                    <Route>
                        <Search />
                    </Route>
                    <Route>
                        <div>upper</div>
                    </Route>
                </Switch>
            </div>
            <div className="main__outer-audio">
                <audio
                    src={currentSong?.aws_src}
                    ref={audioEl}
                    className="main__audio-player"
                    onTimeUpdate={changePlayBar}
                    onEnded={nextSong}
                />
                <MusicBar
                    paused={paused}
                    setPaused={setPaused}
                    currentSong={currentSong}
                    playedLength={playedLength}
                    audioEl={audioEl}
                    />
            </div>
        </div>
    )
}
