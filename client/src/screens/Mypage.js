import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { menus } from "../../dummy/data";
import MenuTap from "../components/MenuTap";
import { setName, userSliceReset } from "../redux/slice/userSlice";
import { movieSliceReset } from "../redux/slice/movieSlice";
import { getAuth, signOut } from "firebase/auth";
import PosterList from "../components/PosterList";
import { ref, update } from "firebase/database";
import { db } from "../../firebaseConfig";

export default function Mypage({ navigation }) {
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditName, setIsEditName] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const movies = useSelector((state) => state.movie.movie_list);
  const userUid = useSelector((state) => state.user.uid);
  const userName = useSelector((state) => state.user.name);
  const [editName, setEditName] = useState(userName);
  const dbRef = ref(db);
  const loginType = useSelector((state) => state.user.loginType);

  const setLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(userSliceReset());
        dispatch(movieSliceReset());
      })
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        if (error) console.log("error");
      });
  };

  const deleteMovies = () => {
    setIsDelete(!isDelete);
    setIsEditMode(false);
  };

  const cancelEditName = () => {
    setIsEditName(false);
    setEditName(userName);
  };

  const updateUserName = () => {
    dispatch(setName(editName));
    const updates = {};
    updates[`/users/${userUid}/displayName`] = editName;
    update(dbRef, updates);
    setIsEditName(false);
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView horizontal={false}>
          <View style={[styles.centeredView, styles.alignBetween]}>
            <View style={[styles.alignLeft, { alignItems: "center" }]}>
              <Text style={[styles.userInfo, styles.infoCategory]}>이름 :</Text>
              {isEditName ? (
                <TextInput
                  style={styles.editInput}
                  value={editName}
                  placeholderTextColor="#9e9e9e"
                  onChangeText={setEditName}
                />
              ) : (
                <Text style={styles.userInfo}>{userName}</Text>
              )}
            </View>
            {isEditName ? (
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={styles.editNameButton}
                  onPress={() => {
                    updateUserName();
                  }}
                >
                  <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
                    확인
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.editNameButton, styles.cancelEditNameButton]}
                  onPress={() => {
                    cancelEditName();
                  }}
                >
                  <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
                    취소
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.editNameButton}
                onPress={() => {
                  setIsEditName(true);
                }}
              >
                <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
                  수정
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={[styles.centeredView, styles.alignLeft]}>
            <Text style={[styles.userInfo, styles.infoCategory]}>
              좋아하는 영상 :
            </Text>
            <Text style={styles.userInfo}>{movies.length}</Text>
          </View>

          <PosterList
            favorites={movies}
            isOnlyImg={false}
            isDelete={isDelete}
            isEditMode={isEditMode}
          />
          <View style={styles.centeredView}>
            {isEditMode ? (
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => deleteMovies()}
                >
                  <Text
                    style={{ color: "white", fontWeight: "bold", fontSize: 20 }}
                  >
                    확인
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.editButton, styles.cancelButton]}
                  onPress={() => setIsEditMode(!isEditMode)}
                >
                  <Text
                    style={{ color: "white", fontWeight: "bold", fontSize: 20 }}
                  >
                    취소
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setIsEditMode(!isEditMode)}
              >
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 20 }}
                >
                  편집
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
        <View style={[styles.centeredView, styles.alignBottom]}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => setLogout()}
          >
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              LogOut
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.MenuContainer}>
          {menus.map((menu) => (
            <MenuTap key={menu.id} title={menu.title} navigation={navigation} />
          ))}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000000" },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 5,
    paddingLeft: 5,
  },
  MenuContainer: {
    flexDirection: "row",
    backgroundColor: "#000000",
  },
  userInfoTitle: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 26,
    fontWeight: "bold",
    color: "#9e9e9e",
  },
  logoutButton: {
    backgroundColor: "orange",
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 20,
  },
  editButton: {
    justifyContent: "center",
    padding: 3,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    backgroundColor: "#32AAFF",
  },

  cancelButton: {
    backgroundColor: "tomato",
    marginLeft: 20,
  },

  userInfo: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#9e9e9e",
    fontFamily: "oneMobile",
    color: "#32AAFF",
  },
  alignLeft: {
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  infoCategory: {
    marginRight: 10,
    color: "#9e9e9e",
    fontSize: 16,
  },
  alignBottom: {
    justifyContent: "flex-end",
  },
  alignBetween: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingTop: 15,
    paddingBottom: 10,
  },
  editNameButton: {
    backgroundColor: "#32AAFF",
    borderRadius: 5,
    padding: 5,
    paddingRight: 10,
    paddingLeft: 10,
  },
  cancelEditNameButton: {
    marginLeft: 10,
    backgroundColor: "tomato",
  },
  editInput: {
    width: "60%",
    height: 35,
    borderWidth: 1,
    borderColor: "#32AAFF",
    borderRadius: 5,
    paddingLeft: 10,
    color: "#9e9e9e",
  },
});
