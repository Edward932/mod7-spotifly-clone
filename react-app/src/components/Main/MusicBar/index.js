import { useEffect, useRef, useState } from "react";
import './MusicBar.css'
import OpenModalButton from "../../OpenModalButton";
import DisplayQueue from "./DisplayQueue";


export default function MusicBar({ queue, paused, setPaused, currentSong, playedLength, audioEl, nextSong, prevSong, totalLength}) {
    const playedBar = useRef();
    const outerBar = useRef();

    const [playedTime, setPlayedTime] = useState('0:0');

    useEffect(() => {
        playedBar.current.style.setProperty('width', `${playedLength * 100}%`);
        setPlayedTime(readableTime(audioEl.current.currentTime))
    }, [playedLength]);

    const changeTime = (e) => {
        if(!currentSong?.id) return;
        const newPercent =  e.nativeEvent.offsetX / outerBar.current.clientWidth;
        audioEl.current.currentTime = newPercent * audioEl.current.duration;
    }

    const readableTime = (total) => {
        const rounded = Math.round(total);
        const seconds = rounded % 60;
        const minutes = (rounded - seconds) / 60;
        return `${minutes}:${seconds > 9 ? seconds : '0' + seconds}`
    }

    return (
        <div className="music-bar__outer-div">
            <div className="music-bar__song-div">
                <div className="music-bar__title-div">
                    {currentSong?.name ? <><p className="music-bar__title">{currentSong.name}</p><p className="music-bar__by">{currentSong.owner.username}</p></> : <p className="music-bar__title">No song selected</p>}
                </div>
                <div className="music-bar__play-all">
                    <p className="music-bar__timers">{currentSong.id && playedTime}</p>
                    <div className="music-bar__play-bar-total"
                        ref={outerBar}
                        onClick={changeTime}
                    >
                        <div
                            className="music-bar__play-bar-played"
                            ref={playedBar}
                        >
                            <i className="fa-solid fa-circle"></i>
                        </div>
                    </div>
                    <p className="music-bar__timers">{currentSong.id && totalLength}</p>
                </div>
                <div>
                    <OpenModalButton
                        modalComponent={<DisplayQueue/>}
                        buttonText={"Edit Queue"}
                    />
                </div>
            </div>
            <div>
                {queue.prevSongs.length ? <button onClick={prevSong}>Previous</button> : <button disabled={true} >No previous songs</button>}
                <button
                    className="music-bar__play-button"
                    onClick={() => setPaused(!paused)}
                    disabled={!currentSong?.id}
                >
                    {paused ? "play" : "pause"}
                </button>
                {queue.nextSongs.length ? <button onClick={nextSong}>Next</button> : <button disabled={true} >No songs in queue</button>}
            </div>

        </div>
    )
}
