import { useEffect, useRef, useState } from "react";
import './MusicBar.css'
import OpenModalButton from "../../OpenModalButton";
import DisplayQueue from "./DisplayQueue";


export default function MusicBar({ queue, paused, setPaused, currentSong, playedLength, audioEl, nextSong, prevSong, totalLength}) {

    const [playedTime, setPlayedTime] = useState('0:0');

    const range = useRef();

    useEffect(() => {
        setPlayedTime(readableTime(audioEl.current.currentTime));
        range.current.value = playedLength;
    }, [playedLength]);

    const changeTime = (e) => {
        if(!currentSong?.id) return;
        const newPercent =  e.target.value;
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
            <div className="music-bar__title-div">
                {currentSong?.name ? <><p className="music-bar__title">{currentSong.name}</p><p className="music-bar__by">{currentSong.owner.username}</p></> : <p className="music-bar__title">No song selected</p>}
            </div>
            <div className="music-bar__song-div">
                <div className="music-bar__play-all">
                    <p className="music-bar__timers">{currentSong?.id && playedTime}</p>
                    <input
                        className="music-bar__range"
                        type="range"
                        value={playedLength}
                        ref={range}
                        min={0}
                        step={0.01}
                        max={1}
                        onChange={changeTime}
                    />
                    <p className="music-bar__timers">{currentSong?.id && totalLength}</p>
                </div>
                <div className="music-bar__action-buttons">
                    {queue.prevSongs.length ? <i onClick={prevSong} class="music-bar__next-on fa-solid fa-backward"></i> : <i class="music-bar__next-off fa-solid fa-ban"></i>}
                    {currentSong?.id && <i
                        onClick={() => setPaused(!paused)}
                        disabled={!currentSong?.id}
                        className={paused ? "music-bar__play-button fa-solid fa-circle-play" : "music-bar__play-button fa-solid fa-circle-pause"}
                    >
                    </i>}
                    {queue.nextSongs.length ? <i onClick={nextSong} class="music-bar__next-on fa-solid fa-forward"></i> : <i class="music-bar__next-off fa-solid fa-ban"></i>}
                </div>

            </div>
            <div className="music-bar__queue">
                <OpenModalButton
                    modalComponent={<DisplayQueue/>}
                    buttonText={"Edit Queue"}
                />
            </div>
        </div>
    )
}
