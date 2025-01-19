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
    },
    bookTimeSlot:async (timeSlotId,userId)=>{
        try {
            const response = await axios.post(`${API_URL}/reservation`,{timeSlotId,userId});
            return response.data;
        } catch (error) {
            console.error("Error booking time slot:", error.response || error);
            throw error;
        }
    }
};
export default TimeSlotService;