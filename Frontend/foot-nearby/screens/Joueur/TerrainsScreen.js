import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import DropDownPicker from 'react-native-dropdown-picker';
import { API_URL } from '@env';
import { io } from 'socket.io-client';
import * as Location from "expo-location";


const { width, height } = Dimensions.get('window');

const TerrainsScreen = () => {
    const [open, setOpen] = useState(false);
    const [radius, setRadius] = useState(null);
    const [items, setItems] = useState([
        { label: '1km', value: '1' },
        { label: '3km', value: '2' },
        { label: '5km', value: '5' },
    ]);
    const [socket, setSocket] = useState(null);
    const [location, setLocation] = useState(null); // User's current location
    const [region, setRegion] = useState({
        latitude: 37.78825, // Default region
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const mapRef = useRef(null);


    useEffect(() => {
        (async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    Alert.alert(
                        "Permission Denied",
                        "Permission to access location was denied."
                    );
                    return;
                }

                let userLocation = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.High,
                });

                const latitude = userLocation.coords.latitude;
                const longitude = userLocation.coords.longitude;

                setLocation({ latitude, longitude });
                setRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });

                const newSocket = io(`${API_URL}`);
                setSocket(newSocket);
                newSocket.on('searchResults', (data) => {
                    console.log('Search results:', data);
                    setResults(data);
                });

                newSocket.emit('search', { "latitude": latitude, "longitude": longitude, "radius": 1 }); // Send search query to the server

                return () => {
                    newSocket.disconnect();
                };
            } catch (error) {
                Alert.alert("Error", "Unable to fetch location.");
                console.error(error);

            }
        })();
    }, []);

    const handleSearch = () => {
        if (socket) {
            socket.emit('search', { "latitude": region.latitude, "longitude": region.longitude, "radius": radius }); // Send search query to the server
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={() => {

                        handleSearch();
                    }}
                >
                    <Text
                        style={styles.searchButtonText}
                    >Search</Text>
                </TouchableOpacity>
                <DropDownPicker
                    style={styles.dropdown}
                    open={open}
                    value={radius}
                    items={items}
                    setOpen={setOpen}
                    setValue={setRadius}
                    setItems={setItems}
                    placeholder="Select an item"
                    textStyle={styles.dropdownText}
                    dropDownContainerStyle={styles.dropdownContainer}
                />

            </View>

            <MapView
                style={styles.map}
                region={region}
                initialRegion={region}
                onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
                showsUserLocation
                showsMyLocationButton
                ref={mapRef}
            >
            </MapView>
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
        left: width * 0.1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        width: width * 0.8,
        height: height * 0.08,
        borderRadius: 12,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        zIndex: 100,
    },
    dropdown: {
        backgroundColor: '#f9f9f9',
        borderColor: '#ddd',
        borderRadius: 8,
        width: "50%",
        height: "100%"
    },
    dropdownText: {
        fontSize: 14,
        color: '#333',
    },
    dropdownContainer: {
        width: "50%",
        borderColor: '#ddd',
    },
    searchButton: {
        margin: 10,
        height: "100%",
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        width: "30%",
    },
    searchButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default TerrainsScreen;
