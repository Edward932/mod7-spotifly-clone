const SET_CURRENT_SONG = "queue/SET_CURRENT_SONG";
const LOAD_QUEUE = "queue/LOAD_QUEUE";

const setCurrentSong = (songId) => ({
    type: SET_CURRENT_SONG,
    payload: songId
});

const loadQueue = (queue) => ({
    type: LOAD_QUEUE,
    payload: queue
})

export const setCurrentSongThunk = (songId) => async (dispatch) => {
    const res = await fetch(`/api/queue/current/${songId}`, {
        method: "POST",
        body: null
    });

    if(res.ok) {
        const data = await res.json();
        return dispatch(setCurrentSong(data));
    } else {
        alert("ERROR IN SET CURRENT SONG THUNK");
    }
}

export const loadQueueThunk = () => async (dispatch) => {
    const res = await fetch('/api/queue');

    if(res.ok) {
        const data = await res.json();
        return dispatch(loadQueue(data));
    } else {
        alert("ERROR IN LOAD QUEUE THUNK")
    }
}

const initialState = { prevSongs: [], currentSong: null, nextSongs: [] }

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case SET_CURRENT_SONG:
            return { ...state, currentSong: action.payload }
        case LOAD_QUEUE:
            return { ...state, prevSongs: action.payload.prevSongs, currentSong: action.payload.currSong, nextSongs: action.payload.nextSongs }
        default:
            return state;
    }
}
