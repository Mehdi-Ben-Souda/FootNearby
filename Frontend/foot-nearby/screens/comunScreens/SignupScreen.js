import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import authService from "../../services/authService";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const response = await authService.register(username, email, password);
    if (response) {
      console.log("Signup successful:", response);
      navigation.navigate("Welcome");
    }
    else
      Alert.alert("Invalid credentials", "invalid Email")
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      {/* Champ de saisie pour l'email */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#888"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />

      {/* Champ de saisie pour l'email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {/* Champ de saisie pour le mot de passe */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      {/* Champ de saisie pour la confirmation du mot de passe */}
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#888"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {/* Bouton de soumission */}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "left",
    backgroundColor: "#FFFFFF", // Arrière-plan blanc
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#000000", // Texte noir
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#000000", // Bordure noire
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#FFFFFF", // Fond blanc pour les champs
    color: "#000000", // Texte noir
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#000000", // Bouton noir
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF", // Texte blanc pour le bouton
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SignupScreen;
