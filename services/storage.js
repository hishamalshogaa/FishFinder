import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'RSFF_SPOTS_V1';

export async function loadSpots() {
  try {
    const json = await AsyncStorage.getItem(KEY);
    return json ? JSON.parse(json) : [];
  } catch(e) {
    console.warn('loadSpots error', e);
    return [];
  }
}

export async function saveSpots(spots) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(spots));
  } catch(e) {
    console.warn('saveSpots error', e);
  }
}
