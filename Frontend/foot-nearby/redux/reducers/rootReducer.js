import { combineReducers } from 'redux';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    auth: authReducer, // Ensure the 'auth' slice is here
    // Other reducers can go here
});
export default rootReducer;
