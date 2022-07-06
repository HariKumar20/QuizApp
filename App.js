import React from "react";
import QuizHomePage from "./quizhomepage";
import QuestionsPage from "./questionsPage";
import ScoreCalculate from "./scoreCalculate";
import NameInput from "./nameInput";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PreviousScore from "./previousscore";
const Stack = createNativeStackNavigator();

function App()
{
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={QuizHomePage}/>
        <Stack.Screen name="previousscore" component={PreviousScore}/>
        <Stack.Screen name='nameInput' component={NameInput}/>
        <Stack.Screen name="questionPage" component={QuestionsPage} />
        <Stack.Screen name="scorePage" component={ScoreCalculate} />
        {/* <Stack.Screen name="nameInput" component={NameInput} />
        <Stack.Screen name="scorePage" component={PreviousScore} /> */}
      </Stack.Navigator>
    </NavigationContainer>     
  
  )
}

export default App;
