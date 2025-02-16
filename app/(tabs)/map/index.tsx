import React, { useState, useRef } from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView, { Circle, Marker, PROVIDER_DEFAULT } from "react-native-maps";

const AdjustableCircleMap: React.FC = () => {
  const [circleColor] = useState("rgba(255, 0, 0, 0.3)");
  const [strokeColor] = useState("rgba(0, 0, 255, 0.5)");
  const mapRef = useRef<MapView>(null);

  const initialRegion = {
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  // For demo, we set a static temperature value.
  const temperature = 25; // in °C

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        initialRegion={initialRegion}
      >
        <Circle
          center={{ latitude: 37.7749, longitude: -122.4194 }}
          radius={1000} // radius in meters
          strokeColor={strokeColor}
          fillColor={circleColor}
        />
        <Marker
          coordinate={{ latitude: 37.7749, longitude: -122.4194 }}
          anchor={{ x: 0.5, y: 0.5 }} // Center the custom view at the coordinate
        >
          <View style={styles.centerTextContainer}>
            <Text style={styles.centerText}>{temperature}°C</Text>
          </View>
        </Marker>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  centerTextContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    // Ensure the view is sized appropriately
    minWidth: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  centerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
});

export default AdjustableCircleMap;