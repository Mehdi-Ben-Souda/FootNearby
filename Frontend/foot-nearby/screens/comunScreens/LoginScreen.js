import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import authService from "../../services/authService";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    const response = await authService.login(email, password);
    if (response) {
      console.log("Login successful:", response.status);
      navigation.navigate("Welcome");
    }
    else {
      Alert.alert("Invalid credentials", "Email and password incorret")
      console.log("email and password incorret");

    }


  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

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

      {/* Lien pour "Mot de passe oublié ?" */}
      <TouchableOpacity>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Bouton de soumission */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log in</Text>
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
    color: "#000000", // Titre noir
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#000000", // Bordure noire
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#FFFFFF", // Fond blanc
    color: "#000000", // Texte noir
  },
  forgotPasswordText: {
    alignSelf: "flex-end",
    marginBottom: 20,
    color: "#000000", // Texte noir
    textDecorationLine: "underline",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#000000", // Fond noir
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF", // Texte blanc
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginScreen;
