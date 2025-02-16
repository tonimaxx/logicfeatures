import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import WeatherMap from "@/features/weathermap/WeatherMap";

const TAB_BAR_HEIGHT = 60; // Adjust this to match your tab bar's height

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <WeatherMap 
        showMarkers={true} 
        isInteractive={true} 
        paddingFactor={1.5} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: Platform.OS === "ios" ? TAB_BAR_HEIGHT : 0,
  },
});

export default HomeScreen;