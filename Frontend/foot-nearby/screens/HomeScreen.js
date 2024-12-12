import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";


const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nearby Football Fields</Text>
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
