import { Switch, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import MusicBar from "./musicBar";
import './Main.css'
import { useState } from "react";

export default function Main() {
    const song = useSelector(state => state.queue.currentSong);

    const [paused, setPaused] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);


    return (
        <div className="main__outer-div">
            <Switch>
                <Route>
                    <div>upper</div>
                </Route>
            </Switch>
            <MusicBar />
        </div>
    )
}
