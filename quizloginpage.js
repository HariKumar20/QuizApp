import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {MyContext} from './App';
// import firebase from 'react-native-firebase';
// export const MyContext = createContext('MyContext');

GoogleSignin.configure({
  webClientId:
    '698475405257-avt2hq1llgtfemlquuabi7khljd5rq9p.apps.googleusercontent.com',
});

function QuizLogIn({navigation}) {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const {userId, setuserId} = useContext(MyContext);

  const userLogIn = () => {
    auth()
      .signInWithEmailAndPassword(userEmail, password)
      .then(() => {
        navigation.navigate('Home');
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        } else if (error.code === 'auth/wrong-password') {
        } else {
          navigation.navigate('signup');
        }

        console.log(error);
      });
  };
  const signupNavigator = () => {
    navigation.navigate('signup');
  };

  const phoneSignInNavigator = () => {
    navigation.navigate('phonesignin');
  };

  const googleSignIn = async () => {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    auth().signInWithCredential(googleCredential);
    navigation.navigate('Home');
  };

  // Handle user state changes
  function onAuthStateChanged(user) {
    if (user) {
      console.log('User Id : ', user.uid);
      setuserId(user.uid);
    }
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    // console.log(subscriber);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  console.log(user);
  return !user ? (
    <View style={styles.container}>
      <View style={styles.form}>
        <Image style={styles.logo} source={require('./quizlogo.png')} />
        <Text style={styles.login}>LOG IN</Text>
        <TextInput
          style={styles.inputform}
          placeholder="✉ Enter your Email Id"
          onChangeText={val => setUserEmail(val)}></TextInput>
        <TextInput
          style={styles.inputform}
          placeholder="Enter your Password"
          onChangeText={val => setPassword(val)}></TextInput>
        <TouchableOpacity onPress={() => userLogIn()}>
          <View style={styles.loginview}>
            <Text style={styles.logintext}>LOG IN</Text>
          </View>
        </TouchableOpacity>
        {/* <Text style={styles.line}>─</Text> */}

        <TouchableOpacity onPress={() => navigation.navigate('passwordreset')}>
            <Text style={styles.forgetpassword}>
              Forget Password ?
            </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => signupNavigator()}>
          <View style={styles.signup}>
            <Text style={styles.signuptext}>
              Don't have an account ? Sign up
            </Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => phoneSignInNavigator()}>
          <View style={styles.signup}>
            <Text style={styles.signuptext}>Log In With Phone Number</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => googleSignIn()}>
          <Image
            style={styles.authimage}
            source={require('./google-signin-button.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    navigation.replace('Home')
  );
}

export default QuizLogIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aliceblue',
  },
  logo: {
    height: 100,
    width: 100,
    marginBottom: 30,
  },
  form: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  login: {
    fontSize: 30,
    textAlign: 'center',
    color: 'royalblue',
  },
  inputform: {
    borderWidth: 2,
    borderColor: 'royalblue',
    borderRadius : 10,
    height: 60,
    width: 250,
    margin: 20,
  },
  loginview: {
    height: 50,
    width: 200,
    backgroundColor: 'midnightblue',
    borderRadius: 10,
  },
  logintext: {
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 20,
  },
  signup: {
    width: 300,
    height: 50,
    backgroundColor: 'royalblue',
    borderRadius: 10,
    marginTop: 20,
  },
  signuptext: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
    color: 'white',
  },
  authimage: {
    height: 60,
    width: 270,
    marginTop: 20,
  },
  forgetpassword :
  {
    fontSize : 20,
    color : 'midnightblue',
    margin : 10,
  }
  //   line :
  //   {
  //     fontSize : 80,
  //   }
});
