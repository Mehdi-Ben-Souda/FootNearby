import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import MapView from 'react-native-maps';
import DropDownPicker from 'react-native-dropdown-picker';
import { useDispatch } from "react-redux";


const { width, height } = Dimensions.get('window');

const TerrainsScreen = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: '1km', value: '1' },
        { label: '3km', value: '2' },
        { label: '5km', value: '5' },
    ]);
    const dispatch = useDispatch();

    useEffect(async () => {
        console.log("useEffect called");
        const response = await dispatch(searchPitch(email, password));


    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={() => {
                        console.log('Search button pressed');
                    }}
                >
                    <Text
                        style={styles.searchButtonText}
                    >Search</Text>
                </TouchableOpacity>
                <DropDownPicker
                    style={styles.dropdown}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder="Select an item"
                    textStyle={styles.dropdownText}
                    dropDownContainerStyle={styles.dropdownContainer}
                />

            </View>

            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
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
