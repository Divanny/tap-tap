import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';

import { Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const formatNumber = number => `0${number}`.slice(-2);

const getRemaining = (time) => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return { mins: formatNumber(mins), secs: formatNumber(secs) };
}

export default function App() {
  let [fontsLoaded] = useFonts({
    'Poppins': require('./assets/fonts/Poppins-Regular.otf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const [count, setCount] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [remainingSecs, setRemainingSecs] = useState(15);
  const [isActive, setIsActive] = useState(0);
  const { mins, secs } = getRemaining(remainingSecs);
  const [visible, setVisible] = useState(false);

  const toggle = () => {
    if (isActive == false) {
      setIsActive(true);
    }
    if (remainingSecs != 0) {
      setCount(count + 10);
    }
  }

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const reset = () => {
    setRemainingSecs(15);
    setIsActive(false);
    if (count > maxScore) {
      setMaxScore(count);
    }
  }

  useEffect(() => {
    let interval = null;
    if (isActive && remainingSecs > 0) {
      interval = setInterval(() => {
        setRemainingSecs(remainingSecs => remainingSecs - 1);
      }, 1000)
    } else if (!isActive && remainingSecs != 0) {
      clearInterval(interval)
    }

    return () => clearInterval(interval);
  }, [isActive, remainingSecs])

  const Button = ({ onPress, icon, backgroundColor, size }) => (
    <Icon
      name={icon}
      backgroundColor={backgroundColor}
      onPress={onPress}
      style={styles.appButton}
      size={size}
      color="#000"
    />
  );

  return (
    <LinearGradient style={styles.container} colors={['#151721', '#370055']} start={{ x: 0, y: 0 }} end={{ x: 2, y: 2 }}>
      <View style={styles.overlay}/>
      <StatusBar barStyle="light-content" backgroundColor={'#151721'} />
      <View style={styles.settingbuttonContainer} zIndex={10} >
        <TouchableOpacity onPress={() => toggleOverlay(true)}>
          <Button icon="gear" backgroundColor="#fff" size={35}/>
        </TouchableOpacity>
      </View>
      <Image
        style={{ width: 350, height: 100, left: -30, marginTop: 30 }}
        source={require('./assets/logoTap.png')}
      />
      <View style={styles.scoreContainer}>
        <Text style={styles.highScore}>High Score: </Text>
        <Text style={styles.score}>{maxScore}</Text>
      </View>
      <View style={styles.timerContainer}>
        <Text style={styles.timer}>{`${mins}:${secs}`}</Text>
        <Text style={styles.timer}>s</Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.roundButton}
          onPress={() => {
            toggle();
          }}>
          <Text style={styles.buttonText}>Tap!</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.scoreContainer}>
        <Text style={styles.actualScore}>Actual Score: </Text>
        <Text style={styles.actualScore}>{count}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            setCount(0);
            reset();
          }}>
          <Button icon="rotate-right" backgroundColor="#fff" size={50} />
        </TouchableOpacity>
      </View>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay} style={styles.settingsContainer}>
        <Text style={styles.settingsTitle}>Settings</Text>
      </Overlay>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingbuttonContainer: {
    margin: 10,
    padding: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 15,
    position: 'absolute',
    right: 20,
    top: 30,
    zIndex: 10,
    width: 45,
  },
  scoreContainer: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timerContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 1,
    paddingRight: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  highScore: {
    fontWeight: 'bold',
    color: 'white',
    padding: 5,
    fontSize: 24,
    fontFamily: 'Poppins',
  },
  score: {
    color: 'white',
    padding: 5,
    fontSize: 24,
    fontFamily: 'Poppins',
  },
  timer: {
    fontWeight: 'bold',
    color: 'white',
    padding: 5,
    fontSize: 36,
    fontFamily: 'Poppins',
  },
  roundButton: {
    marginTop: 20,
    width: 273,
    height: 273,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 273,
    backgroundColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  buttonText: {
    fontFamily: 'Poppins',
    fontSize: 36,
    fontWeight: 'bold',
  },
  actualScore: {
    color: 'white',
    padding: 5,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
  },
  buttonContainer: {
    margin: 20,
    padding: 5,
    backgroundColor: 'white',
    width: 62,
    height: 62,
    alignItems: 'center',
    borderRadius: 30,
  },
  settingsContainer: {
    margin: 10,
  },
  settingsTitle: {
    fontWeight: 'bold',
    color: 'black',
    padding: 5,
    paddingRight: 200,
    fontSize: 26,
    fontFamily: 'Poppins',
  },
});
