import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import OverFlowText from "./OverFlowText";
import Poster from "./Poster";

export default function SearchResult({ movie }) {
  const extractTextPattern = /(<([^>]+)>)/gi;
  const category = [
    {
      title: "제목 : ",
    },
    { pubDate: "개봉 : " },
    { director: "감독 : " },
    { actor: "출연 : " },
  ];

  return (
    <View style={styles.resultContainer}>
      <Poster data={movie} isOnlyImg={true} />
      <View style={styles.resultInfo}>
        {category.map((el) => {
          const key = Object.keys(el)[0];
          return movie[key] !== "" ? (
            <OverFlowText
              text={`${el[key]}${movie[key].replace(extractTextPattern, "")}`}
              style={styles.resultInfoText}
            ></OverFlowText>
          ) : (
            <></>
          );
        })}
      </View>
      <TouchableOpacity style={styles.addButton}>
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
