import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import ReservationService from "../../services/reservationService";
import { useSelector } from "react-redux";

const { width } = Dimensions.get("window");

const ReservationList = () => {
  const user = useSelector((state) => state.auth.user);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const date = new Date(reservations.startHour);

  useEffect(() => {
    fetchReservations();
  }, [user.id]);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const data = await ReservationService.getReservationByMangerId(user.id);

      setReservations(data);
    } catch (err) {
      setError("Erreur lors du chargement des réservations");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const renderReservationItem = ({ item }) => (
    <View style={styles.reservationCard}>
      <View style={styles.cardHeader}>
        <View style={styles.userInfo}>
          <Text style={styles.username}>
            {item.user?.name || "Utilisateur inconnu"}
          </Text>
          <Text style={styles.fieldName}>
            {item.timeSlot?.pitch?.name || "Non spécifié"}
          </Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Prix/h</Text>
          <Text style={styles.price}>
            {item.timeSlot?.pitch?.pricePerHour || 0}€
          </Text>
        </View>
      </View>

      <View style={styles.separator} />

      <View style={styles.timeSlotContainer}>
        <View style={styles.timeInfo}>
          <Text style={styles.dateLabel}>DATE</Text>
          <Text style={styles.timeSlot}>{formatDate(item.timeSlot?.date)}</Text>
        </View>
        <View style={styles.timeInfo}>
          <Text style={styles.dateLabel}>HEURE</Text>
          <Text style={styles.timeSlot}>
            {formatTime(Number(item.timeSlot?.startHour))}
          </Text>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Reservation List</Text>
      </View>
      <FlatList
        data={reservations}
        renderItem={renderReservationItem}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  headerContainer: {
    paddingVertical: 15,
    paddingHorizontal: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2c3e50",
    letterSpacing: 0.5,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  reservationCard: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    width: width - 32,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: 4,
  },
  fieldName: {
    fontSize: 15,
    color: "#7f8c8d",
    fontWeight: "500",
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  priceLabel: {
    fontSize: 12,
    color: "#95a5a6",
    fontWeight: "600",
    marginBottom: 2,
    textTransform: "uppercase",
  },
  price: {
    fontSize: 20,
    fontWeight: "700",
    color: "#27ae60",
  },
  separator: {
    height: 1,
    backgroundColor: "#e9ecef",
    marginHorizontal: 16,
  },
  timeSlotContainer: {
    flexDirection: "row",
    padding: 16,
    paddingTop: 12,
  },
  timeInfo: {
    marginRight: 24,
  },
  dateLabel: {
    fontSize: 12,
    color: "#95a5a6",
    fontWeight: "600",
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  timeSlot: {
    fontSize: 15,
    color: "#34495e",
    fontWeight: "500",
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
});

export default ReservationList;
