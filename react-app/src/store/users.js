const SEARCH_USERS = "users/SEARCH_USERS";
const CREATE_FOLLOW = "users/CREATE_FOLLOW";
const GET_FOLLOWING = "users/GET_FOLLOWING";

const searchUsers = (users) => ({
    type: SEARCH_USERS,
    payload: users
});

const createFollow = (following) => ({
    type: CREATE_FOLLOW,
    payload: following
});

const getFollowing = (following) => ({
    type: GET_FOLLOWING,
    payload: following
});

export const searchUsersThunk = (searchName) => async (dispatch) => {
    const res = await fetch(`/api/users/search?name=${searchName}`);

    if (res.ok) {
        const data = await res.json();
        return dispatch(searchUsers(data));
    } else {
        alert("ERROR IN SEARCH USERS THUNK");
    }
}

export const createFollowThunk = (userId) => async (dispatch) => {
    const res = await fetch('/api/users/follow', {
        method: "POST",
        headers: { "Content-Type" : "application/json"},
        body: JSON.stringify(userId)
    });

    if(res.ok) {
        const data = await res.json();
        return dispatch(createFollow(data))
    } else {
        alert("ERROR IN CREATE FOLLOW THUNK");
    }
}

export const getFollowingThunk = () => async (dispatch) => {
    const res = await fetch("/api/users/following");

    if(res.ok) {
        const data = await res.json();
        return dispatch(getFollowing(data));
    } else {
        alert("ERROR IN GET FOLLOWING THUNK")
    }
}

const initialState = { searchUsers: {}, currentUser: {}, following: {}, followers: {} };

export default function(state = initialState, action) {
    switch(action.type) {
        case SEARCH_USERS:
            const normalizedUsers = {};
            action.payload.forEach(user => {
                normalizedUsers[user.id] = user;
            })
            return { ...state, searchUsers: normalizedUsers };
        case CREATE_FOLLOW:
            const normalizedFolloing1 = {};
            action.payload.forEach(following => {
                normalizedFolloing1[following.following] = following;
            })
            return { ...state, following: normalizedFolloing1 }
        case GET_FOLLOWING:
            const normalizedFolloing2 = {};
            action.payload.forEach(following => {
                normalizedFolloing2[following.following] = following;
            })
            return { ...state, following: normalizedFolloing2 }
        default:
            return state;
    }
}
