import User from "../models/User"

let user = null;

export const getUser = () => user;
export const setUser = (newUser) => {
    user = newUser;
};