import React ,{useState}from "react";
import {Text , TextInput ,View , TouchableOpacity , StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';

function QuizSignUp({navigation})
{
    const [password , setPassword]=useState('');
    const [email,setEmail]=useState('');
    const [emailFlag , setEmailFlag] =useState('');

    const createaccount = ()=>
    {

        auth().createUserWithEmailAndPassword(email,password) 
        .then(() => {
          console.log('user created');
          navigation.navigate('login');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            setEmailFlag(1);
            console.log('That email address is already in use!');
          }
  
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
  
          console.error(error);
        });
    }
    return(
        <View style={styles.container}>
            <Text style={styles.pagetitle}>CREATE YOUR ACCOUNT</Text>
            <View style={styles.signupform}>
            <View style={styles.signupform}>
            <Text style={styles.formlable}>Name</Text>
            <TextInput style={styles.forminputs}></TextInput>
            <Text style={styles.formlable}>Date Of Birth</Text>
            <TextInput style={styles.forminputs}></TextInput>
            <Text style={styles.formlable} >Email</Text>
            <TextInput style={styles.forminputs} onChangeText={(value) => { setEmailFlag(0); setEmail(value)}}></TextInput>
            <Text style={(emailFlag) ? styles.emailexisttext : styles.other}>Email Already Exists!</Text>
            <Text style={styles.formlable}>Create Password</Text>
            <TextInput style={styles.forminputs}></TextInput>
            <Text style={styles.formlable}>Confirm Password</Text>
            <TextInput style={styles.forminputs} onChangeText={(value) => setPassword(value)}></TextInput>

            <TouchableOpacity onPress={() =>createaccount(email ,password)}>
            <View style={styles.signupbutton}>
                <Text style={styles.signuptext}>SIGN UP</Text>
            </View>
            </TouchableOpacity>
            </View>
            </View>
        </View>
    )
}

export default QuizSignUp

const styles = StyleSheet.create({
    container :
    {
        backgroundColor :'aliceblue',
        flex : 1,
        alignItems :'center',
        justifyContent :'center',
    },
    pagetitle :

    {
        fontSize : 20,
        textAlign : 'center',
        marginTop : 30,
        color :'royalblue',
    },
    signupform :
    {
       marginTop : 20,
    },
    forminputs : 
    {
        margin : 20,
        height : 40,
        width : 300,
        borderBottomWidth : 1,
        borderBottomColor : 'black',
      
    },
    formlable :
    {
        fontSize : 15,
        marginLeft : 20,
        color : 'black',
    },
    signupbutton :
    {
        height : 60,
        width : 300,
        borderRadius : 20,
        backgroundColor :'royalblue',
        marginLeft : 20,
    },
    signuptext :
    {
        color :'white',
        fontSize : 20,
        textAlign : 'center',
        marginTop : 15,
        
    },
    emailexisttext :
    {
        fontSize : 15,
        color :'red',
        marginLeft : 20,
        marginTop : 5,
    },
    other :
    {
        fontSize : 0,
    }
})