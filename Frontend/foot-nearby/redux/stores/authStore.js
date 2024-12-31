import { createStoreHook } from "react-redux";
import authReducer from "../reducers/authReducer";


const authStore = createStoreHook(authReducer);
export default authStore;