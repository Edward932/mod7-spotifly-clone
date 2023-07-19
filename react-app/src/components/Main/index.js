import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import MusicBar from "./MusicBar";
import { useEffect, useRef, useState } from "react";
import './Main.css'
import { getSongThunk } from "../../store/songs";
import SongForm from "./SongForm";
import NavBar from "./NavBar";
import Search from "./Search";
import { loadQueueThunk, playNextSongThunk, playPrevSongThunk } from "../../store/queue";
import Profile from "./Profile";

export default function Main() {
    const songId = useSelector(state => state.queue.currentSong);
    const currentSongStore = useSelector(state => state.songs.currentSong);
    const queue = useSelector(state => state.queue);

    const [currentSong, setCurrentSong] = useState(currentSongStore);

    const [paused, setPaused] = useState(true);
    const [playedLength, setPlayedLength] = useState(0);
    const [totalLength, setTotalLength] = useState("Loading...")

    const audioEl = useRef();

    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            if (songId === null) return;
            const newSong = await dispatch(getSongThunk(songId));
            setCurrentSong(newSong?.payload);
        })();
    }, [songId, dispatch]);

    useEffect(() => {
        dispatch(loadQueueThunk())
    },[dispatch]);


    useEffect(() => {
        if(paused) {
            audioEl.current.pause();
        } else {
            audioEl.current.play();
        }
    }, [paused]);

    const nextSong = async () => {
        if(!queue.nextSongs.length) {
            setPaused(true);
            return
        }
        const res = await dispatch(playNextSongThunk());

        if (res.payload.currSong === null) {
            setCurrentSong({});
            setPlayedLength(0);
            setPaused(true);
            return;
        }

        const newSong = await dispatch(getSongThunk(res.payload.currSong));
        setCurrentSong({})
        setCurrentSong(newSong?.payload);
        setPlayedLength(0);
        setPaused(false);
        audioEl.current.play();
    }

    const prevSong = async () => {
        if(!queue.prevSongs.length) {
            setPaused(true);
            return
        }
        const res = await dispatch(playPrevSongThunk());

        if (res.payload.currSong === null) {
            setCurrentSong({});
            setPlayedLength(0);
            setPaused(true);
            return;
        }

        const newSong = await dispatch(getSongThunk(res.payload.currSong));
        setCurrentSong({})
        setCurrentSong(newSong?.payload);
        setPlayedLength(0);
        setPaused(false);
        audioEl.current.play();
    }

    const changePlayBar = () => {
        const total = audioEl.current.duration;
        const playedSoFar = audioEl.current.currentTime;

        setPlayedLength(playedSoFar / total);
    }

    const handleTotalTime = () => {
        const total = Math.round(audioEl.current.duration);
        const seconds = total % 60;
        const minutes = (total - seconds) / 60;
        setTotalLength(`${minutes}:${seconds > 9 ? seconds : '0' + seconds}`);
    }

    return (
        <div className="main__outer-div">
            <div className="main__main-div">
                <NavBar />
                <div className="main__content">
                    <Switch>
                        <Route path="/main/song-form">
                            <SongForm />
                        </Route>
                        <Route path="/main/search">
                            <Search
                                setPlayedLength={setPlayedLength}
                                setPaused={setPaused}
                                audioEl={audioEl}
                                setCurrentSong={setCurrentSong}
                            />
                        </Route>
                        <Route path="/main/profile">
                            <Profile />
                        </Route>
                        <Route path="/main/popular">
                            <div>Popular coming soon!</div>
                        </Route>
                        <Route>
                            <div>Feed coming soon!</div>
                        </Route>
                    </Switch>
                </div>
            </div>
            <div className="main__outer-audio">
                <audio
                    preload="metadata"
                    src={currentSong?.aws_src}
                    ref={audioEl}
                    className="main__audio-player"
                    onTimeUpdate={changePlayBar}
                    onEnded={nextSong}
                    onLoadedMetadata={handleTotalTime}
                />
                <MusicBar
                    paused={paused}
                    setPaused={setPaused}
                    currentSong={currentSong}
                    playedLength={playedLength}
                    audioEl={audioEl}
                    nextSong={nextSong}
                    queue={queue}
                    prevSong={prevSong}
                    totalLength={totalLength}
                    />
            </div>
        </div>
    )
}
