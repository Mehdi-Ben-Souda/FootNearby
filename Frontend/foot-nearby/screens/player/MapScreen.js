import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useSharedValue, withSpring } from "react-native-reanimated";


export const MapScreen = () => {

    const translateY = useSharedValue(0);
    
    const [location, setLocation] = useState({
        latitude: 33.697904,
        longitude: -7.4019606,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const startSpringAnimation = () => {
        translateY.value = withSpring(-20, {
          damping: 2, // Contrôle l'amortissement du ressort
          stiffness: 100, // Contrôle la raideur du ressort
        });
      };
    
      const stopSpringAnimation = () => {
        translateY.value = withSpring(0, {
          damping: 2, // Contrôle l'amortissement du ressort
          stiffness: 100, // Contrôle la raideur du ressort
        });
      };
    
      const handlePress = () => {
        startSpringAnimation();
        setTimeout(stopSpringAnimation, 200);
      }

    useEffect(() => {
        const { status } = Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }

        Location.getCurrentPositionAsync({}).then((location) => {
            setLocation({
                ...location.coords,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        });

    }, []);


    const styles = StyleSheet.create({
        container: {
            flex: 1, // Permet à la vue de prendre toute la hauteur disponible
            width: '100%', // La largeur de la vue est de 100% de l'écran
            height: '100%', // La hauteur de la vue est de 100% de l'écran
        },
        map: {
            flex: 1, // Permet à la carte de remplir toute la vue },
        }
    });
    return (
        <View style={styles.container}>

            <MapView
                style={styles.map}
                initialRegion={location}
                showsUserLocation={true} >
                <Marker
                    coordinate={{ latitude:location.latitude, longitude: location.longitude }} // Position du marqueur
                    title="Marqueur 1" // Titre du marqueur
                    description="C'est un marqueur placé sur la carte."
                    onPress={handlePress} />
            </MapView>
        </View>);
}