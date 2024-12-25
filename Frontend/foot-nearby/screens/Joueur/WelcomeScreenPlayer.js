import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TabNavigator from "./components/TabNavigator";

const WelcomeScreenPlayer = () => {
  return (
    <View style={{ flex: 1 }}>

      <TabNavigator></TabNavigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default WelcomeScreenPlayer;
