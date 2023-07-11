import { Switch, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import MusicBar from "./musicBar";
import { useEffect, useRef, useState } from "react";
import './Main.css'

export default function Main() {
    const songId = useSelector(state => state.queue.currentSong);

    useEffect(() => {
        // dispatch
    }, [songId]);


    // const song = {
    //     id: 1,
    //     name: "Fun song",
    //     aws_src: "https://actions.google.com/sounds/v1/ambiences/ambient_hum_air_conditioner.ogg",
    //     owner_id: 1,
    //     description: "cool song"
    // }

    const [paused, setPaused] = useState(true);
    const [currentSong, setCurrentSong] = useState(song);
    const [playedLength, setPlayedLength] = useState(0);

    useEffect(() => {
        if(paused) {
            audioEl.current.pause();
        } else {
            audioEl.current.play();
        }
    }, [paused]);

    const audioEl = useRef();

    const changePlayBar = () => {
        const total = audioEl.current.duration;
        const playedSoFar = audioEl.current.currentTime;

        setPlayedLength(playedSoFar / total);
    }


    return (
        <div className="main__outer-div">
            <Switch>
                <Route>
                    <div>upper</div>
                </Route>
            </Switch>
            <div>
                <audio
                    src={currentSong?.aws_src}
                    ref={audioEl}
                    className="main__audio-player"
                    onTimeUpdate={changePlayBar}
                />
                <MusicBar
                    paused={paused}
                    setPaused={setPaused}
                    currentSong={currentSong}
                    setCurrentSong={setCurrentSong}
                    playedLength={playedLength}
                    audioEl={audioEl}
                    />
            </div>
        </div>
    )
}
