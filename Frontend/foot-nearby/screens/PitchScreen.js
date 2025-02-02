import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const PitchScreen = ({ route }) => {
    const { pitch } = route.params;
    const navigation = useNavigation();

    if (!pitch) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>No pitch data available</Text>
            </View>
        );
    }

    const handleReservation = () => {
        console.log('Reservation button clicked');
        navigation.navigate('PitchScheduleScreen', { pitchId: pitch.id });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Card style={styles.card}>
                {/* {pitch.images && pitch.images.length > 0 && (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
                        {pitch.images.map((image, index) => (
                            <Image key={index} source={{ uri: image }} style={styles.image} />
                        ))}
                    </ScrollView>
                )} */}
                <Card.Title title={pitch.name} titleStyle={styles.title} />
                <Card.Content>
                    <Text style={styles.description}>{pitch.description}</Text>
                    <Text style={styles.details}>📍 {pitch.address}</Text>
                    <Text style={styles.details}>👥 Capacity: {pitch.capacity}</Text>
                    <Text style={styles.price}>💰 ${pitch.pricePerHour} per hour</Text>
                </Card.Content>
                <TouchableOpacity style={styles.button} onPress={handleReservation}>
                    <Text style={styles.buttonText}>Reserve Now</Text>
                </TouchableOpacity>
            </Card>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f4f4f4',
        alignItems: 'center',
    },
    card: {
        width: '100%',
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 5,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 10,
        color: '#555',
    },
    details: {
        fontSize: 14,
        textAlign: 'center',
        color: '#666',
        marginVertical: 3,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#27ae60',
        marginVertical: 10,
    },
    imageScroll: {
        flexDirection: 'row',
        padding: 10,
    },
    image: {
        width: 150,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        margin: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PitchScreen;
