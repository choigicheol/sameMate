import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import MenuTap from "../components/MenuTap";
import { menus } from "../../dummy/data";
import PosterList from "../components/PosterList";
import { db } from "../../firebaseConfig";
import { getDatabase, ref, child, get } from "firebase/database";
import { useSelector, useDispatch } from "react-redux";
import {
  setMovie,
  deleteMovie,
  setSameUserData,
} from "../redux/slice/movieSlice";

import { setSameUserList } from "../redux/slice/userSlice";
import { windowHeight } from "../util/WH";

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movie.movie_list);
  const sameUserMovies = useSelector((state) => state.movie.sameUserData);
  const userUid = useSelector((state) => state.user.uid);
  const sameUsers = useSelector((state) => state.user.sameUserList);
  const userName = useSelector((state) => state.user.name);
  const dbRef = ref(db);
  const [isLoading, setIsLoading] = useState(false);

  const getUserData = async (uid) => {
    const result = await get(child(dbRef, `user-movies/${uid}`));
    const data = [];
    if (result.exists()) {
      const movies = result.val();
      Object.keys(movies).map((el) => {
        data.push(movies[el]);
      });
    }
    dispatch(setMovie(data));
  };

  const getSameUsersUid = async () => {
    const result = new Set();
    const getMovies = await get(child(dbRef, `user-movies/${userUid}`));
    if (getMovies.exists()) {
      const moviesVal = getMovies.val();
      const movieKeys = Object.keys(moviesVal);

      for (let i = 0; i < movieKeys.length; i++) {
        const users = await get(child(dbRef, `all-movies/${movieKeys[i]}`));
        if (users.exists()) {
          const objUsers = users.val();
          const usersKey = Object.keys(objUsers).filter(
            (key) => key !== userUid
          );
          usersKey.map((el) => result.add(el));
        }
      }
    }

    const arrResult = Array.from(result);
    dispatch(setSameUserList(arrResult));
  };

  useEffect(() => {
    setIsLoading(true);
    getSameUsersUid(movies);
    getUserData(userUid);
  }, [userUid, movies.length]);

  const getAnotherUsersData = async () => {
    const data = [];
    for (let i = 0; i < sameUsers.length; i++) {
      const userDb = await get(child(dbRef, `user-movies/${sameUsers[i]}`));
      const userName = await get(child(dbRef, `userName/${sameUsers[i]}`));
      if (userDb.exists()) {
        const movies = userDb.val();
        const arrMovies = Object.keys(movies).map((el) => movies[el]);
        const name = userName.val();
        data.push([name, arrMovies]);
      }
    }
    dispatch(setSameUserData(data));
    setIsLoading(false);
  };

  useEffect(() => {
    getAnotherUsersData();
  }, [sameUsers]);

  return (
    <>
      {isLoading ? (
        <View
          style={{
            backgroundColor: "#000000",
            height: windowHeight - 74,
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="tomato" />
        </View>
      ) : (
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
              />
              <View
                style={{
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                <Text style={styles.recommendationList}>추천 목록 🗒</Text>
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
                  style={{ color: "#9e9e9e", fontWeight: "bold", fontSize: 20 }}
                >
                  정보가 없습니다.
                </Text>
                <Text
                  style={{ color: "#9e9e9e", fontWeight: "bold", fontSize: 20 }}
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
          {sameUserMovies.map((data, idx) => (
            <PosterList
              key={idx}
              name={data[0]}
              favorites={data[1]}
              isOnlyImg={false}
            />
          ))}
        </ScrollView>
      )}
      <View style={styles.MenuContainer}>
        {menus.map((menu) => (
          <MenuTap key={menu.id} title={menu.title} navigation={navigation} />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: "#000000",
  },
  MenuContainer: {
    flexDirection: "row",
    backgroundColor: "#000000",
  },
  recommendationList: {
    borderBottomWidth: 5,
    borderColor: "#ffffff",
    fontWeight: "bold",
    color: "#ffffff",
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10,
    paddingBottom: 10,
    marginLeft: 5,
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
});
