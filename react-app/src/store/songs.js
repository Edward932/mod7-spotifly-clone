const GET_SONG = "songs/GET_SONG";
const POST_SONG = "songs/POST_SONG";

const getSong = (song) => ({
    type: GET_SONG,
    payload: song
});

const postSong = (song) => ({
    type: POST_SONG,
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
        console.log(data);
        if (data.error) {
            return data
        }

        return dispatch(postSong(data.song));
    } else {
        alert("ERROR IN POST SONG THUNK")
    }
}

const initialState = { currentSong: {}, feedSongs: {}, searchSongs: {} }

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_SONG:
            return { ...state, currentSong: action.payload };
        case POST_SONG:
            return { ...state, currentSong: action.payload }
        default:
            return state;
    }
}
