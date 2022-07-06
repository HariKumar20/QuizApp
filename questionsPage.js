import { TabRouter } from "@react-navigation/native";
import React , {useState} from "react";
import {View,Text,Flatlist ,StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import objectData from './questionsObject.json';

const data = objectData;

function QuestionsPage({navigation , route}){
    const [questionDataVariable , setQuestion] = useState(data.questionsData[0].question);   
    const [optionData , setOption] = useState(data.questionsData[0].options) ;
    const [questionCounter, setQuestionCounter] = useState(0);
    const [radioColor , setRadioColor] = useState('white');
    const [borderColorChange , setBorderColor] = useState('black');
    const [optionId ,setOptionId] = useState('');
    const [flag , setFlag] = useState(1);
    const [radioFlag , setRadioFlag] = useState(0);  
    const [savedDataObject , setSavedDataObject] = useState({}); 
    const [correctQuestions , setCorrectQuestion] = useState([]);
    const [questionFlag , setQuestionFlag] = useState(0);
    const [answeredQuestions , setAnsweredQuestion] = useState([]); 

    const nextqueschange = () => {
        if(questionCounter < data.questionsData.length - 1) {   
            const questionCount = questionCounter+1
            setQuestionCounter(questionCount);  
            setQuestion(data.questionsData[questionCount].question);
            setOption(data.questionsData[questionCount].options);
            if(savedDataObject[data.questionsData[questionCount].question])
            {
                setOptionId(savedDataObject[data.questionsData[questionCount].question]);
                if(questionCount == data.questionsData.length-1)
                {
                    setQuestionFlag(0);
                }
                else 
                {
                setQuestionFlag(1);
                }
            }
            else 
            {
                setQuestionFlag(0);
                unansweredRadioColor();
            }
            
           }
           
    }

    const prevqueschange = () => {
        if(questionCounter>=1){
            const  questionCount = questionCounter - 1;
            setQuestionCounter(questionCount);
            setQuestion(data.questionsData[questionCount].question);
            setOption(data.questionsData[questionCount].options);
        
            console.log(savedDataObject);
            if(savedDataObject[data.questionsData[questionCount].question])
            {
                setOptionId(savedDataObject[data.questionsData[questionCount].question]);
                setQuestionFlag(1);
                console.log(savedDataObject[data.questionsData[questionCount].question]); 
            }
            else 
            {
                unansweredRadioColor();
            }
            }
          
    }

    const unansweredRadioColor =()=>
    {
        setOptionId('undefined');
    }

    const changeRadioColor = (selectedItem) =>
    {
        const optionValue = selectedItem              
        setOptionId(selectedItem)

        if(optionValue == selectedItem) 
        {
            setRadioColor('steelblue')
            setSavedDataObject((selectedData) => {
                selectedData[questionDataVariable] = selectedItem 
                return selectedData
            })
            setAnsweredQuestion((answeredItem)=>{
                if(!(questionCounter in answeredQuestions))
                {
                answeredItem.push(questionCounter+1);
                }
                else{
                    answeredItem.pop()
                    answeredItem.push(questionCounter+1);
                }
                return answeredItem
            })

        }
        if(questionCounter == data.questionsData.length-1)
        {
            setRadioFlag(1);
            setQuestionFlag(0);
        }
        if(questionCounter < data.questionsData.length-1)
        {
            setQuestionFlag(1);
        }

    }                                              
        const questionNavigator =(questionNumber)=>
        {
            setQuestion(data.questionsData[questionNumber-1].question);
            setOption(data.questionsData[questionNumber-1].options);
            if(savedDataObject[data.questionsData[questionNumber-1].question])
            {
                setOptionId(savedDataObject[data.questionsData[questionNumber-1].question]);
                if(questionNumber-1 == data.questionsData.length-1)
                {
                    setQuestionFlag(0);
                }
                else 
                {
                setQuestionFlag(1);
                }
            }
            else 
            {
                setQuestionFlag(0);
                unansweredRadioColor();
            }

        }




    console.log(answeredQuestions);

    return (
        <View style={styles.container}>
            <ScrollView>
            <View style={styles.greetingview}>
                <Text style={styles.greetingtext}>Hello , {route.params.inputName}</Text>
                <Text style={styles.greetsubtext}>This is Your test</Text>
            </View>
                <Text style={styles.answeredtext}>Answered Questions </Text>
            {/* 
                <Flatlist  horizontal={true} 
                data={answeredQuestions}
                renderItem={({item,index})=>
                <View style={styles.answeredItemView}>
                <Text style={styles.answeredItemText}>{item}</Text>
                </View>} />   */}

                <ScrollView horizontal={true}>
                {
                    answeredQuestions.map((item ,index)=>
                    <TouchableOpacity onPress={()=>questionNavigator(item)} key={index}>
                    <View style={styles.answeredItemView}>
                    <Text style={styles.answeredItemText}>{item}</Text>
                    </View></TouchableOpacity>)
                }
                </ScrollView>
           
            <View style={styles.questionsview}>
                <Text style={styles.questiontext}>       
                   {questionDataVariable}
                </Text>
                {
                optionData.map((optionItem ,index) =>
                <TouchableOpacity onPress={() => changeRadioColor(optionItem.option_id)} key={index}>
                <View style={styles.radioDisplay}>
                    <View style={{ ...styles.radioButton, ...{ backgroundColor:optionId == optionItem.option_id ? radioColor : 'white'} }}/>
                    <Text key={optionItem.option_id} style={styles.optiontext}>
                    {optionItem.option}                           
                    </Text>
                </View>
                </TouchableOpacity>)  
                }

            </View>
            <View style={styles.prevnextbutton}>
                <TouchableOpacity onPress={prevqueschange}>
                    <View style={styles.prevbutton}>
                        <Text style={styles.prevnextbuttontext}>Prev Ques</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={nextqueschange} disabled={(questionFlag == 0)} style={(questionFlag == 0)? {opacity : 0.5} :{opacity : 1}}>
                    <View style={styles.nextbutton}>
                        <Text style={styles.prevnextbuttontext}>Next Ques</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate('scorePage',{answers : savedDataObject })} disabled={(radioFlag ==0)} style={(radioFlag == 0)? {opacity : 0.5} :{opacity : 1}}>
                <View style={(radioFlag == 1) ? styles.submitstyle : styles.otherstyle}>
                    <Text style={( radioFlag == 1) ? styles.prevnextbuttontext : styles.othertext}>Submit</Text>

                </View>
            </TouchableOpacity>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create(
    {
        greetingtext:
        {
            fontSize : 20,
            color :'steelblue',
            textAlign : 'center',
            fontFamily : 'verdana',
            marginTop : 10,
        },
        greetsubtext :
        {
            textAlign : 'center',
            fontSize : 20,

        },
        questiontext :
        {
            fontSize : 30,
            color : 'slategray',
            marginLeft : 10,
        },
        questionsview :
        {
            marginLeft:15,
            marginTop:30,
            marginRight : 15,
            marginBottom : 20,
            borderColor : 'slategray',
            borderRadius : 20,
            borderWidth :2,
        } ,
        optiontext :
        {
            fontSize : 20,
            marginLeft : 10,
        },
        prevnextbutton:
        {
            flexDirection : 'row',
            justifyContent : 'space-between',
        },
        prevbutton :
        {
            height : 60,
            width : 120,
            backgroundColor :'steelblue',
            borderRadius :15,
            marginLeft : 20,
        },
        prevnextbuttontext:
        {
            fontSize : 20,
            color : 'white',
            textAlign :'center',
            marginTop : 15,
        },
        nextbutton :
        {
            height : 60,
            width : 120,
            backgroundColor :'steelblue',
            borderRadius : 15,
            marginRight :15,
        },
        radioDisplay :
        {
            flexDirection : 'row',
            margin : 20,
        },
        radioButton : 
        {
            height : 20,
            width : 20 ,
            borderColor : 'grey',
            borderRadius : 10,
            borderWidth : 2,
            backgroundColor: "white",
        },
        submitstyle :
        {
            height : 60,
            width : 120,
            backgroundColor :'steelblue',
            borderRadius : 15,
            marginRight :15,
            justifyContent :'center',
            alignItems : 'center',
            marginLeft : 140,
            marginTop : 20,
            
        },
        othertext:
        {

            fontSize : 0,
        },
        answeredItemView :
        {
            height : 50,
            width : 50,
            backgroundColor : 'steelblue',
            borderRadius : 20,
            marginLeft : 10,
            marginTop : 10,
        },
        answeredItemText :
        {
            fontSize : 20,
            color : 'white',
            textAlign :'center',
            marginTop : 10,
        },
        answeredtext :
        {
            padding : 10,
            width : 300,
            backgroundColor : 'steelblue',
            color : 'white',
            fontSize : 20,
            marginLeft : 60,
            textAlign :'center',
            borderRadius : 20,

        }
}
)

export default QuestionsPage