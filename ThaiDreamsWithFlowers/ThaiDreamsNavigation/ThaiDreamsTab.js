import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Platform, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ThaiDreamsSaved from '../ThaiDreamsScreens/ThaiDreamsSaved';
import ThaiDreamsLotusGarden from '../ThaiDreamsScreens/ThaiDreamsLotusGarden';
import ThaiDreamsInformation from '../ThaiDreamsScreens/ThaiDreamsInformation';
import ThaiDreamsHome from '../ThaiDreamsScreens/ThaiDreamsHome';

const Tab = createBottomTabNavigator();

const ThaiDreamsTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.thaidreaamstabbar,
        tabBarIconStyle: styles.tabBarIcon,
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#A3A3A3',
        tabBarBackground: () => (
          <View style={{ flex: 1 }}>
            <LinearGradient
              colors={['#435B40', '#000000']}
              style={styles.thaidreaamsbg}
            >
              <LinearGradient
                colors={['#080B0E', '#080B0E']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.thaidreaamstabborder}
              ></LinearGradient>
            </LinearGradient>
          </View>
        ),
      }}
    >
      <Tab.Screen
        name="ThaiDreamsHome"
        component={ThaiDreamsHome}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.thaidreaamsoutline,
                focused && { borderColor: '#fff' },
              ]}
            >
              <Image
                source={require('../../assets/images/home.png')}
                style={{ tintColor: color }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ThaiDreamsSaved"
        component={ThaiDreamsSaved}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.thaidreaamsoutline,
                focused && { borderColor: '#fff' },
              ]}
            >
              <Image
                source={require('../../assets/images/saved.png')}
                style={{ tintColor: color }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ThaiDreamsLotusGarden"
        component={ThaiDreamsLotusGarden}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.thaidreaamsoutline,
                focused && { borderColor: '#fff' },
              ]}
            >
              <Image
                source={require('../../assets/images/lotus.png')}
                style={{ tintColor: color }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ThaiDreamsInformation"
        component={ThaiDreamsInformation}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.thaidreaamsoutline,
                focused && { borderColor: '#fff' },
              ]}
            >
              <Image
                source={require('../../assets/images/info.png')}
                style={{ tintColor: color }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  thaidreaamsbg: { height: 150, borderRadius: 24 },
  thaidreaamstabborder: {
    height: 150,
    padding: 1,
    margin: Platform.OS === 'android' && 1,
    borderRadius: 22,
  },
  thaidreaamstabbar: {
    paddingTop: 50,
    paddingHorizontal: 40,
    elevation: 0,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 60,
    borderTopWidth: 0,
    backgroundColor: 'transparent',
    paddingBottom: Platform.OS === 'ios' ? 2 : 22,
  },
  thaidreaamsoutline: {
    padding: 13,
    borderWidth: 1,
    borderRadius: 11,
  },
});

export default ThaiDreamsTab;
