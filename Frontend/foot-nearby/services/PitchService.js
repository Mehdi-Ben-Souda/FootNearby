import axios from "axios";

const API_URL = "http://192.168.1.102:3000/pitch";

const PitchService = {
  addPitch: async (pitchData) => {
    try {
      const response = await axios.post(`${API_URL}/add`, pitchData);
      return response.data;
    } catch (error) {
      console.error("Error adding pitch:", error.response || error);
      throw error;
    }
  },
  getPitchesByUserId: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/getByUserId/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching pitches:", error.response || error);
      throw error;
    }
  },

  updatePitch: async (pitchId, pitchData) => {
    try {
      const response = await axios.put(
        `${API_URL}/modify/${pitchId}`,
        pitchData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating pitch:", error.response || error);
      throw error;
    }
  },
};

export default PitchService;
