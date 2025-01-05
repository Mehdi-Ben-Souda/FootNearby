import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";

import PitchService from "../../services/PitchService";

const EditPitchScreen = ({ route, navigation }) => {
  const { pitch } = route.params;

  const [name, setName] = useState(pitch.name);
  const [description, setDescription] = useState(pitch.description);
  const [address, setAddress] = useState(pitch.address);
  const [latitude, setLatitude] = useState(pitch.location.coordinates[1]);
  const [longitude, setLongitude] = useState(pitch.location.coordinates[0]);
  const [pricePerHour, setPricePerHour] = useState(
    pitch.pricePerHour.toString()
  );
  const [capacity, setCapacity] = useState(pitch.capacity);
  const [images, setImages] = useState(pitch.images || []);

  const pickImage = async () => {
    if (images.length >= 5) {
      Alert.alert("Limit Reached", "You can only select up to 5 images.");
      return;
    }

    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Permission to access the gallery was denied."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.assets && result.assets[0]?.uri) {
      setImages((prevImages) => [...prevImages, result.assets[0].uri]);
    } else {
      Alert.alert("Error", "No image selected.");
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLatitude(latitude);
    setLongitude(longitude);
  };

  const handleSubmit = async () => {
    const updatedPitchData = {
      name,
      description,
      address,
      location: {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
      pricePerHour: parseFloat(pricePerHour),
      capacity: parseInt(capacity),
      images: images,
    };

    try {
      const response = await PitchService.updatePitch(
        pitch.id,
        updatedPitchData
      );
      Alert.alert("Success", "Pitch updated successfully!");

      navigation.goBack({ refresh: true });
    } catch (error) {
      Alert.alert("Error", "Failed to update pitch. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Pitch</Text>
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
      <Text style={styles.subtitle}>Pitch Type</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={capacity}
          onValueChange={(itemValue) => setCapacity(Number(itemValue))}
          style={styles.picker}
        >
          <Picker.Item label="5v5" value={5} />
          <Picker.Item label="7v7" value={7} />
          <Picker.Item label="9v9" value={9} />
          <Picker.Item label="11v11" value={11} />
        </Picker>
      </View>
      <View style={styles.imagePickerContainer}>
        <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
          <Text style={styles.imagePickerText}>Select Images</Text>
        </TouchableOpacity>
        <FlatList
          data={images}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.imagesPreview}
          renderItem={({ item, index }) => (
            <View style={styles.imageWrapper}>
              <Image source={{ uri: item }} style={styles.previewImage} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeImage(index)}
              >
                <Text style={styles.removeButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <Text style={styles.subtitle}>Select Location on Map</Text>
      <MapView
        style={styles.map}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={handleMapPress}
      >
        <Marker coordinate={{ latitude, longitude }} />
      </MapView>
      <Button title="Update Pitch" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  subtitle: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 16,
  },
  pickerContainer: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  picker: {
    height: 53,
    width: "100%",
    paddingHorizontal: 8,
    color: "#333",
  },
  map: {
    height: 300,
    width: "100%",
    marginBottom: 16,
  },
  imagePickerContainer: {
    marginBottom: 16,
  },
  imagePickerButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  imagePickerText: {
    color: "#fff",
    fontWeight: "bold",
  },
  imagesPreview: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageWrapper: {
    position: "relative",
    marginRight: 10,
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  removeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "grey",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default EditPitchScreen;