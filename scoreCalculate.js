import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import objectData from './questionsObject.json';

function ScoreCalculate({navigation, route}) {
  var score = 0;
  const [objectData , setData ] =useState([]);
  const [result ,setResult] = useState(0);

  const gettingApiData = async () => {
    try {
      const response = await fetch('https://quiz-data.free.beeceptor.com');
      const jsonData = await response.json();
      setData(jsonData.questionsData);
      for (let i = 0; i < jsonData.questionsData.length; i++) {
        console.log('Inside Loop')
        if (
          route.params.answers[jsonData.questionsData[i].question] ==
          jsonData.questionsData[i].correct_option
        ) {
          score++;
        }
      }
      setResult(score);
    } catch (error) {
      console.log('Error : ', error);
    }
  };

  useEffect(() => {
    gettingApiData();
  }, []);

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('score', value.toString());
    } catch (e) {
      console.log('The Error is ', e);
    }
  };

  const appendUserData = async () => {
    try {
      const nameData = await AsyncStorage.getItem('name');
      const scoreData = await AsyncStorage.getItem('score');
      if (await AsyncStorage.getItem('userScoreList')) {
        const scoreListAsync = await AsyncStorage.getItem('userScoreList');
        const scoreListAsyncParsed = JSON.parse(scoreListAsync);
        scoreListAsyncParsed.push({nameData, scoreData});
        const stringifiedAsyncParsed = JSON.stringify(scoreListAsyncParsed);
        await AsyncStorage.setItem('userScoreList', stringifiedAsyncParsed);
      } else {
        scoreList.push({nameData, scoreData});
        const stringifyScoreList = JSON.stringify(scoreList);
        await AsyncStorage.setItem('userScoreList', stringifyScoreList);
      }
    } catch (e) {}
  };

  storeData(score);
  appendUserData();

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>Your Score is {result}</Text>
      <ScrollView>
        {objectData.map((questionIndex, index) => (
          <View style={styles.questionView} key={index}>
            <Text style={styles.questionText}>{questionIndex.question}</Text>
            {questionIndex.options.map((optionIndexing, indexing) => (
              <View key={indexing}>
                <Text style={styles.optionText}>{optionIndexing.option}</Text>
              </View>
            ))}
            <Text
              style={
                questionIndex.correct_option ==
                route.params.answers[questionIndex.question]
                  ? styles.showresult
                  : styles.hideresult
              }>
              ✅
            </Text>
            <Text
              style={
                questionIndex.correct_option !=
                route.params.answers[questionIndex.question]
                  ? styles.showresult
                  : styles.hideresult
              }>
              ❌
            </Text>
            {questionIndex.options.map((optionIndexing, indexpos) => (
              <Text
                style={
                  optionIndexing.option_id == questionIndex.correct_option
                    ? styles.questionresponse
                    : styles.hideresult
                }
                key={indexpos}>
                The Answer is {optionIndexing.option}
              </Text>
            ))}
          </View>
        ))}
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate('nameInput')}>
            <View style={styles.taketest}>
              <Text style={styles.testtext}>Take Test</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('previousscore')}>
            <View style={styles.prevscore}>
              <Text style={styles.testtext}>Prev Scores</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <View style={styles.homebutton}>
            <Text style={styles.hometext}>Home</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scoretext: {
    fontSize: 20,
  },
  questionView: {
    borderColor: 'slategray',
    borderRadius: 20,
    borderWidth: 2,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 30,
    marginLeft: 10,
  },
  optionText: {
    fontSize: 20,
    marginLeft: 10,
    margin: 20,
  },
  scoreText: {
    fontSize: 40,
    color: 'steelblue',
    margin: 10,
  },
  showresult: {
    fontSize: 30,
    marginLeft: 30,
    marginBottom: 20,
  },
  hideresult: {
    fontSize: 0,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taketest: {
    height: 80,
    width: 150,
    backgroundColor: 'steelblue',
    marginBottom: 30,
    marginLeft: 30,
    borderRadius: 10,
  },
  prevscore: {
    height: 80,
    width: 150,
    backgroundColor: 'steelblue',
    marginBottom: 30,
    marginRight: 30,
    borderRadius: 10,
  },
  testtext: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginTop: 25,
  },
  questionresponse: {
    fontSize: 20,
    color: 'green',
    margin: 20,
  },
  homebutton: {
    height: 80,
    width: 180,
    backgroundColor: 'steelblue',
    justifyContent: 'space-around',
    marginBottom: 80,
    borderRadius: 10,
    marginLeft: 120,
  },
  hometext: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 8,
    color: 'white',
  },
});

export default ScoreCalculate;
