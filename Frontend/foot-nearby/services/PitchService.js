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
};

export default PitchService;
