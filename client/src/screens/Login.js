import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from "react-native";

import { windowWidth, windowHeight } from "../util/WH";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  onAuthStateChanged,
} from "firebase/auth";
import { setUser } from "../redux/slice/userSlice";
import { useDispatch } from "react-redux";
import { get, ref, update, child } from "firebase/database";
import { db } from "../../firebaseConfig";
import {
  GOOGLE_CLIENT_ID,
  ANDROID_GOOGLE_CLIENT_ID,
} from "react-native-dotenv";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { initializeApp } from "firebase/app";
import { CheckEmail, GetHash } from "../util/Functions";

initializeApp({
  apiKey: "AIzaSyBxN4EyG1xSXOp5zWKBS-svPd93RUVZtCQ",
  authDomain: "samemate-ee922.firebaseapp.com",
  projectId: "samemate-ee922",
  storageBucket: "samemate-ee922.appspot.com",
  messagingSenderId: "320208000348",
  appId: "1:320208000348:web:6489535f23dfd414c15d99",
  measurementId: "G-2WLXW23624",
  databaseURL: "https://samemate-ee922-default-rtdb.firebaseio.com/",
});

WebBrowser.maybeCompleteAuthSession();

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEnter, setIsEnter] = useState(false);
  const [isWarning, setIsWarning] = useState(false);

  const dispatch = useDispatch();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId: GOOGLE_CLIENT_ID,
    androidClientId: ANDROID_GOOGLE_CLIENT_ID,
  });

  const openGoogleLogin = () => {
    promptAsync();
  };

  const auth = getAuth();
  const dbRef = ref(db);

  useEffect(() => {
    if (response?.type === "success") {
      setIsEnter(true);
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  const setUserName = (uid, displayName) => {
    const updates = {};
    updates["/userName/" + uid] = displayName;
    update(dbRef, updates);
  };

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      let { uid, email, displayName, accessToken } = user;
      get(child(dbRef, `userName/${uid}`)).then((data) => {
        if (data.exists()) {
          const userName = data.val();
          displayName = userName;
        } else {
          setUserName(uid, displayName);
        }
        dispatch(
          setUser({
            uid,
            email,
            name: displayName,
            accessToken,
            isLogin: true,
            loginType: "google",
          })
        );
      });
      navigation.navigate("Home");
      setIsEnter(false);
    }
  });

  const userSignIn = async () => {
    setIsWarning(false);
    const hashEmail = await GetHash(email);
    if (await CheckEmail(hashEmail)) {
      const inputPassword = await GetHash(password);
      const dbUserInfo = await get(child(dbRef, `users/${hashEmail}`));
      const userInfoValue = dbUserInfo.val();
      if (userInfoValue.password === inputPassword) {
        const { email, displayName, accessToken } = userInfoValue;
        dispatch(
          setUser({
            uid: hashEmail,
            email,
            name: displayName,
            accessToken,
            isLogin: true,
            loginType: "init",
          })
        );
        setUserName(hashEmail, displayName);
        navigation.navigate("Home");
      }
    } else setIsWarning(true);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        {isEnter ? (
          <View style={[styles.centered, styles.backgroundBlack]}>
            <ActivityIndicator size="large" color="tomato" />
          </View>
        ) : (
          <>
            <View style={styles.titleBox}>
              <Text style={styles.title}>추천좀</Text>
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.loginText}>ID</Text>
              <TextInput
                style={styles.loginInput}
                placeholder={"아이디"}
                placeholderTextColor="#9e9e9e"
                onChangeText={setEmail}
              />
              <Text style={styles.loginText}>PassWord</Text>
              <TextInput
                style={styles.loginInput}
                placeholder={"비밀번호"}
                secureTextEntry={true}
                placeholderTextColor="#9e9e9e"
                onChangeText={setPassword}
              />

              <View style={styles.warningContainer}>
                {isWarning ? (
                  <Text style={styles.warningMsg}>
                    일치하는 회원이 없습니다.
                  </Text>
                ) : (
                  ""
                )}
              </View>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => {
                  userSignIn();
                }}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.googleLoginButton}
                disabled={!request}
                onPress={() => {
                  openGoogleLogin();
                }}
              >
                <Image
                  style={{ width: "100%", height: "100%" }}
                  source={require("../assets/googleButton.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.signupButton}
                onPress={() => {
                  navigation.navigate("Signup");
                }}
              >
                <Text style={styles.signupButtonText}>SignUp</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleBox: {
    width: windowWidth - 60,
    height: windowHeight / 3,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  title: {
    fontSize: 50,
    color: "#32AAFF",
    fontWeight: "bold",
  },
  inputBox: {
    flex: 2,
    alignItems: "center",
  },
  loginInput: {
    width: windowWidth - 60,
    height: 50,
    borderWidth: 1,
    borderColor: "#32AAFF",
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
    color: "#9e9e9e",
  },
  loginText: {
    color: "#32AAFF",
    width: windowWidth - 60,
    fontSize: 16,
    fontWeight: "bold",
  },
  warningContainer: {
    height: 20,
    marginBottom: 15,
    alightItems: "center",
    justifyContent: "center",
  },
  warningMsg: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#32AAFF",
    width: windowWidth - 60,
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  googleLoginButton: {
    marginTop: 25,
    width: (windowWidth - 60) / 2,
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  signupButton: {
    marginTop: 30,
    width: (windowWidth - 60) / 2,
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  signupButtonText: {
    fontSize: 20,
    color: "#32AAFF",
    fontWeight: "bold",
  },
  backgroundBlack: {
    backgroundColor: "#000000",
  },
});
