import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Text,
    ActivityIndicator,
    Alert
} from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import DropDownPicker from 'react-native-dropdown-picker';
import { API_URL } from '@env';
import { io } from 'socket.io-client';
import * as Location from "expo-location";
import { useNavigation } from '@react-navigation/native';
import Pitch from '../../models/Pitch';

const { width, height } = Dimensions.get('window');



const TerrainsScreen = () => {
    const [openRadius, setOpenRadius] = useState(false);
    const [openType, setOpenType] = useState(false);
    const [radius, setRadius] = useState('1');
    const [type, setType] = useState('7');

    const [socket, setSocket] = useState(null);
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pitches, setPitches] = useState([]);

    const mapRef = useRef(null);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    Alert.alert("Permission Denied", "Enable location to find pitches.");
                    return;
                }

                let userLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
                setLocation(userLocation.coords);

                const newSocket = io(`${API_URL}`);
                setSocket(newSocket);

                newSocket.on('searchResults', (data) => {
                    const formattedPitches = data.map(Pitch.fromJsonSearch);
                    setPitches(formattedPitches);

                    if (formattedPitches.length > 0) {
                        const { latitude, longitude } = formattedPitches[0];
                        mapRef.current?.animateToRegion({
                            latitude,
                            longitude,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
                        }, 1000);

                    }
                    setLoading(false);
                });

                newSocket.emit('search', { latitude: userLocation.coords.latitude, longitude: userLocation.coords.longitude, radius: radius, type: type });

                return () => {
                    newSocket.disconnect();
                };
            } catch (error) {
                Alert.alert("Error", "Unable to fetch location.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchLocation();
    }, []);

    const handleSearch = useCallback(() => {
        if (socket && location) {
            setLoading(true);
            socket.emit('search', { latitude: location.latitude, longitude: location.longitude, radius: radius, type: type });
        }
    }, [socket, location, radius, type]);

    return (
        <View style={styles.container}>
            {/* Search Controls */}
            <View style={styles.searchContainer}>
                <View style={styles.dropdownWrapper}>

                    <DropDownPicker
                        open={openRadius}
                        value={radius}
                        items={[
                            { label: '1km', value: '1' },
                            { label: '3km', value: '3' },
                            { label: '5km', value: '5' }
                        ]}
                        setOpen={setOpenRadius}
                        setValue={setRadius}
                        placeholder={"Select radius"}
                        style={styles.dropdown}
                        textStyle={styles.dropdownText}
                        dropDownContainerStyle={styles.dropdownContainer}
                    />

                </View>
                <View style={styles.dropdownWrapper}>
                    <DropDownPicker
                        open={openType}
                        value={type}
                        items={[
                            { label: "5v5", value: '5' },
                            { label: "7v7", value: '7' },
                            { label: "9v9", value: '9' },
                            { label: "11v11", value: '11' }
                        ]}
                        setOpen={setOpenType}
                        setValue={setType}
                        placeholder={"Select type"}
                        style={styles.dropdown}
                        textStyle={styles.dropdownText}
                        dropDownContainerStyle={styles.dropdownContainer}
                    />

                </View>
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={styles.searchButtonText}>Search</Text>
                    )}
                </TouchableOpacity>
            </View>


            {/* Map View */}
            {location ? (
                <MapView
                    // ref={mapRef}
                    // provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    showsUserLocation
                    showsMyLocationButton
                >
                    {pitches.map((pitch, index) => (
                        <Marker key={index} coordinate={{ latitude: pitch.latitude, longitude: pitch.longitude }} onPress={() => navigation.navigate('PitchScreen', { pitch })}>
                        </Marker>
                    ))}
                </MapView>
            ) : (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="black" />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    searchContainer: {
        position: 'absolute',
        top: 20,
        left: width * 0.05,
        width: width * 0.9,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        zIndex: 10,
    },
    dropdownWrapper: {
        flex: 1,
        marginRight: 10,
    },
    dropdown: {
        backgroundColor: '#f9f9f9',
        borderColor: '#ddd',
        borderRadius: 8,
    },
    dropdownText: {
        fontSize: 14,
        color: '#333',
    },
    dropdownContainer: {
        borderColor: '#ddd',
    },
    searchButton: {
        height: 50,
        backgroundColor: 'black', // Green for better contrast
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        paddingHorizontal: 15,
    },
    searchButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    calloutContainer: {
        width: 180,
        padding: 8,
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 5,
    },
    calloutTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 3,
    },
    calloutDescription: {
        fontSize: 14,
        color: '#666',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default TerrainsScreen;
