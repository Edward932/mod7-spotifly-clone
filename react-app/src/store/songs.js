const GET_SONG = "songs/GET_SONG";

const getSong = (song) => ({
    type: GET_SONG,
    payload: song
});

export const getSongThunk = (songId) = async (dispatch) => {
    const res = await fetch(`api/song/${songId}`);

    if(res.ok) {
        const data = await res.json();
        return dispatch(getSong(data.song));
    } else {
        alert("ERROR IN GET SONG THUNK")
    }
}

initialState = { currentSong: {}, feedSongs: {}, searchSongs: {} }

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_SONG:
            return state;
        default:
            return state;
    }
}
