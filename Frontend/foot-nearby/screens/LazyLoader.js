import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const LazyLoader = () => (
  <View style={styles.container}>
    <Text>Loading...</Text>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LazyLoader;