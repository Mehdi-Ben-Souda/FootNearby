import axios from "axios";
import { getUser, setUser, user } from "../sharedData/data";
import User from "../models/User";
import { API_URL } from '@env';
//const API_URL = "http://192.168.137.1:3000/auth";

const authService = {
  login: async (email, password, setError) => {
    try {
      const rsp = await axios.post(`${API_URL}/login`, { email, password });
      if (rsp.status != 200) {
        console.log("Error");
      } else {
        setUser(User.fromJson(rsp.data));
        return rsp.data;
      }
    } catch (error) {
      console.log("Error", error);
      if (error.response && error.response.status == 400) {
        setError("Invalid Credentials");
      } else {
        setError("An error occurred during signup");
      }
      return null;
    }

  },
  register: async (
    name,
    email,
    password,
    phoneNumber, role, setError) => {
    try {
      console.log("sending request...");
      const rsp = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
        phoneNumber,
        role
      });
      if (rsp.status != 200) {
        console.log("Error");
      } else {
        setUser(User.fromJson(rsp.data));
        return rsp.data;
      }
    } catch (e) {
      if (e.response && e.response.status == 400) {
        setError("Invalid Email");
      } else {
        console.log("Error", e);
        setError("An error occurred during signup");
      }

      return null;
    }

  },
  //resetPassword: (email) => axios.post(`${API_URL}/reset-password`, { email }),
};

export default authService;
