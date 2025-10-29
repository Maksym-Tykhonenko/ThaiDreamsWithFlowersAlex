import { createStackNavigator } from '@react-navigation/stack';
import ThaiDreamsWelcome from '../ThaiDreamsScreens/ThaiDreamsWelcome';
import ThaiDreamsTab from './ThaiDreamsTab';
import ThaiDreamsPlaces from '../ThaiDreamsScreens/ThaiDreamsPlaces';
import ThaiDreamsSaved from '../ThaiDreamsScreens/ThaiDreamsSaved';
import ThaiDreamsPlacesInfo from '../ThaiDreamsScreens/ThaiDreamsPlacesInfo';

const Stack = createStackNavigator();

const ThaiDreamsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ThaiDreamsWelcome" component={ThaiDreamsWelcome} />
      <Stack.Screen name="ThaiDreamsTab" component={ThaiDreamsTab} />
      <Stack.Screen name="ThaiDreamsPlaces" component={ThaiDreamsPlaces} />
      <Stack.Screen name="ThaiDreamsSaved" component={ThaiDreamsSaved} />
      <Stack.Screen
        name="ThaiDreamsPlacesInfo"
        component={ThaiDreamsPlacesInfo}
      />
    </Stack.Navigator>
  );
};

export default ThaiDreamsStack;
