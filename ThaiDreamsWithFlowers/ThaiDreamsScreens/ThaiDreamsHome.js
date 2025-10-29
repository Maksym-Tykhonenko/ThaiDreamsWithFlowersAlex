import {
  Dimensions,
  Image,
  Platform,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ThaiDreamsBackground from '../ThaiDreamsComponents/ThaiDreamsBackground';
import LinearGradient from 'react-native-linear-gradient';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { thaiDreamsGradientColors } from '../ThaiDreamsConsts/thaiDreamsColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { thaiDreamsStories as stories } from '../ThaiDreamsConsts/thaiDreamsStories';
const { height } = Dimensions.get('window');

const ThaiDreamsHome = () => {
  const [dailyThaiLotusStory, setDailyThaiLotusStory] = useState(null);
  const [showMainScreen, setShowMainScreen] = useState(false);
  const nav = useNavigation();

  useEffect(() => {
    checkDailyLotusStory();
  }, []);

  const checkDailyLotusStory = async () => {
    try {
      const lastShown = await AsyncStorage.getItem(
        'daily_lotus_story_last_shown',
      );
      const storyIndex = await AsyncStorage.getItem('daily_lotus_story_index');
      const now = Date.now();

      if (
        !lastShown ||
        now - Number(lastShown) > 24 * 60 * 60 * 1000 ||
        storyIndex === null
      ) {
        const randomIndex = Math.floor(Math.random() * stories.length);
        setDailyThaiLotusStory(stories[randomIndex]);
        await AsyncStorage.setItem(
          'daily_lotus_story_last_shown',
          now.toString(),
        );
        await AsyncStorage.setItem(
          'daily_lotus_story_index',
          randomIndex.toString(),
        );
      } else {
        setDailyThaiLotusStory(stories[Number(storyIndex)]);
        setShowMainScreen(true);
      }
    } catch (e) {
      console.log('Error reading daily story', e);
      setShowMainScreen(true);
    }
  };

  const closeDailyLotusStory = () => {
    setShowMainScreen(true);
  };

  const openDailyLotusStory = () => {
    setShowMainScreen(false);
  };

  const shareLotusLegend = async () => {
    try {
      await Share.share({
        message: `${dailyThaiLotusStory.title}
${dailyThaiLotusStory.subtitle}`,
      });
    } catch (error) {
      alert.Alert(error.message);
    }
  };

  if (dailyThaiLotusStory && !showMainScreen) {
    return (
      <ThaiDreamsBackground>
        <View style={styles.lotuscardcontainer}>
          <LinearGradient
            colors={['#000000', '#435B40']}
            style={styles.thaidreamswelcgradborders}
          >
            <View style={[styles.thaidreamswelcomecnt]}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Text style={styles.thaidreamswelcometext}>
                    New day - new legend:
                  </Text>

                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={closeDailyLotusStory}
                  >
                    <Image
                      source={require('../../assets/images/lotuscls.png')}
                    />
                  </TouchableOpacity>
                </View>
                <Image
                  source={dailyThaiLotusStory.image}
                  style={{
                    marginBottom: 14,
                    width: '100%',
                    height: 180,
                    borderRadius: 12,
                    marginTop: 32,
                  }}
                />
                <Text style={[styles.thaidreamswelcometext, { fontSize: 20 }]}>
                  {dailyThaiLotusStory.title}
                </Text>
                <Text style={styles.thaidreamscardsbt}>
                  {dailyThaiLotusStory.subtitle}
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => shareLotusLegend()}
              >
                <LinearGradient
                  colors={thaiDreamsGradientColors}
                  start={{ x: 0, y: 0.9 }}
                  end={{ x: 1, y: 1 }}
                  style={[
                    styles.thaidreamsgradbutton,
                    { width: 170, height: 67 },
                  ]}
                >
                  <Text style={[styles.thaidreamsbuttontext, { fontSize: 16 }]}>
                    Share legend
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </ThaiDreamsBackground>
    );
  }

  return (
    <ThaiDreamsBackground>
      <View style={styles.thaidreamscontainer}>
        <View style={{ alignItems: 'center' }}>
          {Platform.OS === 'ios' ? (
            <Image
              source={require('../../assets/images/lotushomelogo.png')}
              style={{ marginBottom: 26 }}
            />
          ) : (
            <Image
              source={require('../../assets/images/dreamingandricon.png')}
              style={{
                marginBottom: 26,
                width: 70,
                height: 70,
                borderRadius: 12,
              }}
            />
          )}
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
                alignItems: 'center',
              },
            ]}
          >
            <View>
              <View
                style={{
                  width: '65%',
                }}
              >
                <Text style={[styles.thaidreamswelcometext]}>
                  {dailyThaiLotusStory?.title}
                </Text>
                <Text style={styles.thaidreamswelcomesectext} numberOfLines={2}>
                  {dailyThaiLotusStory?.subtitle}
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.6}
                onPress={openDailyLotusStory}
              >
                <LinearGradient
                  colors={thaiDreamsGradientColors}
                  start={{ x: 0, y: 0.9 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.thaidreamsgradbutton}
                >
                  <Text style={styles.thaidreamsbuttontext}>Read again</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <Image
              source={dailyThaiLotusStory?.image}
              style={{
                width: 120,
                height: 100,
                borderRadius: 12,
              }}
            />
          </View>
        </LinearGradient>

        <Text style={styles.thaidreamsrecommendedtext}>Recommended Place</Text>

        <LinearGradient
          colors={['#000000', '#435B40']}
          style={styles.thaidreamswelcgradborders}
        >
          <View style={[styles.thaidreamswelcomecnt]}>
            <View style={{ width: '90%' }}>
              <Text style={styles.thaidreamswelcometext}>
                Chiang Mai Royal Flora Gardens
              </Text>
              <Text style={styles.thaidreamswelcomesectext}>
                The Royal Flora Gardens are a royal space, where each area is
                created as a poem.
              </Text>
            </View>
            <Image
              source={require('../../assets/images/lotusplace1.png')}
              style={{
                marginBottom: 14,
                width: '100%',
                height: 100,
                borderRadius: 12,
              }}
            />
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => nav.navigate('ThaiDreamsPlaces')}
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
  },
  thaidreamswelcometext: {
    color: '#FFFFFF',
    fontSize: 18,
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
  dailyStoryCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  dailyStoryTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: 'Manrope-SemiBold',
    marginTop: 10,
  },
  dailyStorySubtitle: {
    color: '#686868',
    fontSize: 12,
    marginBottom: 10,
    fontFamily: 'Manrope-SemiBold',
  },
  dailyStoryContent: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
  },
  thaidreamscardsbt: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 20,
    fontFamily: 'Manrope-Regular',
    marginTop: 12,
  },
  lotuscardcontainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 150,
  },
});

export default ThaiDreamsHome;
