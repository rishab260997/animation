import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {DURATION, colors} from './Constants';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const SUN = require('./assets/sun.png');
const MOON = require('./assets/moon.png');
const CLOUD = require('./assets/cloud.png');
const STAR = require('./assets/star.png');

const Dashboard = () => {
  const positionX = useSharedValue(0);
  const bgColor = useSharedValue(colors.light);
  const positionLeft = useSharedValue(230);
  const positionTop = useSharedValue(0);
  const innerRippleAlign = useSharedValue(0);
  const midRippleAlign = useSharedValue(0);
  const outerRippleAlign = useSharedValue(0);

  const [slider, setSlider] = useState(false);
  const animatedImage = useAnimatedStyle(() => ({
    transform: [{translateX: positionX.value}],
  }));

  const animatedRippleOuter = useAnimatedStyle(() => ({
    transform: [{translateX: outerRippleAlign.value}],
  }));

  const animatedRippleMid = useAnimatedStyle(() => ({
    transform: [{translateX: midRippleAlign.value}],
  }));

  const animatedRippleInner = useAnimatedStyle(() => ({
    transform: [{translateX: innerRippleAlign.value}],
  }));

  const moonImageShift = useAnimatedStyle(() => ({
    left: positionLeft.value,
  }));

  const animatedContainer = useAnimatedStyle(() => {
    return {
      backgroundColor: bgColor.value,
    };
  });

  const backgroundShift = useAnimatedStyle(() => ({
    bottom: positionTop.value,
  }));

  const moveView = () => {
    if (!slider) {
      setSlider(true);
      bgColor.value = withTiming(colors.dark, {duration: DURATION});
      positionX.value = withTiming(390, {duration: DURATION});
      positionLeft.value = withTiming(0, {duration: DURATION});
      positionTop.value = withTiming(-250, {duration: DURATION});
      innerRippleAlign.value = withTiming(180, {duration: DURATION});
      midRippleAlign.value = withTiming(110, {duration: DURATION});
      outerRippleAlign.value = withTiming(140, {duration: DURATION});
    } else {
      setSlider(false);
      bgColor.value = withTiming(colors.light, {duration: DURATION});
      positionX.value = withTiming(0, {duration: DURATION});
      positionLeft.value = withTiming(230, {duration: DURATION});
      positionTop.value = withTiming(0, {duration: DURATION});
      innerRippleAlign.value = withTiming(0, {duration: DURATION});
      midRippleAlign.value = withTiming(0, {duration: DURATION});
      outerRippleAlign.value = withTiming(0, {duration: DURATION});
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={moveView}>
        <Animated.View style={[styles.sliderBase, animatedContainer]}>
          {/* The below view contains the background shift animation */}
          <Animated.View style={[styles.backgroundContainer, backgroundShift]}>
            <Animated.Image source={STAR} style={styles.cloudBackground} />
            <Animated.Image source={CLOUD} style={styles.cloudBackground} />
          </Animated.View>
          {/* ******************* */}
          <Animated.View style={[styles.rippleContainer, animatedRippleOuter]}>
            <Animated.View
              style={[styles.innerRipple, styles.ripple, animatedRippleInner]}
            />
            <Animated.View
              style={[styles.midRipple, styles.ripple, animatedRippleMid]}
            />
            <Animated.View style={[styles.outerRipple, styles.ripple]} />
          </Animated.View>
          {/* The below view contains the button image shift animation */}
          <Animated.View style={[styles.imageContainer, animatedImage]}>
            <Animated.Image
              source={MOON}
              style={[styles.moonImage, moonImageShift]}
            />
            <Animated.Image source={SUN} style={[styles.sunImage]} />
          </Animated.View>
          {/* ******************* */}
        </Animated.View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#afafaf',
  },
  sliderBase: {
    height: 250,
    width: 650,
    backgroundColor: 'skyblue',
    borderRadius: 250,
    elevation: 20,
    borderWidth: 1,
    borderColor: '#cacaca',
    overflow: 'hidden',
    padding: 10,
  },
  imageContainer: {
    height: 230,
    width: 230,
    overflow: 'hidden',
    borderRadius: 230,
    zIndex: 9,
  },
  sunImage: {
    height: 230,
    width: 230,
    flex: 1,
    zIndex: 1,
    position: 'absolute',
    resizeMode: 'cover',
  },
  moonImage: {
    height: 230,
    width: 230,
    flex: 1,
    zIndex: 2,
    position: 'absolute',
    resizeMode: 'cover',
  },
  backgroundContainer: {
    position: 'absolute',
  },
  cloudBackground: {
    height: 250,
    width: 650,
    resizeMode: 'cover',
    tintColor: 'white',
  },
  rippleContainer: {
    position: 'absolute',
  },
  ripple: {
    backgroundColor: 'white',
    height: 250,
    borderRadius: 280,
    opacity: 0.3,
  },
  innerRipple: {
    width: 330,
    zIndex: 3,
    // transform: [{translateX: 320}],
  },
  midRipple: {
    width: 400,
    position: 'absolute',
    zIndex: 2,
    // transform: [{translateX: 250}],
  },
  outerRipple: {
    width: 510,
    position: 'absolute',
    zIndex: 1,
    // transform: [{translateX: 140}],
  },
});

export default Dashboard;
