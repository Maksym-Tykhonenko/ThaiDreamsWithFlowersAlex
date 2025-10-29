import ThaiDreamsBackground from '../ThaiDreamsComponents/ThaiDreamsBackground';
import LinearGradient from 'react-native-linear-gradient';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { thaiDreamsGradientColors } from '../ThaiDreamsConsts/thaiDreamsColors';
import { useStore } from '../ThaiDreamsStore/thaiDreamsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { height } = Dimensions.get('window');

const ThaiDreamsPlacesInfo = ({ route }) => {
  const [isSavedThaiPlace, setIsSavedThaiPlace] = useState(false);
  const [showThaiMap, setShowThaiMap] = useState(false);
  const nav = useNavigation();
  const { place, screen } = route.params;
  const {
    saveThaiDreamsPlace,
    getThaiDreamsPlaces,
    deleteThaiDreamsPlace,
    flowersCollected,
    setFlowersCollected,
  } = useStore();
  const [showThaiLotusPopup, setShowThaiLotusPopup] = useState(false);
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (showThaiLotusPopup) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -200,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }
  }, [showThaiLotusPopup]);

  useFocusEffect(
    useCallback(() => {
      getThaiDreamsPlaces();
      renderSavedPlaces(place);
      handleFlowerCollect(place.id);
    }, []),
  );

  const handleFlowerCollect = async placeId => {
    try {
      const stored = await AsyncStorage.getItem('thaiDreamsCollectedFlowers');
      let collected = stored ? JSON.parse(stored) : [];

      if (!collected.includes(placeId)) {
        collected.push(placeId);
        await AsyncStorage.setItem(
          'thaiDreamsCollectedFlowers',
          JSON.stringify(collected),
        );
        setShowThaiLotusPopup(true);
        setTimeout(() => setShowThaiLotusPopup(false), 3000);
      }

      setFlowersCollected(collected.length);
    } catch (e) {
      console.log('Error saving flower:', e);
    }
  };

  const toggleThaiSavedPlaces = () => {
    if (isSavedThaiPlace)
      deleteThaiDreamsPlace(place), setIsSavedThaiPlace(false);
    else saveThaiDreamsPlace(place), setIsSavedThaiPlace(true);
  };

  const renderSavedPlaces = async item => {
    const jsonValue = await AsyncStorage.getItem('thaiDreamsSavedPlaces');

    const saved = JSON.parse(jsonValue);

    if (saved != null) {
      let filtered = saved.find(fav => fav.id === item.id);

      return filtered == null
        ? setIsSavedThaiPlace(false)
        : setIsSavedThaiPlace(true);
    }
  };

  const shareThaiDreamsPlaceInfo = async () => {
    try {
      await Share.share({
        message: `${place.thaidreamstitle}
${place.thaidreamslatitude}° N ${place.thaidreamslongitude}° W 
${place.thaidreamsdescription}`,
      });
    } catch (error) {
      alert.Alert(error.message);
    }
  };

  return (
    <ThaiDreamsBackground>
      {showThaiLotusPopup && (
        <Animated.View
          style={[
            {
              transform: [{ translateY: slideAnim }],
              zIndex: 20,
            },
          ]}
        >
          <View style={styles.popupContainer}>
            <LinearGradient
              colors={['#000000', '#435B40']}
              style={styles.thaidreamswelcgradborders}
            >
              <View
                style={[
                  styles.thaidreamswelcomecnt,
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingRight: 0,
                    alignItems: 'center',
                  },
                ]}
              >
                <Image
                  source={require('../../assets/images/lotusflower.png')}
                />
                <View style={{ paddingHorizontal: 12, width: '65%' }}>
                  <Text style={styles.thaidreamswelcometext}>
                    {flowersCollected}/15
                  </Text>

                  <Text style={styles.thaidreamspoptext}>
                    You touched beauty, and she responded.
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        </Animated.View>
      )}
      <View style={styles.thaidreamscontainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.thaidreamsbackbtn}
          onPress={() => nav.goBack()}
        >
          <Image source={require('../../assets/images/lotusback.png')} />
          <Text style={styles.thaidreamstitle}>
            {screen === 'saved' ? 'Saved places' : 'Recommended Place'}
          </Text>
        </TouchableOpacity>

        <LinearGradient
          colors={['#000000', '#435B40']}
          style={styles.thaidreamswelcgradborders}
          key={place.id}
        >
          <View style={[styles.thaidreamswelcomecnt]}>
            <View style={{}}>
              <Text style={styles.thaidreamswelcometext}>
                {place.thaidreamstitle}
              </Text>
              <Text style={styles.thaidreamscoordtext}>
                📍Coordinates: {place.thaidreamslatitude},{' '}
                {place.thaidreamslongitude}
              </Text>
              <Text style={styles.thaidreamswelcomesectext}>
                {place.thaidreamsdescription}
              </Text>
            </View>

            {showThaiMap ? (
              <View style={styles.thaidreamsmap}>
                <MapView
                  userInterfaceStyle="dark"
                  style={{ flex: 1 }}
                  provider={Platform.OS === 'ios' ? 'google' : undefined}
                  initialRegion={{
                    latitude: place.thaidreamslatitude,
                    longitude: place.thaidreamslongitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: place.thaidreamslatitude,
                      longitude: place.thaidreamslongitude,
                    }}
                  >
                    {Platform.OS === 'ios' ? (
                      <Image
                        source={require('../../assets/images/lotusmarker.png')}
                      />
                    ) : null}
                  </Marker>
                </MapView>

                <TouchableOpacity
                  style={{ position: 'absolute', top: 10, right: 10 }}
                  onPress={() => setShowThaiMap(false)}
                >
                  <Image
                    source={require('../../assets/images/lotusclose.png')}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <Image
                source={place.thaidreamsimage}
                style={styles.thaidreamsimage}
              />
            )}

            <View
              style={{
                flexDirection: 'row',
                gap: 12,
                flexWrap: 'wrap',
              }}
            >
              {!showThaiMap && (
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => setShowThaiMap(true)}
                >
                  <LinearGradient
                    colors={thaiDreamsGradientColors}
                    start={{ x: 0, y: 0.9 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.thaidreamsgradbutton}
                  >
                    <View style={{ paddingHorizontal: 25 }}>
                      <Text style={styles.thaidreamsbuttontext}>View map</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={toggleThaiSavedPlaces}
              >
                <LinearGradient
                  colors={thaiDreamsGradientColors}
                  start={{ x: 0, y: 0.9 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.thaidreamsgradbutton}
                >
                  <View style={{ paddingHorizontal: 25 }}>
                    {!isSavedThaiPlace ? (
                      <Text style={styles.thaidreamsbuttontext}>
                        Save place
                      </Text>
                    ) : (
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: 12,
                          alignItems: 'center',
                        }}
                      >
                        <Text style={styles.thaidreamsbuttontext}>Saved</Text>
                        <Image
                          source={require('../../assets/images/lotussaved.png')}
                        />
                      </View>
                    )}
                  </View>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={shareThaiDreamsPlaceInfo}
              >
                <LinearGradient
                  colors={thaiDreamsGradientColors}
                  start={{ x: 0, y: 0.9 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.thaidreamsgradbutton}
                >
                  <View style={{ paddingHorizontal: 25 }}>
                    <Text style={styles.thaidreamsbuttontext}>Share</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    </ThaiDreamsBackground>
  );
};

