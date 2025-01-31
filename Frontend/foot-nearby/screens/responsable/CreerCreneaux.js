import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { API_URL } from '@env';
import TimeSlotService from '../../services/TimeSlotService';
const CreerCreneaux = ({ route }) => {
    const { pitchId } = route.params;
    //const pitchId = 3;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day
    const [date, setDate] = useState(today);
    const [startHour, setStartHour] = useState(() => {
        const now = new Date();
        now.setMinutes(0);
        return now;
    });
    const [endHour, setEndHour] = useState(() => {
        const now = new Date();
        now.setMinutes(0);
        return now;
    });
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleCreateSlots = async () => {
        try {
            console.log("Pitch id : "+pitchId)
            const start_Hour = startHour.getTime();
            const end_Hour = endHour.getTime();
            const IsoDate = date.toISOString();
            console.log(IsoDate)
            const response = await TimeSlotService.createTimeSlot({date:IsoDate,pitchId,startHour:start_Hour,endHour:end_Hour});
            setShowConfirmModal(false);
            alert('Créneaux créés avec succès!');
        } catch (error) {
            console.error(error);
            setShowConfirmModal(false);
            alert('Erreur lors de la création des créneaux');
        }
    };

    const handleStartTimeChange = (event, selectedTime) => {
        setShowStartTimePicker(false);
        if (selectedTime) {
            const hours = selectedTime.getHours();
            const newDate = new Date(date);
            newDate.setHours(hours, 0, 0, 0); // Force minutes to 00
            setStartHour(newDate);
        }
    };

    const handleEndTimeChange = (event, selectedTime) => {
        setShowEndTimePicker(false);
        if (selectedTime) {
            const hours = selectedTime.getHours();
            const newDate = new Date(date);
            newDate.setHours(hours, 0, 0, 0); // Force minutes to 00
            setEndHour(newDate);
        }
    };

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            const selected = new Date(selectedDate);
            selected.setHours(1, 0, 0, 0);
            if (selected >= today) {
                setDate(selected);
            } else {
                alert('Vous ne pouvez pas créer des créneaux pour des dates passées.');
                setDate(today);
            }
        }
    };

    const formatTimeDisplay = (date) => {
        return `${date.getHours()}:00`;
    };

    const handleCreateButtonPress = () => {
        setShowConfirmModal(true);
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Créer des Créneaux</Text>

                {/* Date Selector */}
                <TouchableOpacity 
                    style={styles.pickerButton}
                    onPress={() => setShowDatePicker(true)}>
                    <MaterialIcons name="calendar-today" size={24} color="#4CAF50" />
                    <Text style={styles.pickerButtonText}>
                        {date.toLocaleDateString()}
                    </Text>
                </TouchableOpacity>

                {/* Start Hour Selector */}
                <TouchableOpacity 
                    style={styles.pickerButton}
                    onPress={() => setShowStartTimePicker(true)}>
                    <MaterialIcons name="access-time" size={24} color="#4CAF50" />
                    <Text style={styles.pickerButtonText}>
                        Début: {formatTimeDisplay(startHour)}
                    </Text>
                </TouchableOpacity>

                {/* End Hour Selector */}
                <TouchableOpacity 
                    style={styles.pickerButton}
                    onPress={() => setShowEndTimePicker(true)}>
                    <MaterialIcons name="access-time" size={24} color="#4CAF50" />
                    <Text style={styles.pickerButtonText}>
                        Fin: {formatTimeDisplay(endHour)}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.createButton}
                    onPress={handleCreateButtonPress}>
                    <Text style={styles.createButtonText}>Créer les Créneaux</Text>
                </TouchableOpacity>
            </View>

            {/* Date Picker */}
            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleDateChange}
                    minimumDate={today}
                />
            )}

            {/* Start Time Picker with modified onChange */}
            {showStartTimePicker && (
                <DateTimePicker
                    value={startHour}
                    mode="time"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleStartTimeChange}
                    minuteInterval={60}
                />
            )}

            {/* End Time Picker with modified onChange */}
            {showEndTimePicker && (
                <DateTimePicker
                    value={endHour}
                    mode="time"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleEndTimeChange}
                    minuteInterval={60}
                />
            )}

            {/* Confirmation Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={showConfirmModal}
                onRequestClose={() => setShowConfirmModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Confirmation</Text>
                        <Text style={styles.modalText}>
                            Voulez-vous créer des créneaux pour :
                        </Text>
                        <Text style={styles.modalDetails}>
                            Date: {date.toLocaleDateString()}
                        </Text>
                        <Text style={styles.modalDetails}>
                            De {formatTimeDisplay(startHour)} à {formatTimeDisplay(endHour)}
                        </Text>
                        
                        <View style={styles.modalButtons}>
                            <TouchableOpacity 
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setShowConfirmModal(false)}>
                                <Text style={styles.modalButtonText}>Annuler</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.modalButton, styles.confirmButton]}
                                onPress={handleCreateSlots}>
                                <Text style={styles.modalButtonText}>Confirmer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
        justifyContent: 'center',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
        textAlign: 'center',
    },
    pickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    pickerButtonText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 10,
    },
    createButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    createButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        width: '80%',
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 10,
    },
    modalDetails: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: '500',
        color: '#4CAF50',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    modalButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#ff5252',
    },
    confirmButton: {
        backgroundColor: '#4CAF50',
    },
    modalButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CreerCreneaux;
