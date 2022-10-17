import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import WarningMessage from "../components/WarningMessage";
import { windowHeight, windowWidth } from "../util/WH";
import { db } from "../../firebaseConfig";
import { ref, update } from "firebase/database";
import { CheckEmail, GetHash } from "../util/Functions";

function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isWarning, setIsWarning] = useState({
    email: false,
    blank: false,
    password: false,
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const dbRef = ref(db);
  const regExp = new RegExp(
    /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/
  );

  const userSignup = async () => {
    const initWarning = {
      email: false,
      blank: false,
      password: false,
    };
    setIsWarning({
      email: false,
      blank: false,
      password: false,
    });
    const hashEmail = await GetHash(email);

    if (!email || !name || !password || !passwordConfirm) {
      initWarning.blank = true;
    } else if (password !== passwordConfirm) {
      initWarning.password = true;
    } else {
      if (await CheckEmail(hashEmail)) {
        initWarning.email = true;
      } else {
        setIsSuccess(true);
        const hashPassword = await GetHash(password);
        const userInfo = {};
        userInfo[`/users/${hashEmail}`] = {
          email,
          displayName: name,
          password: hashPassword,
        };
        update(dbRef, userInfo);
        setIsSuccess(false);
        navigation.navigate("Login");
      }
    }
    setIsWarning(initWarning);
  };

  const checkValidEmail = () => {
    if (!!email && !regExp.test(email)) setIsValidEmail(false);
    else setIsValidEmail(true);
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <ScrollView>
        <View
          style={[styles.container, styles.backgroundBlack, styles.alignCenter]}
        >
          {isSuccess ? (
            <ActivityIndicator size="large" color="tomato" />
          ) : (
            <>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 50,
                    color: "#32AAFF",
                    fontWeight: "bold",
                  }}
                >
                  Sign Up
                </Text>
              </View>
              <View style={{ flex: 2 }}>
                <Text style={styles.inputText}>Email</Text>
                <TextInput
                  style={[styles.signupInput]}
                  placeholder={"이메일"}
                  placeholderTextColor="#9e9e9e"
                  onChangeText={setEmail}
                  onEndEditing={() => {
                    checkValidEmail();
                  }}
                />
                {isWarning.email ? (
                  <WarningMessage
                    style={styles.warningMsg}
                    msg={"중복된 회원이 존재합니다."}
                  />
                ) : (
                  <></>
                )}
                {isValidEmail ? (
                  <></>
                ) : (
                  <WarningMessage
                    style={styles.warningMsg}
                    msg={"이메일 형식을 다시 확인해 주세요."}
                  />
                )}
                <Text style={styles.inputText}>Name</Text>
                <TextInput
                  style={styles.signupInput}
                  placeholder={"이름"}
                  placeholderTextColor="#9e9e9e"
                  onChangeText={setName}
                />
                <Text style={styles.inputText}>Password</Text>
                <TextInput
                  style={styles.signupInput}
                  placeholder={"비밀번호"}
                  secureTextEntry={true}
                  placeholderTextColor="#9e9e9e"
                  onChangeText={setPassword}
                />
                <Text style={styles.inputText}>Password Confirm</Text>
                <TextInput
                  style={[styles.signupInput, styles.marginBottom0]}
                  placeholder={"비밀번호 확인"}
                  secureTextEntry={true}
                  placeholderTextColor="#9e9e9e"
                  onChangeText={setPasswordConfirm}
                />
                {isWarning.password ? (
                  <WarningMessage
                    style={styles.warningMsg}
                    msg={"비밀번호가 일치하지 않습니다."}
                  />
                ) : (
                  <></>
                )}

                {isWarning.blank ? (
                  <WarningMessage
                    style={styles.warningMsg}
                    msg={"정보를 모두 입력해주세요"}
                  />
                ) : (
                  <></>
                )}

                <TouchableOpacity
                  style={styles.signupButton}
                  onPress={() => {
                    userSignup();
                  }}
                >
                  <Text style={styles.signupButtonText}>가입하기</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    height: windowHeight,
    width: windowWidth,
  },
  backgroundBlack: {
    backgroundColor: "#000000",
  },
  flexRow: {
    flexDirection: "row",
  },
  alignCenter: {
    justifyContent: "center",
  },
  signupInput: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#32AAFF",
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
    color: "#9e9e9e",
  },
  inputText: {
    color: "#32AAFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  warningMsg: {
    color: "tomato",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 15,
    width: "100%",
    textAlign: "center",
  },
  marginBottom0: {
    marginBottom: 0,
  },
  signupButtonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  signupButton: {
    backgroundColor: "#32AAFF",
    width: "100%",
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});

export default Signup;
