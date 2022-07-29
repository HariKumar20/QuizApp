import React, {useEffect, useState, createContext} from 'react';
import QuizHomePage from './quizhomepage';
import QuestionsPage from './questionsPage';
import ScoreCalculate from './scoreCalculate';
import NameInput from './nameInput';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PreviousScore from './previousscore';
import QuizLogIn from './quizloginpage';
import QuizSignUp from './signuppage';
import QuizPhoneSignIn from './phonesignin';
import ForgetPassword from './forgetPassword';
import NetInfo from '@react-native-community/netinfo';
import {View, Text, StyleSheet} from 'react-native';
import {store} from './store';
import {Provider} from 'react-redux';
export const MyContext = createContext('MyContext');
const Stack = createNativeStackNavigator();

function App() {
  const [userName, setUsername] = useState('');
  const [userId, setuserId] = useState('');
  const [netFlag, setNetFlag] = useState();

  useEffect(() => {
    NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      setNetFlag(state.isConnected);
    });
  });

  // Unsubscribe

  return netFlag ? (
    <Provider store={store}>
      <MyContext.Provider value={{userName, setUsername, userId, setuserId}}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="login" component={QuizLogIn} />
            <Stack.Screen name="passwordreset" component={ForgetPassword} />
            <Stack.Screen name="phonesignin" component={QuizPhoneSignIn} />
            <Stack.Screen name="signup" component={QuizSignUp} />
            <Stack.Screen name="Home" component={QuizHomePage} />
            <Stack.Screen name="previousscore" component={PreviousScore} />
            <Stack.Screen name="nameInput" component={NameInput} />
            <Stack.Screen name="questionPage" component={QuestionsPage} />
            <Stack.Screen name="scorePage" component={ScoreCalculate} />
          </Stack.Navigator>
        </NavigationContainer>
      </MyContext.Provider>
    </Provider>
  ) : (
    <View style={styles.container}>
      <Text style={styles.text}>No Internet Connection</Text>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 30,
  },
});
