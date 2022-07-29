import React, {createContext, useState} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity ,Modal ,Alert} from 'react-native';
import auth from '@react-native-firebase/auth';


function QuizHomePage({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);

  const logoutUser = ()=>
  {
    auth()
  .signOut()
  .then(() => console.log('User signed out!'));
    navigation.navigate('login');
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>logoutUser()}>
      <View style={styles.logoutflex}>
      <View style={styles.logoutview}>
      <Text style={styles.logout}> Log out</Text>
      </View>
      </View>
      </TouchableOpacity>
      <Image style={styles.logo} source={require('./quizlogo.png')} />
      <View>
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
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'aliceblue',
    flex: 1,
    // alignItems :'center',
    // justifyContent : 'center',
  },
  logo: {
    // position:"absolute",
    height: 200,
    width: 200,
    top: 120,
    left: 100,
  },
  logout :
  {
    fontSize : 20,
    color : 'white',
    textAlign :'center',
    marginTop : 10,

  },
  logoutview:
  {
    height : 50,
    width : 120,
    backgroundColor :'navy',
    borderRadius : 10,
    marginTop : 20,
  },
  logoutflex :
  {
    flexDirection :'row',
    justifyContent :'space-around',

  },
  testbutton:
  {
    height : 70,
    width : 300,
    backgroundColor : 'royalblue',
    borderRadius:50,
    marginLeft:50,
    marginTop: 160,
  },
  scorebutton:
  {
    height : 70,
    width : 300,
    backgroundColor : 'royalblue',
    borderRadius : 50,
    marginLeft:50,
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
