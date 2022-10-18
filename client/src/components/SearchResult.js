import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import OverFlowText from "./OverFlowText";
import Poster from "./Poster";

export default function SearchResult({ movie, addUserMovie }) {
  const category = {
    title: "제목 : ",
    release_date: "개봉 : ",
    vote_average: "평점 : ",
    overview: "줄거리 : ",
  };
  const arrCategories = Object.keys(category);
  return (
    <View style={styles.resultContainer}>
      <Poster movie={movie} />
      <View style={styles.resultInfo}>
        {arrCategories.map((cate, idx) => {
          return (
            <OverFlowText
              category={category[cate]}
              text={movie[cate]}
              style={styles.resultInfoText}
              key={idx}
              name={cate}
            ></OverFlowText>
          );
        })}
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          addUserMovie(movie);
        }}
      >
        <Text style={{ color: "#ffffff" }}>담기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  resultContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 180,
    borderTopWidth: 1,
    borderColor: "#9e9e9e",
    borderStyle: "dashed",
    paddingTop: 10,
    paddingBottom: 10,
  },
  resultInfo: {
    height: "100%",
    flex: 1,
    marginLeft: 30,

    // justifyContent: "flex-start",
  },
  resultInfoText: {
    marginBottom: 10,
    color: "#9e9e9e",
  },
  addButton: {
    width: 50,
    height: 30,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
});
