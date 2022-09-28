import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  const [count, setCount] = useState(0);

  const Button = ({ onPress, icon, backgroundColor, size }) => (
    <Icon
      name={icon}
      backgroundColor={backgroundColor}
      onPress={onPress}
      style={styles.appButton}
      size={size} color="#000"
    />
  );

  return (
    <LinearGradient style={styles.container}  colors={['#151721', '#370055']} start={{ x: 0, y: 0 }} end={{ x: 2, y: 2 }}>
      <StatusBar barStyle="light-content" backgroundColor={'#151721'}/>
      <View style={styles.settingbuttonContainer}>
          <TouchableOpacity>
            <Button icon="gear" backgroundColor="#fff" size={30} />
          </TouchableOpacity>
      </View>
      <Image style={{ width: 400, height: 150, left: -30 }} source={require("./assets/logoTap.png")}/>
      <View style={styles.scoreContainer}> 
        <Text style={styles.highScore}>High Score: </Text>
        <Text style={styles.score}>8000</Text>
      </View>
      <View style={styles.timerContainer}> 
        <Text style={styles.timer}>30:00</Text>
        <Text style={styles.timer}>s</Text>
      </View>
      <View> 
        <TouchableOpacity
          style={styles.roundButton} onPress={() => {setCount(count + 10)}}>
          <Text style={styles.buttonText}>Tap!</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.scoreContainer}> 
        <Text style={styles.actualScore}>Actual Score: </Text>
        <Text style={styles.actualScore}>{count}</Text>
      </View>
      <View style={styles.buttonContainer}> 
        <TouchableOpacity onPress={() => {setCount(0)}}>
          <Button icon="rotate-right" backgroundColor="#fff" size={50}/>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
    top: 10
  },
  scoreContainer: {
    paddingTop: 20,
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  timerContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 1,
    paddingRight: 1,
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  highScore: {
    fontWeight: 'bold',
    color: 'white',
    padding: 5,
    fontSize: 24,
    fontFamily: 'Poppins-Bold'
  },
  score: {
    color: 'white',
    padding: 5,
    fontSize: 24,
    fontFamily: 'Poppins-Bold'
  },
  timer: {
    fontWeight: 'bold',
    color: 'white',
    padding: 5,
    fontSize: 36,
    fontFamily: 'Poppins-Bold'
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
  },
  buttonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 36,
    fontWeight: 'bold'
  },
  actualScore: {
    color: 'white',
    padding: 5,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold'
  },
  buttonContainer: {
    margin: 20,
    padding: 5,
    backgroundColor: 'white',
    width: 62,
    height: 62,
    alignItems: 'center',
    borderRadius: 30
  }
});
