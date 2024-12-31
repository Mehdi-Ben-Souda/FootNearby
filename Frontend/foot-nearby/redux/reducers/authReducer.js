import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "../actions/authActions";

const initialState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.payload,
          isAuthenticated: true,
          error: null
        };
      case LOGIN_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
          isAuthenticated: false
        };
      case LOGOUT:
        return {
          ...initialState
        };
      default:
        return state;
    }
  };
export default authReducer;