const styles = StyleSheet.create({
  thaidreamscontainer: {
    paddingTop: height * 0.08,
    flex: 1,
    paddingHorizontal: 16,
  },
  thaidreamswelcomecnt: {
    width: '99.5%',
    margin: 1,
    backgroundColor: '#14181D',
    borderRadius: 11,
    padding: 16,
  },
  thaidreamswelcgradborders: {
    borderRadius: 11,
    marginBottom: 16,
  },
  thaidreamswelcometext: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Manrope-SemiBold',
  },
  thaidreamswelcomesectext: {
    color: '#686868',
    fontSize: 12,
    marginTop: 5,
    marginBottom: 25,
    fontFamily: 'Manrope-SemiBold',
  },
  thaidreamsbuttontext: {
    color: '#000',
    fontSize: 12,
    fontFamily: 'Manrope-SemiBold',
  },
  thaidreamsgradbutton: {
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    height: 47,
  },
  thaidreamsrecommendedtext: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Manrope-SemiBold',
    marginTop: 41,
    marginBottom: 12,
  },
  thaidreamstitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Manrope-SemiBold',
  },
  thaidreamsbackbtn: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 30,
  },
  thaidreamsinput: {
    color: '#FFFFFF',
    fontFamily: 'Manrope-Regular',
    width: '99.5%',
    margin: 1,
    backgroundColor: '#14181D',
    borderRadius: 11,
    padding: 25,
    fontSize: 16,
  },
  thaidreamsimage: {
    marginBottom: 24,
    width: '100%',
    height: 185,
    borderRadius: 12,
  },
  thaidreamscoordtext: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Manrope-Bold',
    marginTop: 12,
    marginBottom: 23,
  },
  thaidreamsmap: {
    height: 185,
    width: '100%',
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  popupContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 110 : 100,
    alignSelf: 'center',
    zIndex: 100,
    width: '70%',
  },
  popup: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  popupText: {
    color: '#000',
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
  },
  thaidreamspoptext: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 5,
    fontFamily: 'Manrope-SemiBold',
  },
});

export default ThaiDreamsPlacesInfo;
