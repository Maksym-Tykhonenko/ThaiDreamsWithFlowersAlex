import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ThaiDreamsBackground from '../ThaiDreamsComponents/ThaiDreamsBackground';
import LinearGradient from 'react-native-linear-gradient';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { thaiDreamsGradientColors } from '../ThaiDreamsConsts/thaiDreamsColors';

const ThaiDreamsWelcome = () => {
  const [ongoingThaiDreamsSlide, setOngoingThaiDreamsSlide] = useState(0);
  const nav = useNavigation();

  return (
    <ThaiDreamsBackground>
      <View style={styles.thaidreamscontainer}>
        <View style={{ alignItems: 'center' }}>
          {ongoingThaiDreamsSlide === 0 && (
            <Image source={require('../../assets/images/lotusonb1.png')} />
          )}
          {ongoingThaiDreamsSlide === 1 && (
            <Image source={require('../../assets/images/lotusonb2.png')} />
          )}
          {ongoingThaiDreamsSlide === 2 && (
            <Image
              source={require('../../assets/images/lotusonb3.png')}
              style={{ marginBottom: 60 }}
            />
          )}
          {ongoingThaiDreamsSlide === 3 && (
            <Image source={require('../../assets/images/lotusonb4.png')} />
          )}
        </View>
        <LinearGradient
          colors={['#435B40', '#000000']}
          style={styles.thaidreamswelcgradborders}
        >
          <View style={styles.thaidreamswelcomecnt}>
            <Text style={styles.thaidreamswelcometext}>
              {ongoingThaiDreamsSlide === 0 &&
                'Discover the beauty of Thailand'}
              {ongoingThaiDreamsSlide === 1 && 'Explore the places of flowers'}
              {ongoingThaiDreamsSlide === 2 && 'Collect lotuses'}
              {ongoingThaiDreamsSlide === 3 && 'Feel the scent of legends'}
            </Text>
            <Text style={styles.thaidreamswelcomesectext}>
              {ongoingThaiDreamsSlide === 0 &&
                `Lina Arun welcomes you to a world where every flower has a soul.
Here, the sun blooms with lotuses, and colors become the language of nature.
Prepare to see the country with eyes that remember the smell of the morning.`}
              {ongoingThaiDreamsSlide === 1 &&
                `Travel through fields, gardens, and temples where flowering is part of tradition.
Learn the history of each place, find new corners, mark them on the map — and create your own floral route.`}
              {ongoingThaiDreamsSlide === 2 &&
                `For each place you visit, you receive a lotus — a symbol of memory.
Collect them in a collection and discover the gifts of nature: unique wallpapers inspired by the real colors of Thailand.`}
              {ongoingThaiDreamsSlide === 3 &&
                `Every day a new legend about a Thai flower awaits you —
where beauty intertwines with myths, and love blooms even in the rain.`}
            </Text>

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                if (ongoingThaiDreamsSlide < 3) {
                  setOngoingThaiDreamsSlide(ongoingThaiDreamsSlide + 1);
                } else {
                  nav.navigate('ThaiDreamsTab');
                }
              }}
            >
              <LinearGradient
                colors={thaiDreamsGradientColors}
                start={{ x: 0, y: 0.9 }}
                end={{ x: 1, y: 1 }}
                style={styles.thaidreamsgradbutton}
              >
                <Text style={styles.thaidreamsbuttontext}>
                  {ongoingThaiDreamsSlide === 0 && 'Continue'}
                  {ongoingThaiDreamsSlide === 1 && 'Next'}
                  {ongoingThaiDreamsSlide === 2 && 'Okay'}
                  {ongoingThaiDreamsSlide === 3 && 'Start now'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </ThaiDreamsBackground>
  );
};

const styles = StyleSheet.create({
  thaidreamscontainer: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  thaidreamswelcomecnt: {
    width: '99.5%',
    margin: 1,
    backgroundColor: '#080B0E',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 40,
  },
  thaidreamswelcgradborders: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  thaidreamswelcometext: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Manrope-SemiBold',
  },
  thaidreamswelcomesectext: {
    color: '#FFFFFF',
    fontSize: 15,
    marginTop: 24,
    marginBottom: 25,
    fontFamily: 'Manrope-SemiBold',
  },
  thaidreamsbuttontext: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Manrope-SemiBold',
  },
  thaidreamsgradbutton: {
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    height: 67,
    width: 170,
  },
});

export default ThaiDreamsWelcome;
