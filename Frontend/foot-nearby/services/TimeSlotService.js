import axios from "axios";
import { API_URL } from '@env';
const TimeSlotService = {
    getTimeSlots: async (date,pitchId)=>{
        try {
            console.log(`${API_URL}/time-slot/get/?date=${date}&pitchId=${pitchId}`);
            
            const response = await axios.get(`${API_URL}/time-slot/get/?date=${date}&pitchId=${pitchId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching time slots:", error.response || error);
            throw error;
        }
    }
};
export default TimeSlotService;