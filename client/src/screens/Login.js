import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from "react-native";

import { windowWidth, windowHeight } from "../util/WH";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  onAuthStateChanged,
} from "firebase/auth";
import { setUser } from "../redux/slice/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { ref, set, child, push, update } from "firebase/database";
import { db } from "../../firebaseConfig";
import { GOOGLE_CLIENT_ID } from "react-native-dotenv";
initializeApp({
  apiKey: "AIzaSyBxN4EyG1xSXOp5zWKBS-svPd93RUVZtCQ",
  authDomain: "samemate-ee922.firebaseapp.com",
  databaseURL: "https://samemate-ee922-default-rtdb.firebaseio.com",
  projectId: "samemate-ee922",
  storageBucket: "samemate-ee922.appspot.com",
  messagingSenderId: "320208000348",
  appId: "1:320208000348:web:6489535f23dfd414c15d99",
  measurementId: "G-2WLXW23624",
  databaseURL: "https://samemate-ee922-default-rtdb.firebaseio.com/",
});

WebBrowser.maybeCompleteAuthSession("https://expo.dev");

export default function Login({ navigation }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isEnter, setIsEnter] = useState(false);
  const [isMessage, setIsMessage] = useState(false);
  const dispatch = useDispatch();
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: GOOGLE_CLIENT_ID,
  });

  const auth = getAuth();

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
    update(ref(db), updates);
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid, email, displayName, accessToken } = user;
      dispatch(
        setUser({ uid, email, name: displayName, accessToken, isLogin: true })
      );
      setUserName(uid, displayName);
      setIsEnter(false);
      navigation.navigate("Home");
    }
  });

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>Same Mate</Text>
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.loginText}>ID</Text>
          <TextInput
            style={styles.loginInput}
            placeholder={"아이디"}
            onChangeText={setId}
          />
          <Text style={styles.loginText}>PassWord</Text>
          <TextInput
            style={styles.loginInput}
            placeholder={"비밀번호"}
            onChangeText={setPassword}
          />
          {isEnter ? <ActivityIndicator size="large" color="tomato" /> : ""}
          <View style={styles.warningContainer}>
            {isMessage ? (
              <Text style={styles.warningMsg}>일치하는 회원이 없습니다.</Text>
            ) : (
              ""
            )}
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={() => {}}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.googleLoginButton}
            onPress={() => {
              promptAsync();
            }}
          >
            <Image
              style={{ width: "100%", height: "100%" }}
              source={require("../assets/googleButton.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.signupButton} onPress={() => {}}>
            <Text style={styles.signupButtonText}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
});
