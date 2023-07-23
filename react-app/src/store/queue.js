const SET_CURRENT_SONG = "queue/SET_CURRENT_SONG";
const LOAD_QUEUE = "queue/LOAD_QUEUE";
const ADD_SONG_NEXT = "queue/ADD_SONG_NEXT";
const PLAY_NEXT_SONG = "queue/PLAY_NEXT_SONG";
const GET_NEXT_SONGS = "queue/GET_NEXT_SONGS";
const SET_NEXT_SONGS = "queue/SET_NEXT_SONGS";
const PLAY_PREV_SONG = "queue/PLAY_PREV_SONG";


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

const getNextSongs = (songs) => ({
    type: GET_NEXT_SONGS,
    payload: songs
});

const setNextSongs = (songIds) => ({
    type: SET_NEXT_SONGS,
    payload: songIds
});

const playPrevSong = (queue) => ({
    type: PLAY_PREV_SONG,
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

export const addSongNextThunk = (songId) => async (dispatch) => {
    const res = await fetch(`/api/queue/${songId}`, {
        method: "POST"
    });

    if(res.ok) {
        const data = await res.json();
        return dispatch(addSongNext(data.nextSongs));
    } else {
        alert("ERROR IN ADD SONG THUNK")
    }
}

export const playNextSongThunk = () => async (dispatch) => {
    const res = await fetch('/api/queue/next');

    if(res.ok) {
        const data = await res.json();
        return dispatch(playNextSong(data));
    } else {
        alert("ERROR IN PLAY NEXT SONG THUNK")
    }
}

export const getNextSongsThunk = () => async (dispatch) => {
    const res = await fetch("/api/queue/next-songs");

    if(res.ok) {
        const data = await res.json();
        return dispatch(getNextSongs(data.songs));
    } else {
        alert("ERROR IN GET NEXT SONGS THUNK (QUEUE PAGE)")
    }
}

export const setNextSongsThunk = (songIds) => async (dispatch) => {
    const res = await fetch("/api/queue/next", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(songIds)
    });

    if(res.ok) {
        const data = await res.json();
        return dispatch(setNextSongs(data.songs));
    } else {
        alert("ERRO RIN SET NEXT SONGS THUNK")
    }
}

export const playPrevSongThunk = () => async (dispatch) => {
    const res = await fetch('/api/queue/prev');

    if(res.ok) {
        const data = await res.json();
        return dispatch(playPrevSong(data));
    } else {
        alert("ERROR IN PLAY PREV SONG THUNK")
    }
}


const initialState = { prevSongs: [], currentSong: null, nextSongs: [], nextSongsFull: [] }

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
        case GET_NEXT_SONGS:
            return { ...state, nextSongsFull: action.payload }
        case SET_NEXT_SONGS:
            return { ...state, nextSongs: action.payload }
        case PLAY_PREV_SONG:
            return { ...state, prevSongs: action.payload.prevSongs, currentSong: action.payload.currSong, nextSongs: action.payload.nextSongs }
        default:
            return state;
    }
}
