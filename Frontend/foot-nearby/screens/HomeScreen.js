import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button, Image } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";



const HomeScreen = ({ navigation }) => {

  const translateY = useSharedValue(0);

  // Fonction qui démarre l'animation avec un effet de ressort
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

  // Création d'un style animé basé sur la valeur partagée
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }], // Applique la translation
    };
  });


  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row',   alignItems: 'center'}}>
        <Animated.View style={[ animatedStyle]}>
          {/* <Text  style={[styles.title,animatedStyle]} onPress={handlePress} >Nearby Football Fields</Text> */}
          {/* <Image source={require('../assets/Ball.png')} onPress={handlePress} style={{width: 100, height: 100}} /> */}
          <Image source={require('../assets/Ball.png')} onPress={handlePress} style={{width: 50, height: 50}} />
        </Animated.View> 
        
        <Text  style={[styles.title]} onPress={handlePress} >Foot Nearby </Text>
      </View>
      {/* <Text  style={[styles.title,animatedStyle]} >Nearby Football Fields</Text> */}
      <Text style={styles.description}>
        Discover, book, and play football near you in minutes!
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "left",
    padding: 20,
    backgroundColor: "#FFFFFF", // Arrière-plan blanc
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left",
    color: "#000000", // Texte noir
  },
  description: {
    fontSize: 16,
    textAlign: "left",
    marginBottom: 40,
    color: "#4F4F4F", // Gris foncé pour la description
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "#000000",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#FFFFFF", // Texte blanc
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF", // Bouton blanc pour "Sign up"
  },
  secondaryButtonText: {
    color: "#000000", // Texte noir pour le bouton secondaire
  },
});

export default HomeScreen;
