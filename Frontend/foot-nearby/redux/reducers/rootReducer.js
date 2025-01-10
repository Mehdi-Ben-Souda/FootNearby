import { combineReducers } from 'redux';
import authReducer from './authReducer';
import SearchPitchReducer from './searchPitchReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    searchPitch: SearchPitchReducer,
});
export default rootReducer;
