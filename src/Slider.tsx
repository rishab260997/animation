import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import RadialGradient from 'react-native-radial-gradient';
import {DURATION, SCREEN} from './Constants';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const SUN = require('./assets/sun.png');
const MOON = require('./assets/moon.png');

const Dashboard = () => {
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);
  const bgColor = useSharedValue('white');
  const flexValA = useSharedValue(1);
  const flexValB = useSharedValue(0.1);

  const [slider, setSlider] = useState(false);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: positionX.value}, {translateY: positionY.value}],
    };
  });

  const animatedContainer = useAnimatedStyle(() => {
    return {
      backgroundColor: bgColor.value,
    };
  });

  const animatedImageA = useAnimatedStyle(() => ({
    flex: flexValA.value,
    display: flexValA.value ===0.1 ? "none" : "flex",
  }));
  
  const animatedImageB = useAnimatedStyle(() => ({
    flex: flexValB.value,
    display: flexValB.value ===0.1 ? "none" : "flex",
  }));

  console.log(
    'SUN==>',
    flexValA.value,
    'asdfghjkl',
    flexValB.value,
    '<== MOON',
  );
  const moveView = () => {
    if (!slider) {
      setSlider(true);
      flexValA.value = withTiming(0.1, {duration: DURATION / 2});
      flexValB.value = withTiming(1, {duration: DURATION / 2});
      positionX.value = withTiming(385, {duration: DURATION});
      bgColor.value = withTiming('black', {duration: DURATION});
    } else {
      setSlider(false);
      flexValA.value = withTiming(1, {duration: DURATION / 2});
      flexValB.value = withTiming(0.1, {duration: DURATION / 2});
      positionX.value = withTiming(0, {duration: DURATION / 2});
      bgColor.value = withTiming('skyblue', {duration: DURATION / 2});
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.sliderBase, animatedContainer]}>
        <Animated.View style={animatedStyle}>
          <TouchableOpacity
            onPressIn={moveView}
            style={styles.sliderRadialGradient}>
            <Animated.Image source={SUN} style={[animatedImageA]} />
            <Animated.Image source={MOON} style={[animatedImageB]} />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cacaca',
  },
  sliderBase: {
    height: 250,
    width: 640,
    backgroundColor: 'skyblue',
    borderRadius: 250,
    elevation: 20,
    borderWidth: 1,
    borderColor: '#cacaca',
    overflow: 'hidden',
  },
  sliderRadialGradient: {
    height: 230,
    width: 230,
    borderRadius: 230,
    margin: 10,
    elevation: 40,
    overflow: 'hidden',
    // backgroundColor: 'orange',
    flexDirection: 'row',
  },
  sliderOn: {
    alignSelf: 'flex-end',
  },
});

export default Dashboard;
