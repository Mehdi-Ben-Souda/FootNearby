import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import { API_URL } from '@env';
import TimeSlot from '../../models/TimeSlot';
import TimeSlotService from '../../services/TimeSlotService';

const GererCreneauxScreen = ({ route, navigation }) => {
    const { pitchId } = route.params;
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [timeSlots, setTimeSlots] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTimeSlots();
    }, [selectedDate]);

    const fetchTimeSlots = async () => {
        setLoading(true);
        try {
            console.log("Pitch id : "+pitchId)
            const response =await TimeSlotService.getTimeSlots(selectedDate, pitchId);
            setTimeSlots(response);
        } catch (error) {
            console.error('Error fetching time slots:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDateSelect = (day) => {
        setSelectedDate(day.dateString);
    };

    const getSlotStatusColor = (status) => {
        switch (status) {
            case 'FREE': return '#4CAF50';
            case 'RESERVED': return '#f44336';
            default: return '#999';
        }
    };

    // const formatTime = (hour) => {
    //     console.log(hour);
    //     return `${hour}:00`;
        
        
    // };
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      };

    return (
        <View style={styles.container}>
            <Calendar
                current={selectedDate}
                onDayPress={handleDateSelect}
                markedDates={{
                    [selectedDate]: { selected: true, selectedColor: '#4CAF50' }
                }}
                minDate={new Date().toISOString().split('T')[0]}
            />

            <View style={styles.slotsContainer}>
                <View style={styles.headerRow}>
                    <Text style={styles.headerTitle}>Créneaux du {new Date(selectedDate).toLocaleDateString()}</Text>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => navigation.navigate('CreerCreneaux', { pitchId })}
                    >
                        <Text style={styles.addButtonText}>+ Ajouter</Text>
                    </TouchableOpacity>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#4CAF50" />
                ) : (
                    <FlatList
                        data={timeSlots}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => {
                            const timeslot = TimeSlot.fromJson(item);
                            return (
                            <View style={[styles.slotCard, { borderLeftColor: getSlotStatusColor(timeslot.status) }]}>
                                <Text style={styles.slotTime}>{formatTime(timeslot.startHour)}</Text>
                                <Text style={styles.slotStatus}>{timeslot.status}</Text>
                            </View>
                        )}}
                        ListEmptyComponent={
                            <Text style={styles.emptyMessage}>Aucun créneau disponible pour cette date</Text>
                        }
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    slotsContainer: {
        flex: 1,
        padding: 15,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#4CAF50',
        padding: 8,
        borderRadius: 5,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    slotCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#f8f8f8',
        marginBottom: 10,
        borderRadius: 5,
        borderLeftWidth: 5,
    },
    slotTime: {
        fontSize: 16,
        fontWeight: '500',
    },
    slotStatus: {
        fontSize: 14,
        color: '#666',
    },
    emptyMessage: {
        textAlign: 'center',
        color: '#666',
        marginTop: 20,
    },
});

export default GererCreneauxScreen;
