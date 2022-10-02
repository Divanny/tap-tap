import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Divider } from 'react-native-paper';
import { Overlay } from 'react-native-elements';
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
  const [lastScore, setLastScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [remainingSecs, setRemainingSecs] = useState(15);
  const [seconds, setSeconds] = useState(15);
  const [isActive, setIsActive] = useState(0);
  const { mins, secs } = getRemaining(remainingSecs);
  const [visible, setVisible] = useState(false);
  const [splitScreen, setSplitScreen] = useState(false);

  const toggle = () => {
    if (isActive == false) {
      setIsActive(true);
    }
    if (remainingSecs != 0) {
      setCount(count + 10);
    }
  }

  const toggleMode = () => {
    setSplitScreen(!splitScreen);
  }

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const reset = () => {
    setRemainingSecs(seconds);
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
      {/* MAIN APP */}
      <View isVisible={false} style={[styles.container, width=0, height=0]}>
        <View style={styles.overlay}/>
        <StatusBar barStyle="light-content" backgroundColor={'#151721'} />
        <View style={styles.settingbuttonContainer} zIndex={10} >
          <TouchableOpacity onPress={() => {toggleOverlay(); if (count != 0) {setLastScore(count)}; setCount(0); reset();}}>
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
              if (count != 0) {setLastScore(count)};
              setCount(0);
              reset();
            }}>
            <Button icon="rotate-left" backgroundColor="#fff" size={50} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Split Screen Mode */}

      {/* SETTINGS */}
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay} style={styles.settingsContainer}>
        <View style={styles.headerOverlayContainer}>
          <Text style={styles.settingsTitle}>Settings</Text>
          <TouchableOpacity style={styles.timerButton} onPress={() => {toggleOverlay(); setLastScore(count); setCount(0); reset();}}>
            <Image style={{ width: 20, height: 20 }} source={require('./assets/close.png')}/>
          </TouchableOpacity>
        </View>
        <View style={styles.settingItemContainer}>
          <Text style={styles.settingItemTitle}>Timer</Text>
          <Divider/>
          <View style={styles.timerContainer}>
            <TouchableOpacity style={styles.timerButton} onPress={() => {setSeconds(15); setIsActive(false); toggleOverlay(); setRemainingSecs(15);}}>
              <Text style={styles.timerText}>00:15</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.timerButton} onPress={() => {setSeconds(30); setIsActive(false); toggleOverlay(); setRemainingSecs(30);}}>
              <Text style={styles.timerText}>00:30</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.timerButton} onPress={() => {setSeconds(45); setIsActive(false); toggleOverlay(); setRemainingSecs(45);}}>
              <Text style={styles.timerText}>00:45</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.settingItemContainer}>
          <Text style={styles.settingItemTitle}>Stats</Text>
          <Divider/>
          <View style={styles.statsRowContainer}>
            <Text style={styles.lastScore}>Last Score: </Text>
            <Text style={styles.lastScore}>{lastScore}</Text>
          </View>
          <View style={styles.statsRowContainer}>
            <Text style={styles.lastScore}>Click per seconds: </Text>
            <Text style={styles.lastScore}>{((lastScore / 10) / remainingSecs).toFixed(2)}</Text>
          </View>
        </View>
        <Divider/>
        <View style={styles.splitScreenContainer}>
          <TouchableOpacity style={styles.splitScreenButton} onPress={() => {toggleMode(); toggleOverlay();}}>
            <Image style={styles.splitScreenButtonItem} source={require('./assets/split-screen.png')}/>
            <Text style={styles.timerText}>Split Screen</Text>
          </TouchableOpacity>
        </View>
      </Overlay>

      {/* SPLIT SCREEN */}
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
    right: 5,
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
    fontFamily: 'Poppins-Regular',
  },
  score: {
    color: 'white',
    padding: 5,
    fontSize: 24,
    fontFamily: 'Poppins-Regular',
  },
  timer: {
    fontWeight: 'bold',
    color: 'white',
    padding: 5,
    fontSize: 36,
    fontFamily: 'Poppins-Regular',
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
    fontFamily: 'Poppins-Regular',
    fontSize: 36,
    fontWeight: 'bold',
  },
  actualScore: {
    color: 'white',
    padding: 5,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
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
    borderRadius: 50,
  },
  settingsTitle: {
    fontWeight: 'bold',
    color: 'black',
    paddingRight: 120,
    fontSize: 36,
    fontFamily: 'Poppins-Regular',
  },
  settingItemContainer: {
    margin: 10,
    padding: 1,
  },
  settingItemTitle: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 24,
    paddingBottom: 10,
    fontFamily: 'Poppins-Regular',
  },
  timerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 30,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderColor: '#DDDDDD',
    borderWidth: 1,
  },
  timerText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  headerOverlayContainer: {
    padding: 5,
    paddingHorizontal: 0,
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    padding: 2,
  },
  lastScore: {
    color: 'black',
    padding: 5,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
  },
  statsRowContainer: {
    paddingLeft: 1,
    paddingRight: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  splitScreenButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 30,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderColor: '#DDDDDD',
    borderWidth: 1,
  },
  splitScreenButtonItem: {
    margin: 5,
    width: 20,
    height: 20,
  },
  splitScreenContainer: {
    padding: 5,
    paddingHorizontal: 0,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
