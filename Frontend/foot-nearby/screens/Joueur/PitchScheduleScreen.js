import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';

import TimeSlot from "../../models/TimeSlot";
import TimeSlotService from '../../services/TimeSlotService';
import { ScrollView } from 'react-native-gesture-handler';

const PitchScheduleScreen = ({ }) => {

    const pitchId = 3;
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchSlots();
    }, [selectedDate]);

    const fetchSlots = async () => {
        try {
            setLoading(true);
            const timeSlots = await TimeSlotService.getTimeSlots(selectedDate, pitchId);
            setSlots(timeSlots);
            console.log("Slots: ", (timeSlots));
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
        <ScrollView contentContainerStyle={styles.gridContainer}>
            {slots.map((Jsonslot) => {
                //converting the element from json to TimeSlot
                const slot = TimeSlot.fromJson(Jsonslot);
                return (<TouchableOpacity
                    key={slot.id}
                    style={[
                        styles.slotButton,
                        {
                            backgroundColor: slot.status === 'FREE' ? '#4CAF50' : '#ccc'
                        }
                    ]}
                    disabled={slot.status !== 'FREE'}
                //onPress={() => handleBooking(slot.id)}
                >
                    <Text style={styles.slotTime}>
                        {new Date(slot.startHour).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </Text>
                    <Text style={styles.slotStatus}>{slot.status}</Text>
                </TouchableOpacity>
                )
            })}
        </ScrollView>
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
            <View style={{ borderBottomColor: '#0000FF', borderBottomWidth: 1, marginVertical: 10 }} />
            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}>Créneaux disponibles</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                slots.length === 0 ? (
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>Aucun créneau n'est disponible pour cette date</Text>
                ) : (
                    <TimeSlotGrid />
                )
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