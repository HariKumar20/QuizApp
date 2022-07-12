import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Flatlist,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal,
} from 'react-native';

function QuestionsPage({navigation, route}) {
  const [data, setData] = useState({});
  const [flag, setFlag] = useState(0);
  const [questionDataVariable, setQuestion] = useState('');
  const [optionData, setOption] = useState([]);
  const [questionCounter, setQuestionCounter] = useState(0);
  const [radioColor, setRadioColor] = useState('white');
  const [optionId, setOptionId] = useState('');
  const [radioFlag, setRadioFlag] = useState(0);
  const [savedDataObject, setSavedDataObject] = useState({});
  const [questionFlag, setQuestionFlag] = useState(0);
  const [answeredQuestions, setAnsweredQuestion] = useState([]);
  const [error, setError] = useState('');
  const [loadFlag, setLoadFlag] = useState(1);

  const gettingApiData = async () => {
    console.log('getting Api called invike');
    try {
      console.log('Calling API');
      const response = await fetch(
        'https://6295e05175c34f1f3b23964b.mockapi.io/getData',
      );
      const jsonData = await response.json();
      console.log(jsonData);
      setData(jsonData);
      setQuestion(jsonData.questionsData[0].question);
      setOption(jsonData.questionsData[0].options);
      setLoadFlag(0);
    } catch (err) {
      setError('No Internet Connection.');
      console.log(err.message);
    }
  };



  useEffect(() => {
    console.log('flag');
    gettingApiData();
  }, []);
  console.log('data : ', data);

  const nextqueschange = () => {
    if (questionCounter < data.questionsData.length - 1) {
      const questionCount = questionCounter + 1;
      setQuestionCounter(questionCount);
      setQuestion(data.questionsData[questionCount].question);
      setOption(data.questionsData[questionCount].options);
      if (savedDataObject[data.questionsData[questionCount].question]) {
        setOptionId(
          savedDataObject[data.questionsData[questionCount].question],
        );
        if (questionCount == data.questionsData.length - 1) {
          setQuestionFlag(0);
        } else {
          setQuestionFlag(1);
        }
      } else {
        setQuestionFlag(0);
        unansweredRadioColor();
      }
    }
  };

  const prevqueschange = () => {
    if (questionCounter >= 1) {
      const questionCount = questionCounter - 1;
      setQuestionCounter(questionCount);
      setQuestion(data.questionsData[questionCount].question);
      setOption(data.questionsData[questionCount].options);

      console.log(savedDataObject);
      if (savedDataObject[data.questionsData[questionCount].question]) {
        setOptionId(
          savedDataObject[data.questionsData[questionCount].question],
        );
        setQuestionFlag(1);
        console.log(
          savedDataObject[data.questionsData[questionCount].question],
        );
      } else {
        unansweredRadioColor();
      }
    }
  };

  const unansweredRadioColor = () => {
    setOptionId('undefined');
  };

  const changeRadioColor = selectedItem => {
    const optionValue = selectedItem;
    setOptionId(selectedItem);

    if (optionValue == selectedItem) {
      setRadioColor('steelblue');
      setSavedDataObject(selectedData => {
        selectedData[questionDataVariable] = selectedItem;
        return selectedData;
      });
      setAnsweredQuestion(answeredItem => {
        if (!(questionCounter in answeredQuestions)) {
          answeredItem.push(questionCounter + 1);
        } else {
          answeredItem.pop();
          answeredItem.push(questionCounter + 1);
        }
        return answeredItem;
      });
    }
    if (questionCounter == data.questionsData.length - 1) {
      setRadioFlag(1);
      setQuestionFlag(0);
    }
    if (questionCounter < data.questionsData.length - 1) {
      setQuestionFlag(1);
    }
  };

  const questionNavigator = questionNumber => {
    setQuestion(data.questionsData[questionNumber - 1].question);
    setOption(data.questionsData[questionNumber - 1].options);
    if (savedDataObject[data.questionsData[questionNumber - 1].question]) {
      setOptionId(
        savedDataObject[data.questionsData[questionNumber - 1].question],
      );
      if (questionNumber - 1 == data.questionsData.length - 1) {
        setQuestionFlag(0);
      } else {
        setQuestionFlag(1);
      }
    } else {
      setQuestionFlag(0);
      unansweredRadioColor();
    }
  };

  console.log(answeredQuestions);

  return (
    <View style={styles.container}>
      {loadFlag ? (
        error ? (
          <Text style={styles.errortext}>{error}</Text>
        ) : (
          <View style={styles.loadview}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        )
      ) : (
        <ScrollView>
          <View style={styles.greetingview}>
            <Text style={styles.greetingtext}>
              Hello, {route.params.inputName}
            </Text>
            <Text style={styles.greetsubtext}>This is Your test</Text>
          </View>
          <Text style={styles.answeredtext}>Answered Questions </Text>

          <ScrollView horizontal={true}>
            {answeredQuestions.map((item, index) => (
              <TouchableOpacity
                onPress={() => questionNavigator(item)}
                key={index}>
                <View style={styles.answeredItemView}>
                  <Text style={styles.answeredItemText}>{item}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.questionsview}>
            <Text style={styles.questiontext}>{questionDataVariable}</Text>
            {optionData.map((optionItem, index) => (
              <TouchableOpacity
                onPress={() => changeRadioColor(optionItem.option_id)}
                key={index}>
                <View style={styles.radioDisplay}>
                  <View
                    style={{
                      ...styles.radioButton,
                      ...{
                        backgroundColor:
                          optionId == optionItem.option_id
                            ? radioColor
                            : 'white',
                      },
                    }}
                  />
                  <Text key={optionItem.option_id} style={styles.optiontext}>
                    {optionItem.option}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.prevnextbutton}>
            <TouchableOpacity onPress={prevqueschange}>
              <View style={styles.prevbutton}>
                <Text style={styles.prevnextbuttontext}>Prev Ques</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={nextqueschange}
              disabled={questionFlag == 0}
              style={questionFlag == 0 ? {opacity: 0.5} : {opacity: 1}}>
              <View style={styles.nextbutton}>
                <Text style={styles.prevnextbuttontext}>Next Ques</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('scorePage', {answers: savedDataObject})
            }
            disabled={radioFlag === 0}
            style={radioFlag == 0 ? {opacity: 0.5} : {opacity: 1}}>
            <View
              style={radioFlag == 1 ? styles.submitstyle : styles.otherstyle}>
              <Text
                style={
                  radioFlag == 1 ? styles.prevnextbuttontext : styles.othertext
                }>
                Submit
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  greetingtext: {
    fontSize: 20,
    color: 'steelblue',
    textAlign: 'center',
    fontFamily: 'verdana',
    marginTop: 10,
  },
  greetsubtext: {
    textAlign: 'center',
    fontSize: 20,
  },
  questiontext: {
    fontSize: 30,
    color: 'slategray',
    marginLeft: 10,
  },
  questionsview: {
    marginLeft: 15,
    marginTop: 30,
    marginRight: 15,
    marginBottom: 20,
    borderColor: 'slategray',
    borderRadius: 20,
    borderWidth: 2,
  },
  optiontext: {
    fontSize: 20,
    marginLeft: 10,
  },
  prevnextbutton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  prevbutton: {
    height: 60,
    width: 120,
    backgroundColor: 'steelblue',
    borderRadius: 15,
    marginLeft: 20,
  },
  prevnextbuttontext: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginTop: 15,
  },
  nextbutton: {
    height: 60,
    width: 120,
    backgroundColor: 'steelblue',
    borderRadius: 15,
    marginRight: 15,
  },
  radioDisplay: {
    flexDirection: 'row',
    margin: 20,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderColor: 'grey',
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: 'white',
  },
  submitstyle: {
    height: 60,
    width: 120,
    backgroundColor: 'steelblue',
    borderRadius: 15,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 140,
    marginTop: 20,
  },
  othertext: {
    fontSize: 0,
  },
  answeredItemView: {
    height: 50,
    width: 50,
    backgroundColor: 'steelblue',
    borderRadius: 20,
    marginLeft: 10,
    marginTop: 10,
  },
  answeredItemText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
  },
  answeredtext: {
    padding: 10,
    width: 300,
    backgroundColor: 'steelblue',
    color: 'white',
    fontSize: 20,
    marginLeft: 60,
    textAlign: 'center',
    borderRadius: 20,
  },
  errortext: {
    fontSize: 20,
    color: 'slategrey',
    marginTop: 250,
    marginLeft: 120,
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
  },
});

export default QuestionsPage;
