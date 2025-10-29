import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useState } from 'react';

export const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const ThaiDreamsContext = ({ children }) => {
  const [savedThaiDreamsPlaces, setSavedThaiDreamsPlaces] = useState([]);
  const [flowersCollected, setFlowersCollected] = useState(0);

  const saveThaiDreamsPlace = async data => {
    try {
      const stored = await AsyncStorage.getItem('thaiDreamsSavedPlaces');
      let places = stored !== null ? JSON.parse(stored) : [];

      const updatedPlaces = [...places, data];

      await AsyncStorage.setItem(
        'thaiDreamsSavedPlaces',
        JSON.stringify(updatedPlaces),
      );
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const getThaiDreamsPlaces = async () => {
    try {
      const savedData = await AsyncStorage.getItem('thaiDreamsSavedPlaces');
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setSavedThaiDreamsPlaces(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteThaiDreamsPlace = async selectedPlaceId => {
    const jsonValue = await AsyncStorage.getItem('thaiDreamsSavedPlaces');
    let data = jsonValue != null ? JSON.parse(jsonValue) : [];

    const filtered = data.filter(item => item.id !== selectedPlaceId.id);

    setSavedThaiDreamsPlaces(filtered);
    await AsyncStorage.setItem(
      'thaiDreamsSavedPlaces',
      JSON.stringify(filtered),
    );
  };

  const value = {
    saveThaiDreamsPlace,
    getThaiDreamsPlaces,
    savedThaiDreamsPlaces,
    deleteThaiDreamsPlace,
    flowersCollected,
    setFlowersCollected,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
