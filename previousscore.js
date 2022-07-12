import React, {useContext, useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyContext } from './App';

function PreviousScore({navigation}) {
    const {scoreDataListParsed} = useContext(MyContext);
    console.log(scoreDataListParsed);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Previous Scores List</Text>

      <FlatList
        data={scoreDataListParsed}
        renderItem={({item}) => (
          <View style={styles.scorecard}>
          <View style={styles.scoreview}>
            <Text style={styles.scoretext}>{item.nameData}</Text>
            <Text style={styles.scoretext}>{item.scoreData}</Text>
          </View>
          </View>
        )}
      />
    </View>
  );
}

export default PreviousScore;

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 10,
    marginBottom : 30,
    color: 'steelblue',
  },
  scoretext: {
    fontSize: 20,
    color: 'white',
    margin: 10,
  },
  scoreview: {
    flexDirection: 'row',
    justifyContent :'space-around',
  },
  scorecard :
  {
    height : 60,
    width : 350,
    backgroundColor : 'steelblue',
    borderRadius : 20,
    marginLeft : 30,
    marginBottom : 20,
  }
});
