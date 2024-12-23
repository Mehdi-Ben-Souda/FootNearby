import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <Image 
                source={{ uri: 'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp' }} 
                style={styles.profileImage} 
            />
            <Text style={styles.name}>Afriad Abdelaziz</Text>
            <Text style={styles.email}>Afriad.Abdelaziz@theodo.com</Text>
            <Text style={styles.phone}>+1234567890</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#4F4F4F",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    email: {
        fontSize: 18,
        color: '#CCCCCC',
        marginBottom: 10,
    },
    phone: {
        fontSize: 18,
        color: '#CCCCCC',
    },
});

export default ProfileScreen;