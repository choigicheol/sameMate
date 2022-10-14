import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { menus } from "../../dummy/data";
import MenuTap from "../components/MenuTap";
import { userSliceReset } from "../redux/slice/userSlice";
import { movieSliceReset, deleteMovie } from "../redux/slice/movieSlice";
import { getAuth, signOut } from "firebase/auth";
import PosterList from "../components/PosterList";

export default function Mypage({ navigation }) {
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const movies = useSelector((state) => state.movie.movie_list);
  const userName = useSelector((state) => state.user.name);

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

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          horizontal={false}
          contentContainerStyle={styles.resultContainer}
        >
          <View style={[styles.centeredView, styles.alignLeft]}>
            <Text style={[styles.userInfo, styles.infoCategory]}>닉네임 :</Text>
            <Text style={styles.userInfo}>{userName}</Text>
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
    marginTop: 5,
    color: "#9e9e9e",
    fontSize: 16,
  },
  alignBottom: {
    justifyContent: "flex-end",
  },
});
