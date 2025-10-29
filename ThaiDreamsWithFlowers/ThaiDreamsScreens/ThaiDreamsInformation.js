import ThaiDreamsBackground from '../ThaiDreamsComponents/ThaiDreamsBackground';
import LinearGradient from 'react-native-linear-gradient';
import {
  Dimensions,
  Image,
  Linking,
  Platform,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { thaiDreamsGradientColors } from '../ThaiDreamsConsts/thaiDreamsColors';

const { height } = Dimensions.get('window');

const ThaiDreamsInformation = () => {
  const shareThaiDreamsInfo = async () => {
    try {
      await Share.share({
        message: `Together with guide Lina Arun, you will discover places where nature speaks in colors and legends come to life in petals.
Collect lotuses, discover stories, breathe in beauty - and every day will become a little brighter.`,
      });
    } catch (error) {
      alert.Alert(error.message);
    }
  };

  return (
    <ThaiDreamsBackground>
      <View style={styles.thaidreamscontainer}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.thaidreamsrecommendedtext}>Information</Text>
        </View>
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
                alignItems: 'center',
              },
            ]}
          >
            <View style={{ width: '50%' }}>
              {Platform.OS === 'ios' ? (
                <Text style={styles.thaidreamswelcometext}>
                  “Dreaming Thai with Flowers” ​​is your journey into the heart
                  of blooming Thailand.
                </Text>
              ) : (
                <Text style={styles.thaidreamswelcometext}>
                  “Luxury Thai Dreams” ​​is your journey into the heart of
                  blooming Thailand.
                </Text>
              )}
            </View>

            {Platform.OS === 'ios' ? (
              <Image
                source={require('../../assets/images/ThaiDreamsInformation.png')}
              />
            ) : (
              <Image
                source={require('../../assets/images/dreamingandricon.png')}
                style={{
                  width: 112,
                  height: 112,
                  borderRadius: 32,
                }}
              />
            )}
          </View>
        </LinearGradient>

        <LinearGradient
          colors={['#000000', '#435B40']}
          style={styles.thaidreamswelcgradborders}
        >
          <View
            style={[
              styles.thaidreamswelcomecnt,
              {
                flexDirection: 'row',
                paddingBottom: 10,
                paddingRight: 0,
                alignItems: 'center',
              },
            ]}
          >
            <View style={{ width: '55%' }}>
              <Text style={styles.thaidreamswelcometext}>
                Together with guide Lina Arun, you will discover places where
                nature speaks in colors and legends come to life in petals.
                Collect lotuses, discover stories, breathe in beauty - and every
                day will become a little brighter.
              </Text>
            </View>
            <Image
              source={require('../../assets/images/lotusinfoimg.png')}
              style={{ bottom: -10 }}
            />
          </View>
        </LinearGradient>

        <View style={styles.thaidreamsbtnswrap}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => shareThaiDreamsInfo()}
          >
            <LinearGradient
              colors={thaiDreamsGradientColors}
              start={{ x: 0, y: 0.9 }}
              end={{ x: 1, y: 1 }}
              style={styles.thaidreamsgradbutton}
            >
              <Text style={styles.thaidreamsbuttontext}>Share</Text>
            </LinearGradient>
          </TouchableOpacity>
          {Platform.OS === 'ios' && (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() =>
                Linking.openURL(
                  'https://apps.apple.com/us/app/thai-dreams-with-flowers/id6754329661',
                )
              }
            >
              <LinearGradient
                colors={thaiDreamsGradientColors}
                start={{ x: 0, y: 0.9 }}
                end={{ x: 1, y: 1 }}
                style={styles.thaidreamsgradbutton}
              >
                <Text style={styles.thaidreamsbuttontext}>Rate app</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ThaiDreamsBackground>
  );
};

const styles = StyleSheet.create({
  thaidreamscontainer: {
    paddingTop: height * 0.08,
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 150,
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
    marginBottom: 11,
  },
  thaidreamswelcometext: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Manrope-Medium',
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
    width: 172,
  },
  thaidreamsrecommendedtext: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Manrope-SemiBold',
    marginBottom: 33,
  },
  thaidreamsbtnswrap: {
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
  },
});

export default ThaiDreamsInformation;
