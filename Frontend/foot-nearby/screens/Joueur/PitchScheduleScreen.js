import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';

import TimeSlot from "../../models/TimeSlot";

const PitchScheduleScreen = ({  }) => {

    const { pitchId } = 2;
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [slots, setSlots] = useState < TimeSlot > ([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchSlots();
    }, [selectedDate]);

    const fetchSlots = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/time-slot/get/?date=${selectedDate}&pitchId=${pitchId}`);
            setSlots(response.data);
        } catch (error) {
            Alert.alert('Error', 'Failed to load time slots');
        } finally {
            setLoading(false);
        }
    };

    const handleBooking = async (slotId) => {
        // try {
        //     await axios.post(`/api/reservations/slots/${slotId}`);
        //     Alert.alert('Success', 'Slot booked successfully');
        //     fetchSlots(); // Refresh slots
        // } catch (error) {
        //     Alert.alert('Error', 'Failed to book slot');
        // }
    };

    const TimeSlotGrid = () => (
        <View style={styles.gridContainer}>
            {slots.map((Jsonslot) => (
                //converting the element from json to TimeSlot
                
                <TouchableOpacity
                    key={slot.id}
                    style={[
                        styles.slotButton,
                        {
                            backgroundColor: slot.status === 'FREE' ? '#4CAF50' : '#ccc'
                        }
                    ]}
                    disabled={slot.status !== 'FREE'}
                    onPress={() => handleBooking(slot.id)}
                >
                    <Text style={styles.slotTime}>
                        {new Date(slot.startHour).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </Text>
                    <Text style={styles.slotStatus}>{slot.status}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            <Calendar
                onDayPress={(day) => setSelectedDate(day.dateString)}
                markedDates={{
                    [selectedDate]: { selected: true }
                }}
                minDate={new Date().toISOString().split('T')[0]}
            />

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <TimeSlotGrid />
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    gridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: 10,
      justifyContent: 'space-between',
    },
    slotButton: {
      width: '30%',
      padding: 10,
      margin: 5,
      borderRadius: 8,
      alignItems: 'center',
    },
    slotTime: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    slotStatus: {
      color: '#fff',
      fontSize: 12,
    },
  });

export default PitchScheduleScreen;