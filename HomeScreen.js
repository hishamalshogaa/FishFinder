import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapViewBathymetry from '../components/MapViewBathymetry';

export default function HomeScreen({ navigation, route }) {
  const [bathyUrl, setBathyUrl] = useState(route?.params?.bathyUrl ?? '');

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (route.params?.bathyUrl) setBathyUrl(route.params.bathyUrl);
    });
    return unsubscribe;
  }, [navigation, route.params?.bathyUrl]);

  return (
    <View style={{ flex: 1 }}>
      <MapViewBathymetry bathyUrl={bathyUrl} />
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Settings', { bathyUrl })}>
        <Text style={styles.btnText}>الإعدادات</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    position: 'absolute', top: 50, right: 20, backgroundColor: '#0a2540',
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12
  },
  btnText: { color: 'white', fontWeight: 'bold' }
});