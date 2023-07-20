const SEARCH_USERS = "users/SEARCH_USERS";
const CREATE_FOLLOW = "users/CREATE_FOLLOW";

const searchUsers = (users) => ({
    type: SEARCH_USERS,
    payload: users
});

const createFollow = (userId) => ({
    type: CREATE_FOLLOW,
    payload: userId
})

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

const initialState = { searchUsers: {}, currentUser: {}, follows: {} };

export default function(state = initialState, action) {
    switch(action.type) {
        case SEARCH_USERS:
            const normalizedUsers = {};
            action.payload.forEach(user => {
                normalizedUsers[user.id] = user;
            })
            return { ...state, searchUsers: normalizedUsers };
        case SEARCH_USERS:
            return { ...state }
        default:
            return state;
    }
}
