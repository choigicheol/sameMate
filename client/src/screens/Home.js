import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Poster from "../components/Poster";

import { windowWidth } from "../util/WH";

import MenuTap from "../components/MenuTap";
import { data } from "../../dummy/data";

export default function Home({ navigation, route }) {
  const [{ id, name, favorite }] = data;

  const menus = [
    { id: 1, title: "Home" },
    { id: 2, title: "Search" },
    { id: 3, title: "Mypage" },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
        style={styles.scrollViewContainer}
      >
        <View>
          {/* <View style={{ flexDirection: "row" }}> */}
          <View style={styles.userNameContainer}>
            <Text style={styles.userName}>{name}</Text>
            <Text style={styles.userText}>님의 리스트</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.favoriteListContainer}
          >
            {favorite.length ? (
              favorite.map((el) => <Poster data={el} key={el.id} />)
            ) : (
              <View
                style={{
                  width: windowWidth,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>정보가 없습니다</Text>
              </View>
            )}
          </ScrollView>
        </View>
        <View>
          <Text>dkssud</Text>
        </View>
      </ScrollView>
      <View style={styles.MenuContainer}>
        {menus.map((menu) => (
          <MenuTap key={menu.id} title={menu.title} navigation={navigation} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContainer: {
    flex: 1,
  },
  userNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 10,
  },

  userName: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#32AAFF",
  },
  userText: {
    fontSize: 16,
    color: "#1e1e1e",
    paddingLeft: 5,
    paddingTop: 10,
    fontWeight: "bold",
  },
  MenuContainer: {
    height: 60,
    flexDirection: "row",
    width: windowWidth,
  },
  favoriteListContainer: {
    height: "auto",
    minHeight: 150,
  },
});
