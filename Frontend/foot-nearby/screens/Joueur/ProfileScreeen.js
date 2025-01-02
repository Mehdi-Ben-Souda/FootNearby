import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { getUser } from '../../sharedData/data';

import { useSelector } from 'react-redux';

const ProfileScreen = () => {
    let user= useSelector(state => state.auth.user)

    // let user = getUser();

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30, fontWeight: "Bold" }}>Hello Player</Text>
            <Image
                source={{ uri: 'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp' }}
                style={styles.profileImage}
            />
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
            <Text style={styles.phone}>{user.phoneNumber}</Text>
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