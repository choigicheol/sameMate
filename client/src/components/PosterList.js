import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Poster from "./Poster";
import { windowWidth } from "../util/WH";

export default function PosterList({
  name,
  favorites,
  isOnlyImg,
  isDelete,
  isEditMode,
}) {
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
        {name ? <Text style={styles.userName}>{name}</Text> : <></>}
        {/* <Text style={styles.userText}>님의 리스트</Text> */}
      </View>
      <View style={styles.userContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.favoriteListContainer}
        >
          {favorites.length ? (
            favorites.map((favorite, idx) => (
              <Poster
                data={favorite}
                key={idx}
                isOnlyImg={isOnlyImg}
                isEditMode={isEditMode}
                isDelete={isDelete}
              />
            ))
          ) : (
            <View
              style={{
                width: windowWidth,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "bold", color: "#9e9e9e" }}>
                정보가 없습니다
              </Text>
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
    fontSize: 22,
    fontWeight: "bold",
    color: "#32AAFF",
    fontFamily: "oneMobile",
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
