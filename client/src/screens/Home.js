import React, { useState, useEffect, useCallback, useMemo } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

import MenuTap from "../components/MenuTap";
import { menus } from "../../dummy/data";
import PosterList from "../components/PosterList";
import { db } from "../../firebaseConfig";
import { getDatabase, ref, child, get } from "firebase/database";
import { useSelector, useDispatch } from "react-redux";
import { addMovie, deleteMovie } from "../redux/slice/movieSlice";

export default function Home({ navigation, route }) {
  const { userUid, userName } = route.params;
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movie.movie_list);

  const dbRef = ref(db);

  const getUserData = async () => {
    const result = await get(child(dbRef, `user-movies/${userUid}`));
    const data = [];
    if (result.exists()) {
      const movies = result.val();
      Object.keys(movies).map((el) => {
        data.push(movies[el]);
      });
      dispatch(addMovie(data));
    }
  };
  // const userData = useMemo(() => getUserData(), []);
  useEffect(() => {
    getUserData();
  }, [userUid]);

  // const getSameUsers = useCallback(() => {
  //   get(child(dbRef, `user-movies/${userUid}`)).then((snapshot) => {
  //     console.log(snapshot);
  //   });
  // });

  // useEffect(() => {
  //   getSameUsers();
  // }, []);

  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
        style={styles.scrollViewContainer}
      >
        <PosterList name={userName} favorites={movies} />
        <View
          style={{
            borderBottomWidth: 1,
            borderStyle: "dashed",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "orange",
              fontSize: 20,
              marginBottom: 10,
              marginTop: 10,
            }}
          >
            취향이 비슷한
          </Text>
        </View>
      </ScrollView>
      <View style={styles.MenuContainer}>
        {menus.map((menu) => (
          <MenuTap
            key={menu.id}
            title={menu.title}
            userUid={userUid}
            navigation={navigation}
          />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  MenuContainer: {
    flexDirection: "row",
    backgroundColor: "#32AAFF",
  },
});
