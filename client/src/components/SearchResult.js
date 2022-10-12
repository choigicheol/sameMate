import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import OverFlowText from "./OverFlowText";
import Poster from "./Poster";

export default function SearchResult({ movie, addUserMovie }) {
  const extractTextPattern = /(<([^>]+)>)/gi;
  const category = {
    title: "제목 : ",
    pubDate: "개봉 : ",
    director: "감독 : ",
    actor: "출연 : ",
  };
  const arrCategories = Object.keys(category);
  return (
    <View style={styles.resultContainer}>
      <Poster data={movie} />
      <View style={styles.resultInfo}>
        {arrCategories.map((cate, idx) => {
          return (
            <OverFlowText
              category={category[cate]}
              text={movie[cate].replace(extractTextPattern, "")}
              style={styles.resultInfoText}
              key={idx}
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
        <Text>담기</Text>
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
    borderColor: "#4e4e4e",
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
  },
  addButton: {
    width: 50,
    height: 30,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
});
