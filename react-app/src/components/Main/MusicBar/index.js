import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { playNextSongThunk } from '../../../store/queue';
import './MusicBar.css'


export default function MusicBar({ paused, setPaused, currentSong, playedLength, audioEl}) {
    const playedBar = useRef();
    const outerBar = useRef();

    const dispatch = useDispatch();

    const queue = useSelector(state => state.queue)

    useEffect(() => {
        playedBar.current.style.setProperty('width', `${playedLength * 100}%`)
    }, [playedLength]);

    const changeTime = (e) => {
        if(!currentSong.id) return;
        const newPercent =  e.nativeEvent.offsetX / outerBar.current.clientWidth;
        audioEl.current.currentTime = newPercent * audioEl.current.duration;
    }

    const handleNextSong = () => {
        console.log(queue);
        dispatch(playNextSongThunk());
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
                    disabled={!currentSong.id}
                >
                    {paused ? "play" : "pause"}
                </button>
                {queue.nextSongs.length ? <button onClick={handleNextSong}>Next</button> : <button disabled={true} >No songs in queue</button>}
            </div>
        </div>
    )
}
