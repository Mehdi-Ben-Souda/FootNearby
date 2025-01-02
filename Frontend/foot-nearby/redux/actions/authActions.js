import axios from "axios";
import User from "../../models/User";
import { API_URL } from '@env';

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
        const rsp = await axios.post(`${API_URL}/auth/login`, { email, password });
        if (rsp.status != 200) {
            console.log("Invalid Credentials");
            dispatch(loginFailure("Invalid Credentials"));
            return { success: false , message : "Invalid Credentials" }
        } else {
            const user = User.fromJson(rsp.data);
            dispatch(loginSuccess(user));
            return { success: true,role : user.role};
        }
    } catch (error) {
        console.log("Exception ", error);
        if (error.response && error.response.status == 400) {
            dispatch(loginFailure("Invalid Credentials"));
            return { success: false , message : "Error" }
        } else {
            dispatch(loginFailure("An error occurred during signup"));
            return { success: false , message : "An error occurred during signup" }
        }
    }
};