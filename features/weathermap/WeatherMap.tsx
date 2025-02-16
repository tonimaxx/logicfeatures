import React, { useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { WEATHER_DATA } from "./data";

interface WeatherMapProps {
  showMarkers?: boolean;
  paddingFactor?: number;
  isInteractive?: boolean;
}

const calculateRegion = (paddingFactor = 1.8) => {
  const latitudes = WEATHER_DATA.timestamps[0].data.map(city => city.latitude);
  const longitudes = WEATHER_DATA.timestamps[0].data.map(city => city.longitude);

  const minLat = Math.min(...latitudes);
  const maxLat = Math.max(...latitudes);
  const minLng = Math.min(...longitudes);
  const maxLng = Math.max(...longitudes);

  return {
    latitude: (minLat + maxLat) / 2,
    longitude: (minLng + maxLng) / 2,
    latitudeDelta: (maxLat - minLat) * paddingFactor,
    longitudeDelta: (maxLng - minLng) * paddingFactor,
  };
};

const WeatherMap: React.FC<WeatherMapProps> = ({ 
  showMarkers = true, 
  paddingFactor = 1.5,
  isInteractive = true,
}) => {
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(calculateRegion(paddingFactor), 1000);
    }
  }, [paddingFactor]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        initialRegion={calculateRegion(paddingFactor)}
        scrollEnabled={isInteractive}
        zoomEnabled={isInteractive}
        rotateEnabled={isInteractive}
        pitchEnabled={isInteractive}
      >
        {showMarkers && WEATHER_DATA.timestamps[0].data.map((city, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: city.latitude, longitude: city.longitude }}
            title={city.city}
            description={`${Math.round(city.temperature - 273.15)}°C, ${city.condition}`}
          />
        ))}
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
});

export default WeatherMap;