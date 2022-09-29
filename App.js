import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';

const formatNumber = number => `0${number}`.slice(-2);

const getRemaining = (time) => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return { mins: formatNumber(mins), secs: formatNumber(secs) };
}

export default function App() {
  const [count, setCount] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [remainingSecs, setRemainingSecs] = useState(15);
  const [isActive, setIsActive] = useState(0);
  const { mins, secs } = getRemaining(remainingSecs);

  const toggle = () => {
    if (isActive == false) {
      setIsActive(true);
    }
    if (remainingSecs != 0) {
      setCount(count + 10);
    }
  }

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
    <LinearGradient
      style={styles.container}
      colors={['#151721', '#370055']}
      start={{ x: 0, y: 0 }}
      end={{ x: 2, y: 2 }}>
      <StatusBar barStyle="light-content" backgroundColor={'#151721'} />
      <View style={styles.settingbuttonContainer}>
        <TouchableOpacity zIndex={1000}>
          <Button icon="gear" backgroundColor="#fff" size={30} />
        </TouchableOpacity>
      </View>
      <Image
        style={{ width: 400, height: 150, left: -30, marginTop: 20 }}
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
    width: 40,
    alignItems: 'center',
    borderRadius: 15,
    position: 'absolute',
    right: 20,
    top: 35,
    zIndex: 10,
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
    fontFamily: 'Poppins-Bold',
  },
  score: {
    color: 'white',
    padding: 5,
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
  },
  timer: {
    fontWeight: 'bold',
    color: 'white',
    padding: 5,
    fontSize: 36,
    fontFamily: 'Poppins-Bold',
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
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 36,
    fontWeight: 'bold',
  },
  actualScore: {
    color: 'white',
    padding: 5,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
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
});
