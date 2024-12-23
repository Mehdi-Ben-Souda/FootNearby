import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const terrains = [
    {
        id: 1,
        name: 'Terrain 1',
        latitude: 37.78825,
        longitude: -122.4324,
    },
    {
        id: 2,
        name: 'Terrain 2',
        latitude: 37.75825,
        longitude: -122.4624,
    },
    // Ajoutez plus de terrains ici
];

const TerrainsScreen = () => {
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {terrains.map((terrain) => (
                    <Marker
                        key={terrain.id}
                        coordinate={{
                            latitude: terrain.latitude,
                            longitude: terrain.longitude,
                        }}
                        title={terrain.name}
                    />
                ))}
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
});

export default TerrainsScreen;