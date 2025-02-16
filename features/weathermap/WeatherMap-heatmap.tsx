import React, { useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT, Heatmap } from "react-native-maps";
import { WEATHER_DATA } from "./data";

interface WeatherMapProps {
  showMarkers?: boolean;
  showHeatmap?: boolean;
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
  showHeatmap = false,
  paddingFactor = 1.5,
  isInteractive = true,
}) => {
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(calculateRegion(paddingFactor), 1000);
    }
  }, [paddingFactor]);

  // Prepare heatmap points
  const heatmapPoints = WEATHER_DATA.timestamps[0].data.map(city => ({
    latitude: city.latitude,
    longitude: city.longitude,
    // Use the temperature (converted to Celsius) as weight
    weight: city.temperature - 273.15,
  }));

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE} // Ensure you're using Google Maps for heatmap support
        style={styles.map}
        initialRegion={calculateRegion(paddingFactor)}
        scrollEnabled={isInteractive}
        zoomEnabled={isInteractive}
        rotateEnabled={isInteractive}
        pitchEnabled={isInteractive}
      >
        {showHeatmap && (
          <Heatmap
            points={heatmapPoints}
            radius={50} // Adjust radius as needed (in pixels)
            opacity={0.7}
            gradient={{
              colors: ["#00FFFF", "#0000FF", "#FF0000"],
              startPoints: [0.01, 0.25, 0.5],
              colorMapSize: 256,
            }}
          />
        )}

        {showMarkers &&
          WEATHER_DATA.timestamps[0].data.map((city, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: city.latitude, longitude: city.longitude }}
              title={city.city}
              description={`${Math.round(city.temperature - 273.15)}°C, ${city.condition}`}
            />
          ))
        }
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});

export default WeatherMap;