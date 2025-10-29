import { ImageBackground, ScrollView } from 'react-native';

const ThaiDreamsBackground = ({ children }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/lotusbg.png')}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </ImageBackground>
  );
};

export default ThaiDreamsBackground;
