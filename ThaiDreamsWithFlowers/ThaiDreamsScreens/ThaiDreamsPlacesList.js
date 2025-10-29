import ThaiDreamsBackground from '../ThaiDreamsComponents/ThaiDreamsBackground';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useCallback, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { thaiDreamsGradientColors } from '../ThaiDreamsConsts/thaiDreamsColors';
import { thaiDreamsPlacesList } from '../ThaiDreamsConsts/thaiDreamsPlacesList';
import { useStore } from '../ThaiDreamsStore/thaiDreamsContext';

const { height } = Dimensions.get('window');

const ThaiDreamsPlacesList = ({ thaiDreamsScreen }) => {
  const [inputValue, setInputValue] = useState('');
  const nav = useNavigation();
  const { getThaiDreamsPlaces, savedThaiDreamsPlaces } = useStore();

  useFocusEffect(
    useCallback(() => {
      getThaiDreamsPlaces();
    }, []),
  );

  const thaiDreamsPlacesToShow =
    thaiDreamsScreen === 'saved' ? savedThaiDreamsPlaces : thaiDreamsPlacesList;

  const filteredPlaces = thaiDreamsPlacesToShow.filter(place =>
    place.thaidreamstitle.toLowerCase().includes(inputValue.toLowerCase()),
  );

  return (
    <ThaiDreamsBackground>
      <View
        style={[
          styles.thaidreamscontainer,
          thaiDreamsScreen === 'saved' && { paddingBottom: 150 },
        ]}
      >
        {thaiDreamsScreen === 'saved' ? (
          <View style={{ marginBottom: 30, alignItems: 'center' }}>
            <Text style={styles.thaidreamstitle}>Saved places</Text>
          </View>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.thaidreamsbackbtn}
            onPress={() => nav.goBack()}
          >
            <Image source={require('../../assets/images/lotusback.png')} />
            <Text style={styles.thaidreamstitle}>Recommended Place</Text>
          </TouchableOpacity>
        )}
        <LinearGradient
          colors={['#435B40', '#000000']}
          style={[styles.thaidreamswelcgradborders, { marginBottom: 22 }]}
        >
          <TextInput
            style={styles.thaidreamsinput}
            placeholder="Search place"
            placeholderTextColor={'#686868'}
            value={inputValue}
            onChangeText={text => setInputValue(text)}
          />
        </LinearGradient>

        {savedThaiDreamsPlaces.length === 0 && thaiDreamsScreen === 'saved' ? (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.emptythaidreamstext}>No saved place</Text>
          </View>
        ) : null}

        {filteredPlaces.map(place => (
          <LinearGradient
            colors={['#000000', '#435B40']}
            style={styles.thaidreamswelcgradborders}
            key={place.id}
          >
            <View style={[styles.thaidreamswelcomecnt]}>
              <View style={{ width: '90%' }}>
                <Text style={styles.thaidreamswelcometext}>
                  {place.thaidreamstitle}
                </Text>
                <Text style={styles.thaidreamswelcomesectext} numberOfLines={2}>
                  {place.thaidreamsdescription}
                </Text>
              </View>
              <Image
                source={place.thaidreamsimage}
                style={styles.thaidreamsimage}
              />
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() =>
                  nav.navigate('ThaiDreamsPlacesInfo', {
                    place,
                    screen: thaiDreamsScreen,
                  })
                }
              >
                <LinearGradient
                  colors={thaiDreamsGradientColors}
                  start={{ x: 0, y: 0.9 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.thaidreamsgradbutton}
                >
                  <Text style={styles.thaidreamsbuttontext}>Open more</Text>
                </LinearGradient>
              </TouchableOpacity>

              {thaiDreamsScreen === 'saved' && (
                <Image
                  source={require('../../assets/images/lotussavedcrd.png')}
                  style={{ position: 'absolute', top: 14, right: 12 }}
                />
              )}
            </View>
          </LinearGradient>
        ))}
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
    fontSize: 10,
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
    width: 113,
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
    marginBottom: 14,
    width: '100%',
    height: 100,
    borderRadius: 12,
  },
  emptythaidreamstext: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Manrope-Regular',
    textAlign: 'center',
  },
});

export default ThaiDreamsPlacesList;
