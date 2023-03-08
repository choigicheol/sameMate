import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import PosterList from "../components/PosterList";
import { db } from "../../firebaseConfig.js";
import { ref, child, get } from "firebase/database";
import { useSelector, useDispatch } from "react-redux";
import { setMovie, setSameUserData } from "../redux/slice/movieSlice";
import { setSameUserList } from "../redux/slice/userSlice";
import { OverviewModal } from "../components/OverviewModal";
import { useFocusEffect } from "@react-navigation/native";
import CountButton from "../components/CountButton";
import HamburgerButton from "../components/HamburgerButton";

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movie.movie_list);
  const sameUserMovies = useSelector((state) => state.movie.sameUserData);
  const userUid = useSelector((state) => state.user.uid);
  const sameUsers = useSelector((state) => state.user.sameUserList);
  const userName = useSelector((state) => state.user.name);
  const dbRef = ref(db);
  const [isLoading, setIsLoading] = useState(false);
  const [selectMovie, setSelectMovie] = useState({});
  const [isShowModal, setIsShowModal] = useState(false);
  const [userMovieKeys, setUserMovieKeys] = useState([]);
  const [count, setCount] = useState(1);
  const [isReScan, setIsReScan] = useState(true);
  const [sameDataNum, setSameDataNum] = useState(10);
  const isOptionModal = useSelector((state) => state.option.isOptionModal);

  const setSameUsersUid = async () => {
    dispatch(setSameUserList([]));
    const data = {};
    const result = [];

    for (let i = 0; i < userMovieKeys.length; i++) {
      const users = await get(child(dbRef, `allMovies/${userMovieKeys[i]}`));

      if (users.exists()) {
        const objUsers = users.val();
        Object.keys(objUsers)
          .filter((key) => key !== userUid)
          .map((el) => {
            if (data[el]) {
              data[el]++;
            } else {
              data[el] = 1;
            }
          });
      }
    }

    for (let key in data) {
      result.push([key, data[key]]);
    }
    result.sort((a, b) => b[1] - a[1]);

    dispatch(setSameUserList(result));

    if (!result.length) setIsLoading(false);
  };

  const getUserData = async (uid) => {
    setUserMovieKeys([]);
    const result = await get(child(dbRef, `userMovies/${uid}`));
    const data = [];
    const keys = [];
    if (result.exists()) {
      const movies = result.val();
      for (let key in movies) {
        data.push(movies[key]);
        keys.push(key);
      }
      setUserMovieKeys(keys);
    } else {
      setIsLoading(false);
    }
    dispatch(setMovie(data));
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserData(userUid);
      console.log(userUid);
      setCount(1);
    }, [])
  );

  const getSameUserData = async () => {
    setIsReScan(true);
    const data = [];

    for (let i = 0; i < sameUsers.length; i++) {
      if (sameUsers[i][1] >= count) {
        const userDb = await get(child(dbRef, `userMovies/${sameUsers[i][0]}`));
        const userName = await get(child(dbRef, `users/${sameUsers[i][0]}`));
        if (userDb.exists()) {
          const movies = userDb.val();
          const arrMovies = Object.keys(movies).map((el) => movies[el]);
          const name = userName.val().displayName;
          data.push([name, arrMovies]);
        }
      }
    }

    dispatch(setSameUserData(data));
    setIsLoading(false);
    setIsReScan(false);
  };

  useEffect(() => {
    setSameUsersUid();
  }, [userMovieKeys, movies]);

  useEffect(() => {
    getSameUserData();
  }, [sameUsers, movies]);

  const showOverview = (movie) => {
    if (movie) setSelectMovie(movie);
    setIsShowModal(!isShowModal);
  };

  const counter = (type) => {
    if (type === "plus" && count < movies.length) setCount(count + 1);
    else if (type === "minus" && count > 1) setCount(count - 1);
  };

  return (
    <>
      {isLoading ? (
        <View style={styles.centeredView}>
          <ActivityIndicator size="large" color="tomato" />
        </View>
      ) : (
        <>
          {/* <HamburgerButton /> */}

          <ScrollView
            keyboardShouldPersistTaps={"handled"}
            style={styles.scrollViewContainer}
          >
            {movies.length ? (
              <>
                <PosterList
                  name={userName}
                  favorites={movies}
                  isOnlyImg={false}
                  showOverview={showOverview}
                />
                <View
                  style={{
                    marginTop: 10,
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.recommendationList}>추천 목록 🗒</Text>
                </View>
                <View
                  style={[
                    styles.centeredView,
                    {
                      marginBottom: 10,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 12,
                      borderBottomWidth: 1,
                      borderColor: "#ffffff",
                    }}
                  >
                    {"최소 일치 개수"}
                  </Text>
                </View>
                <View style={[styles.centeredView, { flexDirection: "row" }]}>
                  <CountButton
                    imageSrc={require("../assets/minus_icon.png")}
                    btnFunc={() => counter("minus")}
                  />
                  <Text style={{ color: "#ffffff", fontSize: 30 }}>
                    {count}
                  </Text>
                  <CountButton
                    imageSrc={require("../assets/plus_icon.png")}
                    btnFunc={() => counter("plus")}
                  />
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => getSameUserData()}
                  >
                    <Text style={{ color: "#ffffff" }}>{"확인"}</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: 150,
                  }}
                >
                  <Text
                    style={{
                      color: "#9e9e9e",
                      fontWeight: "bold",
                      fontSize: 20,
                    }}
                  >
                    정보가 없습니다.
                  </Text>
                  <Text
                    style={{
                      color: "#9e9e9e",
                      fontWeight: "bold",
                      fontSize: 20,
                    }}
                  >
                    Search 탭에서 영화를 담아보세요
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    style={styles.moveButton}
                    onPress={() => {
                      navigation.navigate("Search");
                    }}
                  >
                    <Text style={styles.moveButtonText}>이동하기</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
            {isReScan ? (
              <View style={{ width: "100%", height: "100%" }}>
                <ActivityIndicator size="large" color="tomato" />
              </View>
            ) : (
              sameUserMovies.map((data, idx) => (
                <PosterList
                  key={idx}
                  name={data[0]}
                  favorites={data[1]}
                  isOnlyImg={false}
                  showOverview={showOverview}
                />
              ))
            )}
            {!sameUserMovies.length && !!movies.length && (
              <View style={styles.centeredView}>
                <Text style={{ color: "#ffffff", marginTop: 20, fontSize: 16 }}>
                  {"일치하는 유저가 없습니다"}
                </Text>
              </View>
            )}
            <OverviewModal
              movie={selectMovie}
              state={isShowModal}
              hideModal={() => setIsShowModal(false)}
              showModal={() => setIsShowModal(true)}
            />
          </ScrollView>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: "#000000",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  recommendationList: {
    borderBottomWidth: 5,
    borderColor: "#ffffff",
    fontWeight: "bold",
    color: "#ffffff",
    fontSize: 26,
    marginBottom: 10,
    marginTop: 10,
    paddingBottom: 10,
    width: "90%",
    textAlign: "center",
    borderRadius: 10,
  },
  moveButton: {
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: "#32AAFF",
  },
  moveButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 20,
  },
  confirmButton: {
    backgroundColor: "#32AAFF",
    borderRadius: 5,
    width: 40,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
