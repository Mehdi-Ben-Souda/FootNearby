import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  ScrollView
} from "react-native";
import authService from "../services/authService";
import { Picker } from "@react-native-picker/picker";
import { getUser } from "../sharedData/data";
const { width, height } = Dimensions.get('window');

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [sendingRequest, setSendingRequest] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState(0);

  const handleSignup = async () => {
    setError("");
    setSendingRequest(true);
    if (!username || !email || !password || !confirmPassword || !phoneNumber) {
      setError("All fields are required");
      setSendingRequest(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email");
      setSendingRequest(false);
      return;
    }
    // Clear previous errors
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setSendingRequest(false);
      return;
    }

    try {
      const response = await authService.register(username, email, password, phoneNumber, role, setError);
      if (response) {
        // console.log("Signup successful :" + getUser().role);
        // if (getUser().role == 1)
        //   navigation.navigate("WelcomeScreenManager");
        // else
        //   navigation.navigate("WelcomeScreenPlayer");
        navigation.navigate("LoginScreen");
      }
    } catch (err) {
      setError("An error occurred during signup");
    } finally {
      setSendingRequest(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.ViewTitle}>
        <Text style={styles.title}>Create Account</Text>
      </View>
      <ScrollView style={styles.ScrollView}>


        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#888"
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#888"
          keyboardType="phone-pad"
          autoCapitalize="none"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#888"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <Text style={styles.label}>Select a role:</Text>
        <Picker
          selectedValue={role}
          onValueChange={(itemValue, itemIndex) => setRole(itemValue)}
          style={styles.picker}

        >
          <Picker.Item label="Player" value="0" />
          <Picker.Item label="Manager" value="1" />
        </Picker>




      </ScrollView >
      <View style={styles.ButtonView}>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={sendingRequest}>
          {sendingRequest ? (
            <Text style={styles.buttonText}>Loading...</Text>
          ) : (
            <Text style={styles.buttonText}>Sign up</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "left",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
    color: "#000000",
  },
  ScrollView: {
    marginTop: height * 0.1,
  },
  ViewTitle: {
    alignItems: "center",
    position: 'absolute',
    top: 0,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    width: width,
    height: height * 0.1,

  },
  ButtonView: {
    alignItems: "center",
    position: 'absolute',
    bottom: 0,
    flex: 1,
    width: width,
  },
  button: {
    width: width * 0.8,
    height: 50,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 20,

  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    margin: 15,
  },
  label: {
    fontSize: 15,
  },
  picker: {
  },
  result: {
    fontSize: 16,
  },
});

export default SignupScreen;
