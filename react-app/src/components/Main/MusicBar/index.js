import { useEffect, useRef } from "react";
import './MusicBar.css'
import OpenModalButton from "../../OpenModalButton";
import DisplayQueue from "./DisplayQueue";


export default function MusicBar({ queue, paused, setPaused, currentSong, playedLength, audioEl, nextSong}) {
    const playedBar = useRef();
    const outerBar = useRef();

    useEffect(() => {
        playedBar.current.style.setProperty('width', `${playedLength * 100}%`)
    }, [playedLength]);

    const changeTime = (e) => {
        if(!currentSong?.id) return;
        const newPercent =  e.nativeEvent.offsetX / outerBar.current.clientWidth;
        audioEl.current.currentTime = newPercent * audioEl.current.duration;
    }

    return (
        <div className="music-bar__outer-div">
            <div className="music-bar__song-div">
                <p>{currentSong?.name && `${currentSong.name} By: ${currentSong.owner.username}`|| 'No song selected'}</p>
                <div className="music-bar__play-bar-total"
                    ref={outerBar}
                    onClick={changeTime}
                >
                    <div
                        className="music-bar__play-bar-played"
                        ref={playedBar}
                    >
                        <p>Insert time later</p>
                    </div>
                </div>
                <div>
                    <OpenModalButton
                        modalComponent={<DisplayQueue/>}
                        buttonText={"Edit Queue"}
                    />
                </div>
            </div>
            <div>
                <button>Prev (not working)</button>
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
