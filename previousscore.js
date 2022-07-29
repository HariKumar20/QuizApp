import React, {useContext, useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MyContext} from './App';
import {firebase} from '@react-native-firebase/database';

function PreviousScore({navigation}) {
  const {userId} = useContext(MyContext);
  const [firebaseData , setFirebaseData ] = useState({});
  useEffect (()=>{
  firebase
    .app()
    .database()
    .ref(userId)
    .once('value').then((snapshot)=> {setFirebaseData(snapshot.val()); console.log(snapshot.val());});} ,[])
    Object.keys(firebaseData).map((item)=>{console.log(firebaseData[item].username)});
    

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Previous Scores List</Text>

      <FlatList
        data={Object.keys(firebaseData)}
        renderItem={({item}) => (
          <View style={styles.scorecard}>
            <View style={styles.scoreview}>
              <Text style={styles.scoretext}>{firebaseData[item].username}</Text>
              <Text style={styles.scoretext}>
                {firebaseData[item].userscore}
              </Text>
            </View>
          </View>
        )}
      />

      {/* {
        Object.keys(firebaseData).map((item , index) =>
        <View style={styles.scorecard} key={index}>
            <View style={styles.scoreview}>
              <Text style={styles.scoretext}>{item.username}</Text>
              <Text style={styles.scoretext}>
                {item.userscore}
              </Text>
            </View>
          </View>

        )
      } */}


    </View>
  );
}

export default PreviousScore;

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
    color: 'steelblue',
  },
  scoretext: {
    fontSize: 20,
    color: 'white',
    margin: 10,
    fontWeight: 'bold',
  },
  scoreview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  scorecard: {
    height: 60,
    width: 350,
    backgroundColor: 'royalblue',
    borderRadius: 20,
    marginLeft: 30,
    marginBottom: 20,
  },
  container :
  {
    justifyContent :'center',
  }
});
