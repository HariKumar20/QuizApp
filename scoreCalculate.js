import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import {MyContext} from './App';
import {firebase} from '@react-native-firebase/database';
import database from '@react-native-firebase/database';
import { useSelector , useDispatch } from 'react-redux'
import { setUserScore } from './createSlice';

function ScoreCalculate({navigation, route}) {
  var score = 0;
  const [objectData, setData] = useState([]);
  // const [result, setResult] = useState(0);
  const [loader , setLoader] = useState(1);
  const {userName, userId} = useContext(MyContext);
  const userResult = useSelector((state)=> state.userscore.result);
  const dispatch = useDispatch();

  console.log(userId);
  const storeData = (score, answers, id, name) => {
    console.log('hiii');
    const newReference = database().ref(id).push();

    newReference
      .set({
        username: name,
        userscore: score,
        useranswers: answers,
      })
      .then(() => console.log('Data updated.'));
  };

  const gettingApiData = async () => {
    try {
      const response = await fetch(
        'https://6295e05175c34f1f3b23964b.mockapi.io/getData',
      );
      const jsonData = await response.json();
      setLoader(0);
      setData(jsonData.questionsData);
      for (let i = 0; i < jsonData.questionsData.length; i++) {
        console.log('Inside Loop');
        if (
          route.params.answers[jsonData.questionsData[i].question] ==
          jsonData.questionsData[i].correct_option
        ) {
          score++;
        }
      }
      dispatch(setUserScore(score));
      storeData(score, route.params.answers, userId, userName);
    } catch (error) {
      console.log('Error : ', error);
    }
  };

  useEffect(() => {
    gettingApiData();
  }, []);

  return (<View style={styles.container}>
    {
      loader ? (
    <View style={styles.loadview}>
      <ActivityIndicator size="large" color="blue" />
    </View>
    ):
    (
      <View style={styles.container}>
      <Text style={styles.scoreText}>Your Score is {userResult}</Text>
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
        ))}</ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
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
        </View>
      
    )
              }
    </View>)
  }
  


const styles = StyleSheet.create({
  container :
  {
    flex : 1,
  },
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
    height: 60,
    width: 120,
    backgroundColor: 'steelblue',
    marginBottom: 10,
    borderRadius: 10,
  },
  prevscore: {
    height: 60,
    width: 120,
    backgroundColor: 'steelblue',
    marginBottom: 10,
    borderRadius: 10,
  },
  testtext: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
  questionresponse: {
    fontSize: 20,
    color: 'green',
    margin: 20,
  },
  loadview: {
    height: 100,
    width: 100,
    backgroundColor: 'slategrey',
    borderRadius: 30,
    justifyContent: 'center',
    marginTop: 250,
    marginLeft: 150,
    opacity: 0.8,
  }
});

export default ScoreCalculate;
