import React, { useRef } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Poster from "./Poster";
import { windowWidth } from "../util/WH";
import { useEffect } from "react";

export default function PosterList({
  name,
  favorites,
  isOnlyImg,
  isDelete,
  isEditMode,
  showOverview,
}) {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  }, [isEditMode]);

  return (
    <>
      <View
        style={{
          marginLeft: 5,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        {name ? <Text style={styles.userName}>{name}</Text> : <></>}
      </View>
      <View style={styles.userContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.favoriteListContainer}
          ref={scrollRef}
        >
          {favorites.length ? (
            favorites.map((favorite, idx) => (
              <Poster
                movie={favorite}
                key={idx}
                isOnlyImg={isOnlyImg}
                isEditMode={isEditMode}
                isDelete={isDelete}
                showOverview={showOverview}
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
