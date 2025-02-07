import axios from "axios";
import { API_URL } from '@env';

const PitchService = {
  addPitch: async (pitchData) => {
    try {
      const response = await axios.post(`${API_URL}/pitch/add`, pitchData);
      return response.data;
    } catch (error) {
      console.error("Error adding pitch:", error.response || error);
      throw error;
    }
  },
  getPitchesByUserId: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/pitch/getByUserId/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching pitches:", error.response || error);
      throw error;
    }
  },

  updatePitch: async (pitchId, pitchData) => {
    try {
      const response = await axios.put(
        `${API_URL}/pitch/modify/${pitchId}`,
        pitchData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating pitch:", error.response || error);
      throw error;
    }
  },

  uploadImage: async (imageUri) => {
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const reader = new FileReader();
      
      return new Promise((resolve, reject) => {
        reader.onload = async () => {
          try {
            const base64data = reader.result;
            const uploadResponse = await axios.post(`${API_URL}/images/upload`, {
              image: base64data
            });
            resolve(uploadResponse.data.fileName);
          } catch (error) {
            reject(error);
          }
        };
        reader.onerror = () => reject(new Error('Failed to read image'));
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  },

  getImageUrl: (fileName) => {
    return `${API_URL}/images/${fileName}`;
  }
};

export default PitchService;
