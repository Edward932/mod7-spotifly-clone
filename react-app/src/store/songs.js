const GET_SONG = "songs/GET_SONG";
const POST_SONG = "songs/POST_SONG";
const SEARCH_SONGS = "songs/SEARCH_SONGS";
const GET_USER_SONGS = "songs/GET_USER_SONGS";
const DELETE_SONG = "songs/DELETE_SONG";
const UPDATE_SONG = "songs/UPDATE_SONG";

const getSong = (song) => ({
    type: GET_SONG,
    payload: song
});

const postSong = (song) => ({
    type: POST_SONG,
    payload: song
});

const searchSongs = (songs) => ({
    type: SEARCH_SONGS,
    payload: songs
});

const getUserSongs = (songs) => ({
    type: GET_USER_SONGS,
    payload: songs
});

const deleteSong = (songId) => ({
    type: DELETE_SONG,
    payload: songId
});

const updateSong = (song) => ({
    type: UPDATE_SONG,
    payload: song
});

export const getSongThunk = (songId) => async (dispatch) => {
    const res = await fetch(`/api/songs/${songId}`);

    if(res.ok) {
        const data = await res.json();
        return dispatch(getSong(data));
    } else {
        alert("ERROR IN GET SONG THUNK")
    }
}

export const postSongThunk = (post) => async (dispatch) => {
    const res = await fetch('/api/songs', {
        method: "POST",
        body: post
    });

    if(res.ok) {
        const data = await res.json();
        if (data.error) {
            return data
        }

        return dispatch(postSong(data.song));
    } else {
        alert("ERROR IN POST SONG THUNK")
    }
}

export const searchSongsThunk = (searchName) => async (dispatch) => {
    const res = await fetch(`/api/songs/search?name=${searchName}`);

    if(res.ok) {
        const data = await res.json();
        return dispatch(searchSongs(data));
    } else {
        alert("ERROR IN SEARCH SONGS THUNK");
    }
}

export const getUserSongsThunk = () => async (dispatch) => {
    const res = await fetch('/api/songs/user');

    if(res.ok) {
        const data = await res.json();
        return dispatch(getUserSongs(data));
    } else {
        alert("ERRRO IN GET USER SONGS THUNK")
    }
}

export const deleteSongThunk = (songId) => async (dispatch) => {
    const res = await fetch(`/api/songs/${songId}`, {
        method: "DELETE"
    });


    if (res.ok) {
        const data = await res.json();
        console.log('data in thunk', data)
        const id = data.songId
        return dispatch(deleteSong(id));
    } else {
        alert("ERROR IN DELETE SONG THUNK");
    }
}

export const updateSongThunk = (song, songId) => async (dispatch) => {
    const res = await fetch(`/api/songs/${songId}`, {
        method: "PUT",
        body: song
    });

    if(res.ok) {
        const data = await res.json();
        if (data.error) {
            return data
        }

        return dispatch(updateSong(data));
    } else {
        alert("ERROR IN EDIT SONG THUNK")
    }
}

const initialState = { currentSong: {}, feedSongs: {}, searchSongs: {}, userSongs: {} }

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_SONG:
            return { ...state, currentSong: action.payload };
        case POST_SONG:
            return { ...state, currentSong: action.payload };
        case SEARCH_SONGS:
            const normalizedSearch = {};
            action.payload.forEach(song => {
                normalizedSearch[song.id] = song;
            });
            return { ...state, searchSongs: normalizedSearch };
        case GET_USER_SONGS:
            const normalizedUserSongs = {};
            action.payload.forEach(song => {
                normalizedUserSongs[song.id] = song;
            });
            return { ...state, userSongs: normalizedUserSongs }
        case DELETE_SONG:
            const newUserSongs = state.userSongs;
            delete newUserSongs[action.payload];
            return { ...state, userSongs: newUserSongs }
        case UPDATE_SONG:
            const updatedUserSongs = state.userSongs;
            updatedUserSongs[action.payload.id] = action.payload
            console.log('in reducer', updatedUserSongs)
            return { ...state, userSongs: updatedUserSongs }
        default:
            return state;
    }
}
