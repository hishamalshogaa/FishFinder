import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, UrlTile } from 'react-native-maps';
import useLocation from '../hooks/useLocation';
import { loadSpots, saveSpots } from '../services/storage';

/**
 * This component uses react-native-maps and lets you add custom raster tiles.
 * Default overlays:
 *  - OpenSeaMap seamarks
 *  - Configurable Bathymetry tile URL (user editable in Settings screen)
 */
export default function MapViewBathymetry({ bathyUrl }) {
  const { location } = useLocation();
  const [region, setRegion] = useState({
    latitude: 20.5,
    longitude: 38.5,
    latitudeDelta: 3,
    longitudeDelta: 3,
  });
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    (async () => setSpots(await loadSpots()))();
  }, []);

  useEffect(() => {
    if (location?.coords) {
      setRegion(r => ({
        ...r,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      }));
    }
  }, [location]);

  const addSpot = async (coord) => {
    const newSpot = { id: Date.now().toString(), ...coord };
    const next = [...spots, newSpot];
    setSpots(next);
    await saveSpots(next);
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        onLongPress={e => addSpot(e.nativeEvent.coordinate)}
      >
        {/* Base map tiles are provided by the provider */}

        {/* OpenSeaMap seamarks (useful nautical features). */}
        <UrlTile
          urlTemplate="https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png"
          zIndex={2}
          maximumZ={18}
          tileSize={256}
        />

        {/* Optional bathymetry overlay. Make sure the URL returns 256x256 PNG tiles. */}
        {bathyUrl ? (
          <UrlTile
            urlTemplate={bathyUrl}
            zIndex={1}
            maximumZ={12}
            tileSize={256}
            opacity={0.7}
          />
        ) : null}

        {/* Saved fishing spots */}
        {spots.map(s => (
          <Marker
            key={s.id}
            coordinate={{ latitude: s.latitude, longitude: s.longitude }}
            title={'Spot ' + s.id.slice(-4)}
            description={'Long-press on map to add spots'}
          />
        ))}
      </MapView>

      <View style={styles.hint}>
        <Text style={styles.hintText}>اضغط مطوّلًا لإضافة نقطة صيد. افتح "الإعدادات" لتغيير رابط طبقة الأعماق.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hint: {
    position: 'absolute', bottom: 16, left: 16, right: 16, padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 10
  },
  hintText: { color: '#fff', textAlign: 'center', fontSize: 12 }
});