import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

export default function SplashScreen({ navigation }) {
    const { width, height } = Dimensions.get('window');

    // Animation values
    const translateY = useSharedValue(0);
    const fadeIn = useSharedValue(0);

    // Logo Animation
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
        opacity: fadeIn.value
    }));
    const animatedStyleAllView = useAnimatedStyle(() => ({
        opacity: fadeIn.value
    }));
    useEffect(() => {
        fadeIn.value = withTiming(1, { duration: 1000 });
        startSpringAnimation();

        setTimeout(() => {
            navigation.replace('Home'); // Navigate to Home Screen after animation
        }, 3500);
    }, []);

    const startSpringAnimation = () => {
        translateY.value = withSpring(-20, { damping: 3, stiffness: 120 });
    };

    return (
        <View style={styles.container}>


            <Animated.View style={[animatedStyleAllView]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Animated.View style={[animatedStyle]}>
                        <TouchableOpacity>
                            <Image source={require('../assets/Ball.png')} style={styles.logo} />
                        </TouchableOpacity>
                    </Animated.View>
                    <Text style={styles.tagline}>Foot Nearby</Text>
                </View>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lottie: {
        width: 200,
        height: 200,
    },
    logo: {
        width: 80,
        height: 80,
    },
    tagline: {
        marginLeft: 10,
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "left",
        color: "#000000", // Texte noir
    },
    footNearby: {
        marginTop: 5,
        fontSize: 16,
        color: '#4EEAF6', // Highlighted Color
        fontWeight: '600',
    }
});
