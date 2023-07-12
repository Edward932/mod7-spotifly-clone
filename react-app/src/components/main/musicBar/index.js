import { useEffect, useRef } from "react"
import './MusicBar.css'


export default function MusicBar({ paused, setPaused, currentSong, playedLength, audioEl}) {
    const playedBar = useRef();
    const outerBar = useRef();

    useEffect(() => {
        playedBar.current.style.setProperty('width', `${playedLength * 100}%`)
    }, [playedLength]);

    const changeTime = (e) => {
        const newPercent =  e.nativeEvent.offsetX / outerBar.current.clientWidth;
        audioEl.current.currentTime = newPercent * audioEl.current.duration;
    }

    return (
        <div className="music-bar__outer-div">
            <div className="music-bar__song-div">
                <p>{currentSong?.name || 'No song selected'}</p>
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
            </div>
            <div>
                <button>Prev (not working)</button>
                <button
                    className="music-bar__play-button"
                    onClick={() => setPaused(!paused)}
                >
                    {paused ? "play" : "pause"}
                </button>
                <button>Next (not working)</button>
            </div>
        </div>
    )
}
