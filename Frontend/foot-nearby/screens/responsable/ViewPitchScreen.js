import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import PitchService from "../../services/PitchService";
import { useSelector } from "react-redux";

const { width: windowWidth } = Dimensions.get("window");

const ViewPitchScreen = ({ navigation }) => {
  const [pitches, setPitches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageLoadErrors, setImageLoadErrors] = useState({});
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    const fetchPitches = async () => {
      setLoading(true);
      try {
        const data = await PitchService.getPitchesByUserId(user.id);
        setPitches(data);
      } catch (error) {
        console.error("Error fetching pitches:", error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = navigation.addListener("focus", fetchPitches);

    fetchPitches();

    return unsubscribe;
  }, [navigation]);

  const handleEdit = (pitch) => {
    navigation.navigate("EditPitch", { pitch });
  };

  const handleImageError = (imageId) => {
    setImageLoadErrors(prev => ({
      ...prev,
      [imageId]: true
    }));
  };

  const renderPitchImage = (image, index, pitchId) => {
    if (imageLoadErrors[`${pitchId}-${index}`]) {
      return (
        <View 
          key={`${pitchId}-${index}`}
          style={[styles.pitchImage, styles.fallbackImageContainer]}
        >
          <Text style={styles.fallbackText}>Image unavailable</Text>
        </View>
      );
    }

    return (
      <Image
        key={`${pitchId}-${index}`}
        source={{ 
          uri: PitchService.getImageUrl(image),
          headers: { 'Cache-Control': 'max-age=3600' }
        }}
        style={styles.pitchImage}
        onError={() => handleImageError(`${pitchId}-${index}`)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of Pitches</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={pitches}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.pitchCard}>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.imageCarousel}
              >
                {Array.isArray(item.images) && item.images.length > 0 ? (
                  item.images.map((image, index) => renderPitchImage(image, index, item.id))
                ) : (
                  <View 
                    key={`${item.id}-fallback`}
                    style={[styles.pitchImage, styles.fallbackImageContainer]}
                  >
                    <Text style={styles.fallbackText}>No images available</Text>
                  </View>
                )}
              </ScrollView>

              <Text style={styles.pitchName}>{item.name}</Text>
              <Text style={styles.pitchDescription}>{item.description}</Text>
              <Text style={styles.pitchInfo}>
                Price per hour: ${item.pricePerHour}
              </Text>
              <Text style={styles.pitchInfo}>Capacity: {item.capacity}</Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEdit(item)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.editButton, { backgroundColor: "#28a745" }]}
                onPress={() =>
                  navigation.navigate("PitchReservations", { pitchId: item.id })
                }
              >
                <Text style={styles.buttonText}>Voir les réservations</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.editButton, { backgroundColor: "#007bff" }]}
                onPress={() => navigation.navigate("GererCreneaux", { pitchId: item.id })}
              >
                <Text style={styles.buttonText}>Gérer les créneaux</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  pitchCard: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: "hidden",
  },
  editButton: {
    marginTop: 10,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  manageButton: {
    marginTop: 10,
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  pitchImage: {
    width: windowWidth - 60,
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
  },
  pitchName: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  pitchDescription: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  pitchInfo: {
    fontSize: 15,
    color: "#666",
    fontStyle: "italic",
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  imageCarousel: {
    flexDirection: "row",
    marginBottom: 10,
  },
  fallbackImageContainer: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    color: '#666',
    fontSize: 14,
  },
});

export default ViewPitchScreen;
