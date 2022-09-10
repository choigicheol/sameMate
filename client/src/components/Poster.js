import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { windowWidth } from "../util/WH";

export default function Poster({ data, isOnlyImg = false }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.posterImage}
        source={{
          uri: data.image,
        }}
      />
      {isOnlyImg ? <></> : <Text style={styles.posterTitle}>{data.title}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth / 4,
    alignItems: "center",
    paddingLeft: 1,
    paddingRight: 1,
  },
  posterImage: {
    width: "100%",
    height: 150,
    borderRadius: 2,
  },
  posterTitle: {
    fontSize: 11,
    marginTop: 5,
    fontWeight: "bold",
  },
});
