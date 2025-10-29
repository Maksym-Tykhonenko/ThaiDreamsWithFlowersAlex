import React from 'react';
import { WebView } from 'react-native-webview';
import ThaiDreamsBackground from './ThaiDreamsBackground';

const htmlFlowerLoader = `
 <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Flower Loader</title>
<style>
  body, html {
    height: 100%;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
  }

  .flower {
    width: 300px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    animation: rotateFlower 8s infinite ease;
  }

  .petal {
    position: absolute;
    width: 35px;
    height: 60px;
    background: linear-gradient(180deg, #fcdbdf, #fd688d);
    border-radius: 50%;
    animation: changeColor 8s infinite alternate;
  }

  .petal1 { transform: rotate(0deg) translateY(-50%); animation-delay: 0.1s; }
  .petal2 { transform: rotate(45deg) translateY(-50%); animation-delay: 0.2s; }
  .petal3 { transform: rotate(90deg) translateY(-50%); animation-delay: 0.3s; }
  .petal4 { transform: rotate(135deg) translateY(-50%); animation-delay: 0.4s; }
  .petal5 { transform: rotate(180deg) translateY(-50%); animation-delay: 0.5s; }
  .petal6 { transform: rotate(225deg) translateY(-50%); animation-delay: 0.6s; }
  .petal7 { transform: rotate(270deg) translateY(-50%); animation-delay: 0.7s; }
  .petal8 { transform: rotate(315deg) translateY(-50%); animation-delay: 0.8s; }

  .center {
    position: absolute;
    width: 30px;
    height: 30px;
    background-color: #f1d2d2;
    border-radius: 50%;
  }

  @keyframes changeColor {
    0% { background: linear-gradient(180deg, #fcdbdf, #fd688d); }
    25% { background: linear-gradient(180deg, #fcd2e3, #fa6094); }
    50% { background: linear-gradient(180deg, #fabefc, #c34ec7); }
    75% { background: linear-gradient(180deg, #f7d6d6, #fd6a6a); }
    100% { background: linear-gradient(180deg, #fcd3fc, #e844f7); }
  }

  @keyframes rotateFlower {
    0% { transform: scale(1) rotate(0deg); }
    50% { transform: scale(1.5) rotate(360deg); }
    100% { transform: scale(1) rotate(0deg); }
  }
</style>
</head>
<body>
  <div class="flower">
    <div class="petal petal1"></div>
    <div class="petal petal2"></div>
    <div class="petal petal3"></div>
    <div class="petal petal4"></div>
    <div class="petal petal5"></div>
    <div class="petal petal6"></div>
    <div class="petal petal7"></div>
    <div class="petal petal8"></div>
    <div class="center"></div>
  </div>
</body>
</html>
  `;

const ThaiDreamsLoader = () => {
  return (
    <ThaiDreamsBackground>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlFlowerLoader }}
        style={{ backgroundColor: 'transparent' }}
        scrollEnabled={false}
      />
    </ThaiDreamsBackground>
  );
};

export default ThaiDreamsLoader;
