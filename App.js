import React, {useEffect, useState, createContext} from 'react';
import QuizHomePage from './quizhomepage';
import QuestionsPage from './questionsPage';
import ScoreCalculate from './scoreCalculate';
import NameInput from './nameInput';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PreviousScore from './previousscore';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createNativeStackNavigator();
export const MyContext = createContext('MyContext');

function App() {
  const [scoreDataListParsed, setScoreListedParsed] = useState([]);

  const gettingData = async () => {
    const scoreDataList = await AsyncStorage.getItem('userScoreList');
    setScoreListedParsed(JSON.parse(scoreDataList));
  };

  useEffect(() => {
    gettingData();
  }, []);

  return (
    <MyContext.Provider value={{scoreDataListParsed}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={QuizHomePage} />
          <Stack.Screen name="previousscore" component={PreviousScore} />
          <Stack.Screen name="nameInput" component={NameInput} />
          <Stack.Screen name="questionPage" component={QuestionsPage} />
          <Stack.Screen name="scorePage" component={ScoreCalculate} />
        </Stack.Navigator>
      </NavigationContainer>
    </MyContext.Provider>
  );
}

export default App;
