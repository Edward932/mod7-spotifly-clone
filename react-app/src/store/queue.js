const SET_CURRENT_SONG = "queue/SET_CURRENT_SONG";
const LOAD_QUEUE = "queue/LOAD_QUEUE";
const ADD_SONG_NEXT = "queue/ADD_SONG_NEXT";
const PLAY_NEXT_SONG = "queue/PLAY_NEXT_SONG";


const setCurrentSong = (songId) => ({
    type: SET_CURRENT_SONG,
    payload: songId
});

const loadQueue = (queue) => ({
    type: LOAD_QUEUE,
    payload: queue
});

const addSongNext = (songId) => ({
    type: ADD_SONG_NEXT,
    payload: songId
});

const playNextSong = (queue) => ({
    type: PLAY_NEXT_SONG,
    payload: queue
});

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

export const addSongNextThunk = (songId) => async (dispatch) => {
    const res = await fetch(`/api/queue/${songId}`, {
        method: "POST"
    });

    if(res.ok) {
        const data = await res.json();
        console.log(data)
        return dispatch(addSongNext(data.nextSongs));
    } else {
        alert("ERROR IN ADD SONG THUNK")
    }
}

export const playNextSongThunk = () => async (dispatch) => {
    const res = await fetch('/api/queue/next');

    console.log("INN THUNK")

    if(res.ok) {
        const data = await res.json();
        return dispatch(playNextSong(data));
    } else {
        alert("ERROR IN PLAY NEXT SONG THUNK")
    }
}


const initialState = { prevSongs: [], currentSong: null, nextSongs: [] }

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case SET_CURRENT_SONG:
            return { ...state, currentSong: action.payload }
        case LOAD_QUEUE:
            return { ...state, prevSongs: action.payload.prevSongs, currentSong: action.payload.currSong, nextSongs: action.payload.nextSongs }
        case ADD_SONG_NEXT:
            return { ...state, nextSongs: action.payload }
        case PLAY_NEXT_SONG:
            return { ...state, prevSongs: action.payload.prevSongs, currentSong: action.payload.currSong, nextSongs: action.payload.nextSongs }
        default:
            return state;
    }
}
