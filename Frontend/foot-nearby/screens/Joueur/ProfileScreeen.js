import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
        dispatch(logout());

    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: 'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp' }}
                        style={styles.profileImage}
                    />
                    <TouchableOpacity style={styles.editImageButton}>
                        <MaterialIcons name="edit" size={20} color="white" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.name}>{user.name}</Text>
            </View>

            <View style={styles.infoSection}>
                <View style={styles.infoItem}>
                    <Ionicons name="mail" size={24} color="#4CAF50" />
                    <View style={styles.infoTextContainer}>
                        <Text style={styles.infoLabel}>Email</Text>
                        <Text style={styles.infoValue}>{user.email}</Text>
                    </View>
                </View>

                <View style={styles.infoItem}>
                    <Ionicons name="call" size={24} color="#4CAF50" />
                    <View style={styles.infoTextContainer}>
                        <Text style={styles.infoLabel}>Téléphone</Text>
                        <Text style={styles.infoValue}>{user.phoneNumber}</Text>
                    </View>
                </View>

                <View style={styles.infoItem}>
                    <Ionicons name="football" size={24} color="#4CAF50" />
                    <View style={styles.infoTextContainer}>
                        <Text style={styles.infoLabel}>Matchs joués</Text>
                        <Text style={styles.infoValue}>12</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={24} color="white" />
                <Text style={styles.logoutText}>Déconnexion</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#4CAF50',
        padding: 20,
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingBottom: 40,
    },
    imageContainer: {
        position: 'relative',
        marginBottom: 10,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: 'white',
    },
    editImageButton: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: '#4CAF50',
        padding: 8,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: 'white',
    },
    name: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        marginTop: 10,
    },
    infoSection: {
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 15,
        padding: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    infoTextContainer: {
        marginLeft: 15,
        flex: 1,
    },
    infoLabel: {
        color: '#666',
        fontSize: 14,
    },
    infoValue: {
        color: '#333',
        fontSize: 16,
        fontWeight: '500',
        marginTop: 2,
    },
    logoutButton: {
        backgroundColor: '#ff4444',
        margin: 20,
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});

export default ProfileScreen;