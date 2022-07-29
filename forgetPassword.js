import React, { useState } from "react";
import {View , Text, TextInput ,StyleSheet, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
function ForgetPassword({navigation})
{
    const [email , setEmail] =useState('');
    const [flag,setFlag] = useState(0);

    const sendPasswordlink =(email)=>
    {
        auth().sendPasswordResetEmail(email);
        console.log(email);
        setFlag(1);
    }
    return !flag ? 
        (<View style={styles.container}>
            <View style={styles.resetform}>
                <Text style={styles.text}>Forget Password ?</Text>
                <TextInput style={styles.input} placeholder="Enter Your Email" onChangeText={(value)=> setEmail(value)}></TextInput>
                <TouchableOpacity onPress={()=>sendPasswordlink(email)}>
                    <View style={styles.submit}>
                        <Text style={styles.submitext}>Send Email</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>) :
        (<View>
            <Text style={styles.text}>The Email had been sent.</Text>
        </View>)

    
}

export default ForgetPassword

const styles = StyleSheet.create(
    {
        input :
        {
            height : 60,
            width : 250,
            borderWidth : 2,
            borderBottomColor : 'black',
            margin : 20,
            borderRadius : 10,
        },
        submit :
        {
            height : 50,
            width : 200,
            borderWidth : 2,
            borderRadius : 20,
            backgroundColor : 'midnightblue',
        },
        resetform :
        {
            justifyContent :'center',
            alignItems :'center',
            marginTop : 30,
        },
        text :
        {
            fontSize : 20,
            color : 'royalblue',
            textAlign :'center',
            marginTop : 10,
        },
        submitext :
        {
            textAlign :'center',
            marginTop : 10,
            color :'white',
        }
    }
)