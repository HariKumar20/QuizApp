import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function NameInput({navigation, modalVisible, modalDisable}) {
  const [userName, setUser] = useState('');
  useEffect(() => {
    console.log('name input use effect');
  }, []);

  const storeName = async value => {
    try {
      setUser(value);
      await AsyncStorage.setItem('name', value);
    } catch (e) {
      console.log('The error is ', e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textInputView}>
        <Text style={styles.titletext}>Please ! Enter Your Name.</Text>
        <TextInput
          style={styles.inputText}
          onChangeText={text => {
            storeName(text);
          }}></TextInput>
        <View style={styles.buttonsView}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <View style={styles.cancelbutton}>
              <Text style={styles.canceltext}>Cancel</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => {
              navigation.navigate('questionPage', {inputName: userName});
            }}
            disabled={userName == ''}
            style={userName == '' ? styles.trueOpactity : styles.falseOpacity}>
            <View style={styles.submitbutton}>
              <Text style={styles.submittext}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default NameInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  titletext: {
    fontSize: 20,
    marginLeft: 20,
    marginTop: 20,
    color: 'navyblue',
    fontWeight: 'bold',
  },
  textInputView: {
    width: 320,
    marginLeft: 50,
    marginTop: 200,
    backgroundColor: 'aliceblue',
  },
  inputText: {
    borderBottomWidth: 1,
    borderColor: 'black',
    width: 250,
    marginLeft: 40,
  },
  cancelbutton: {
    height: 50,
    width: 90,
    backgroundColor: 'steelblue',
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 20,
  },
  submitbutton: {
    height: 50,
    width: 90,
    backgroundColor: 'steelblue',
    borderRadius: 10,
    marginTop: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  canceltext: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
  },
  submittext: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  othertext: {
    fontSize: 0,
  },
  trueOpactity: {
    opacity: 0.5,
  },
});
