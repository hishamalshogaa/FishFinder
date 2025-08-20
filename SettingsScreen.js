import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function SettingsScreen({ navigation, route }) {
  const [bathyUrl, setBathyUrl] = useState(route?.params?.bathyUrl ?? '');

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: 'الإعدادات' });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>رابط طبقة الأعماق (Tile URL)</Text>
      <TextInput
        placeholder="مثال: https://.../{z}/{x}/{y}.png"
        value={bathyUrl}
        onChangeText={setBathyUrl}
        style={styles.input}
        autoCapitalize="none"
      />
      <Text style={styles.note}>
        ملاحظة: يجب أن يكون الرابط من خادم يُرجع صور مربعات 256×256. يمكنك تجربة مصادر
        عامة مثل خدمات GEBCO/NOAA (WMTS/tiles) إن توفرت لديك الروابط.
      </Text>
      <Text style={styles.save} onPress={() => navigation.navigate('Home', { bathyUrl })}>
        حفظ والعودة
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontWeight: 'bold', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8 },
  note: { marginTop: 12, color: '#555' },
  save: { marginTop: 24, backgroundColor: '#0a2540', color: '#fff', textAlign: 'center', padding: 12, borderRadius: 10 }
});