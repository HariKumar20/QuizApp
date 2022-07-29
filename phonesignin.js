import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';

function QuizPhoneSignIn({navigation}) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [confirm , setConfirm] = useState('');
  const [otpFlag, setotpFlag] = useState(0);

  const createUserWithPhone = async () => {
    console.log(phoneNumber);
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);

    setConfirm(confirmation);
    setotpFlag(1);
  };

  const confirmotp = async () => {
    try {
      await confirm.confirm(code);
      console.log('OTP Verified');
      navigation.navigate('Home');
      
    } catch (e) {
      console.log('Invalid Code.');
    }
  };

  return !otpFlag ? (
    <View style={styles.container}>
      <View style={styles.phonesigninform}>
        <Text style={styles.label}>Enter Your Phone Number</Text>
        <TextInput
          style={styles.phoneinput}
          onChangeText={value => setPhoneNumber(value)}></TextInput>
        <TouchableOpacity onPress={createUserWithPhone}>
          <View style={styles.submitbutton}>
            <Text style={styles.submitext}>SEND OTP CODE</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.otpform}>
        <Text style={styles.otptitle}>OTP has been sent to {phoneNumber}</Text>
        <Text style={styles.otptitle}>Please Enter the OTP</Text>
        <TextInput
          style={styles.otpinput}
          onChangeText={value => setCode(value)}></TextInput>
        <TouchableOpacity onPress={confirmotp}>
          <View style={styles.submitotpbutton}>
            <Text style={styles.submitotptext}>SUBMIT OTP CODE</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default QuizPhoneSignIn;

const styles = StyleSheet.create({
  phonesigninform: {
    marginTop : 50,
    alignItems :'center',
    justifyContent :'center',
  },
  label: {
    fontSize: 20,
    marginLeft: 20,
  },
  phoneinput: {
    margin: 20,
    borderWidth: 2,
    borderColor: 'black',
    height: 60,
    width: 250,
  },
  submitbutton: {
    height: 60,
    width: 200,
    marginLeft: 20,
    backgroundColor: 'midnightblue',
    borderRadius: 10,
  },
  submitext: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    marginTop: 15,
  },
  otptitle: {
    fontSize: 20,
    color: 'blue',
    margin: 20,
  },
  otpinput: {
    borderBottomWidth: 1,
    height: 50,
    width: 250,
  },
  otpform: {
   alignItems :'center',
   justifyContent :'center',
  },
  submitotpbutton: {
    height: 60,
    width: 250,
    borderRadius: 10,
    backgroundColor: 'midnightblue',
    marginTop: 30,
  },
  submitotptext: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 15,
    color: 'white',
  },
});
