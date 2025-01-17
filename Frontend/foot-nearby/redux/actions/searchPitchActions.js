// import axios from "axios";
// import User from "../../models/User";
// import { API_URL } from '@env';

// export const SEARCHING = 'SEARCHING';
// export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';

// export const SEARCH_FAILURE = "SEARCH_FAILURE";

// export const SearchRequest = () => ({
//     type: SEARCHING
// });



// export const SearchSuccess = () => ({
//     type: SEARCH_SUCCESS,
//     // payload: user
// });

// export const SearchFailure = (error) => ({
//     type: SEARCH_FAILURE,
//     payload: error
// });

// export const searchPitch = (radius, types, long, lat) => async (dispatch) => {
//     dispatch(SearchRequest());
//     try {
//         const rsp = await axios.get(`${API_URL}/pitch/pitchWithinRadius`, { latitude, longitude, radius });
//         if (rsp.status != 200) {
//             console.log("Error in search");
//             dispatch(SearchFailure("Error in search"));
//             return { success: false, message: "Error in search" }
//         } else {
//             console.log(rsp.data);
            
//         }
//     } catch (error) {
//         console.log("Exception ", error);
//         dispatch(SearchFailure("Error in search"));
//         return { success: false, message: "Error in search" }
//     }
// }



// // export const loginUser = (email, password) => async (dispatch) => {
// //     dispatch(loginRequest());
// //     try {
// //         const rsp = await axios.post(`${API_URL}/auth/login`, { email, password });
// //         if (rsp.status != 200) {
// //             console.log("Invalid Credentials");
// //             dispatch(loginFailure("Invalid Credentials"));
// //             return { success: false, message: "Invalid Credentials" }
// //         } else {
// //             const user = User.fromJson(rsp.data);
// //             dispatch(loginSuccess(user));
// //             return { success: true, role: user.role };
// //         }
// //     } catch (error) {
// //         console.log("Exception ", error);
// //         if (error.response && error.response.status == 400) {
// //             dispatch(loginFailure("Invalid Credentials"));
// //             return { success: false, message: "Error" }
// //         } else {
// //             dispatch(loginFailure("An error occurred during signup"));
// //             return { success: false, message: "An error occurred during signup" }
// //         }
// //     }
// // };