import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

const AddPitchScreen = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");
  const [capacity, setCapacity] = useState("");
  const [images, setImages] = useState("");
  const [location, setLocation] = useState({
    latitude: 33.7063232, // Valeur par défaut
    longitude: -7.3559397, // Valeur par défaut
  });

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLocation({ latitude, longitude });
    Alert.alert("Location Selected", `Lat: ${latitude}, Lng: ${longitude}`);
  };

  const handleSubmit = async () => {
    const pitchData = {
      name,
      description,
      address,
      latitude: location.latitude,
      longitude: location.longitude,
      pricePerHour: parseFloat(pricePerHour),
      capacity: parseInt(capacity),
      images: images.split(","), // Convertir en tableau
    };

    console.log("Pitch Data:", pitchData);
    // Appeler un service ou une API pour envoyer les données au backend
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add a New Pitch</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Price Per Hour"
        value={pricePerHour}
        onChangeText={setPricePerHour}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Capacity"
        value={capacity}
        onChangeText={setCapacity}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Images (comma separated URLs)"
        value={images}
        onChangeText={setImages}
      />
      <Text style={styles.subtitle}>Select Location on Map</Text>
      <Button title="Add Pitch" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  subtitle: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  map: {
    height: 300,
    width: "100%",
    marginBottom: 16,
  },
});

export default AddPitchScreen;
