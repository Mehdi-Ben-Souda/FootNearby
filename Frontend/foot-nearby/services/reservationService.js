import axios from "axios";
import { API_URL } from "@env";

const ReservationService = {
  getReservationByUserId: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/reservation/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching time reservation:",
        error.response || error
      );
      throw error;
    }
  },

  getReservationByMangerId: async (userId) => {
    try {
      const response = await axios.get(
        `${API_URL}/reservation/manager/${userId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching time reservation:",
        error.response || error
      );
      throw error;
    }
  },
};
export default ReservationService;
