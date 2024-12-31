import User from "../../models/User";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const loginRequest = () => ({
    type: LOGIN_REQUEST
});

export const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user
});

export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error
});

export const logout = () => ({
    type: LOGOUT
});

// Thunk action creator for handling async login
export const loginUser = (email, password) => async (dispatch) => {
    dispatch(loginRequest());
    try {
        const rsp = await axios.post(`${API_URL}/login`, { email, password });
        if (rsp.status != 200) {
            console.log("Error");
            dispatch(loginFailure("Invalid Credentials"));
        } else {
            dispatch(loginSuccess(User.fromJson(rsp.data)));
        }
    } catch (error) {
        console.log("Error", error);
        if (error.response && error.response.status == 400) {
            dispatch(loginFailure("Invalid Credentials"));
        } else {
            dispatch(loginFailure("An error occurred during signup"));
        }
    }
};