import React, { useState } from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";
import { windowWidth } from "../util/WH";

export default function SearchBar({ getMovies }) {
  const [searchWord, setSearchWord] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchTap}
        onChangeText={(text) => setSearchWord(text)}
        onEndEditing={() => getMovies(searchWord)}
        placeholder={"검색어를 입력해주세요"}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  searchTap: {
    width: windowWidth - 20,
    height: 40,
    borderWidth: 1,
    borderColor: "#4e4e4e",
    borderRadius: 5,
    paddingLeft: 10,
  },
});
