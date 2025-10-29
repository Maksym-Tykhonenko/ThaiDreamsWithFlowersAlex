import ThaiDreamsBackground from '../ThaiDreamsComponents/ThaiDreamsBackground';
import LinearGradient from 'react-native-linear-gradient';
import { thaiDreamsGradientColors } from '../ThaiDreamsConsts/thaiDreamsColors';
import { useStore } from '../ThaiDreamsStore/thaiDreamsContext';
import { useFocusEffect } from '@react-navigation/native';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCallback, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import { captureRef } from 'react-native-view-shot';

const { height } = Dimensions.get('window');

const ThaiDreamsLotusGarden = () => {
  const { setFlowersCollected } = useStore();
  const [collectedFlowers, setCollectedFlowers] = useState([]);
  const [wallpaperUnlocked, setWallpaperUnlocked] = useState(false);
  const [showWallpaper, setShowWallpaper] = useState(false);
  const [wallpaperAlreadyOpened, setWallpaperAlreadyOpened] = useState(false);
  const imageRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      loadCollectedFlowers();
    }, []),
  );

  const loadCollectedFlowers = async () => {
    const stored = await AsyncStorage.getItem('thaiDreamsCollectedFlowers');
    const collected = stored ? JSON.parse(stored) : [];
    setCollectedFlowers(collected);
    setFlowersCollected(collected.length);

    if (collected.length >= 15) {
      await AsyncStorage.setItem('thaiDreamsWallpaperUnlocked', 'true');
      setWallpaperUnlocked(true);
    }

    const opened = await AsyncStorage.getItem('thaiDreamsWallpaperOpened');
    if (opened === 'true') {
      setWallpaperAlreadyOpened(true);
    }
  };

  const handleOpenLotusWallpaper = async () => {
    setShowWallpaper(true);
    await AsyncStorage.setItem('thaiDreamsWallpaperOpened', 'true');
    setWallpaperAlreadyOpened(true);
  };

  const shareThaiLotusWallpaper = async () => {
    try {
      const tmpUri = await captureRef(imageRef, {
        format: 'png',
        quality: 1,
        result: 'tmpfile',
      });

      let fileUri = tmpUri.startsWith('file://') ? tmpUri : 'file://' + tmpUri;
      const pathToCheck = fileUri.replace('file://', '');
      const exists = await RNFS.exists(pathToCheck);
      if (!exists) return;

      await Share.open({
        title: 'Wallpaper from Thai Dreams with Flowers',
        url: fileUri,
        type: 'image/png',
        failOnCancel: false,
      });
    } catch (error) {
      if (!error?.message?.includes('User did not share')) {
        console.error('shareWallpaper error', error);
      }
    }
  };

  const allLotusesCollected = collectedFlowers.length >= 15;

  return (
    <ThaiDreamsBackground>
      <View style={styles.thaidreamscontainer}>
        {!showWallpaper ? (
          <>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.thaidreamsrecommendedtext}>
                My Lotus Garden
              </Text>
            </View>

            {allLotusesCollected && !wallpaperAlreadyOpened ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleOpenLotusWallpaper}
              >
                <LinearGradient
                  colors={thaiDreamsGradientColors}
                  start={{ x: 0, y: 0.9 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.thaidreamsgradrescontopened}
                >
                  <View>
                    <Text style={styles.thaidreamsbuttontext}>
                      Exchange lotuses for wallpaper
                    </Text>
                    <Image
                      source={require('../../assets/images/minilotus.png')}
                      style={{ position: 'absolute', right: 60, top: -40 }}
                    />
                    <Image
                      source={require('../../assets/images/minilotus.png')}
                      style={{ position: 'absolute', right: -10, top: 40 }}
                    />
                    <Image
                      source={require('../../assets/images/minilotus.png')}
                      style={{ position: 'absolute', left: 40, top: 40 }}
                    />
                    <Image
                      source={require('../../assets/images/minilotus.png')}
                      style={{ position: 'absolute', left: -10, top: -40 }}
                    />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <LinearGradient
                colors={['#000000', '#435B40']}
                style={styles.thaidreamswelcgradborders}
              >
                <View
                  style={[
                    styles.thaidreamswelcomecnt,
                    {
                      flexDirection: 'row',
                      paddingBottom: 0,
                      paddingRight: 0,
                      alignItems: 'center',
                    },
                  ]}
                >
                  <View style={{ width: '60%' }}>
                    <Text style={styles.thaidreamswelcometext}>
                      {wallpaperAlreadyOpened
                        ? 'Lotuses have been exchanged for wallpapers!'
                        : 'This is your personal gallery of memories. Each lotus here is a flower received for a place visited or a legend discovered.'}
                    </Text>
                    {wallpaperAlreadyOpened && (
                      <Image
                        source={require('../../assets/images/lotusex.png')}
                        style={{ marginTop: 12 }}
                      />
                    )}
                  </View>
                  <Image
                    source={require('../../assets/images/lotusgallery.png')}
                    style={{ right: -10 }}
                  />
                </View>
              </LinearGradient>
            )}

            <LinearGradient
              colors={['#000000', '#435B40']}
              style={styles.thaidreamswelcgradborders}
            >
              <View style={styles.thaidreamswelcomecnt}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 10,
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={styles.thaidreamscollectedtext}>
                    Lotuses collected:
                  </Text>
                  <Text style={styles.thaidreamscollectedtext}>
                    {collectedFlowers.length} / 15
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: '100%',
                  }}
                >
                  {Array.from({ length: 15 }).map((_, index) => {
                    const placeId = (index + 1).toString();
                    const isCollected = collectedFlowers.includes(placeId);
                    return (
                      <View
                        key={index}
                        style={[
                          styles.thaiFlowerBox,
                          isCollected && { borderColor: '#FFF' },
                        ]}
                      >
                        <Image
                          source={
                            isCollected
                              ? require('../../assets/images/lotusunlocked.png')
                              : require('../../assets/images/lotusulocked.png')
                          }
                        />
                      </View>
                    );
                  })}
                </View>
              </View>
            </LinearGradient>
          </>
        ) : (
          // Отображаем открытую обойку
          <View style={styles.wallpaperContainer}>
            <Text style={styles.lotusextitle}>Exchanged!</Text>
            <View ref={imageRef} collapsable={false} style={{ width: '100%' }}>
              <Image
                source={require('../../assets/images/lotuswallp.png')}
                style={styles.wallpaperImage}
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={shareThaiLotusWallpaper}
            >
              <LinearGradient
                colors={thaiDreamsGradientColors}
                start={{ x: 0, y: 0.9 }}
                end={{ x: 1, y: 1 }}
                style={[
                  styles.thaidreamsgradrescont,
                  { marginTop: 10, width: 87, height: 47 },
                ]}
              >
                <Text style={[styles.thaidreamsbuttontext, { fontSize: 12 }]}>
                  Share
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
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
    lineHeight: 18,
  },
  thaidreamsbuttontext: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Manrope-SemiBold',
  },
  thaidreamsgradrescont: {
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    height: 67,
    width: 200,
  },
  thaidreamsgradrescontopened: {
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    height: 158,
    width: '100%',
    marginBottom: 15,
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
  },
  thaiFlowerBox: {
    width: 50,
    height: 50,
    margin: 9,
    justifyContent: 'center',
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#686868',
    alignItems: 'center',
  },
  wallpaperContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  wallpaperImage: {
    width: '100%',
    height: 450,
    borderRadius: 12,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  lotusextitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Manrope-SemiBold',
    marginBottom: 39,
  },
  thaidreamscollectedtext: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Manrope-SemiBold',
  },
});

export default ThaiDreamsLotusGarden;
