import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/actions/authActions";


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sendingRequest, setSendingRequest] = useState(false);
  const dispatch = useDispatch();
  const handleLogin = async () => {
    setError("");
    setSendingRequest(true);
    if (!email || !password) {
      setError("All fields are required");
      setSendingRequest(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email");
      setSendingRequest(false);
      return;
    }
    const response = await dispatch(loginUser( email, password ));
    console.log("la Response du dipatch: ", response);
    if (response.success == true) {
      setSendingRequest(false);
      if (response.role === 1)
        navigation.navigate("WelcomeScreenManager");
      else
        navigation.navigate("WelcomeScreenPlayer");
      setSendingRequest(false);
    }
    setSendingRequest(false);

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
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Bouton de soumission */}
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={sendingRequest}>
        {sendingRequest ? (
          <Text style={styles.buttonText}>Loading...</Text>
        ) : (
          <Text style={styles.buttonText}>Log in</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
        <Text style={[styles.buttonText, { color: '#000000' }]}>Back to Welcome</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
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
  errorText: {
    color: "red",
    marginBottom: 15,
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
  backButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#000000",
    marginTop: 10,
  },
});

export default LoginScreen;
