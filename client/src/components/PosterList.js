import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Poster from "./Poster";

export default function PosterList({ user }) {
  const [{ name, favorite }] = user;

  return (
    <>
      <View
        style={{
          // width: 80,
          marginLeft: 5,
          // justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.userText}>님의 리스트</Text>
      </View>
      <View style={styles.userContainer}>
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
    </>
  );
}

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
    paddingTop: 8,
    // borderTopWidth: 1,
  },
  userName: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#32AAFF",
  },
  userText: {
    fontSize: 12,
    color: "#1e1e1e",
    paddingLeft: 5,
    paddingTop: 10,
    fontWeight: "bold",
  },
  favoriteListContainer: {
    minHeight: 150,
  },
});
