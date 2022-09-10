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
} from "react-native";

import { data } from "../../dummy/data";
import { windowWidth, windowHeight } from "../util/WH";

export default function Login({ navigation }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isEnter, setIsEnter] = useState(false);
  const [isMessage, setIsMessage] = useState(false);

  // data에서 일치하는 유저 있는지 확인
  const checkUser = (userInfo) => {
    setIsEnter(true);

    const user = data.filter(
      (el) => el.id === userInfo.id && el.password === userInfo.password
    );

    setIsEnter(false);

    if (!user.length) setIsMessage(true);
    else {
      setIsMessage(false);
      navigation.navigate("Home");
    }
  };

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
          {isMessage ? <Text>유저가 없습니다.</Text> : ""}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              checkUser({ id, password });
            }}
          >
            <Text style={styles.loginButtonText}>Login</Text>
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
  },
  loginInput: {
    width: windowWidth - 60,
    height: 50,
    borderWidth: 1,
    borderColor: "#32AAFF",
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 30,
  },
  loginText: {
    color: "#32AAFF",
    width: windowWidth - 60,
    fontSize: 16,
    fontWeight: "bold",
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: "#32AAFF",
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
});
