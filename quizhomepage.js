import React, {useState} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity, Alert} from 'react-native';
import QuestionsPage from './questionsPage';
import DialogInput from 'react-native-dialog-input';

function QuizHomePage({navigation}) {
  const alertName = () => {
    Alert.alert('What is Your Name?');
  };
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('./quizlogo.png')} />
      <TouchableOpacity onPress={()=> navigation.navigate('nameInput')}>
        <View style={styles.testbutton}>
          <Text style={styles.hometext}>Take Test</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate('previousscore')}>
        <View style={styles.scorebutton}>
          <Text style={styles.hometext}>Previous Scores</Text>
        </View>

      </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'aliceblue',
    flex: 1,
  },
  logo: {
    // position:"absolute",
    height: 200,
    width: 200,
    top: 120,
    left: 100,
  },
  testbutton:
  {
    height : 70,
    width : 300,
    backgroundColor : 'steelblue',
    borderRadius:50,
    marginLeft:60,
    marginTop: 140,
  },
  scorebutton:
  {
    height : 70,
    width : 300,
    backgroundColor : 'steelblue',
    borderRadius : 50,
    marginLeft:60,
    marginTop: 50,
    
  },
  hometext:
  {
    color:'white',
    fontSize : 25,
    textAlign:'center',
    textAlignVertical : 'center',
    marginTop : 15,

  },
});

export default QuizHomePage;
