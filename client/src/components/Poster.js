import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { windowWidth } from "../util/WH";

export default function Poster({ data, isOnlyImg = false }) {
  const extractTextPattern = /(<([^>]+)>)/gi;
  // console.log(data);
  return (
    <View style={styles.container}>
      {data.image ? (
        <Image
          style={styles.posterImage}
          source={{
            uri: data.image,
          }}
        />
      ) : (
        <Image
          style={styles.posterImage}
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3D-lTi8YdxLGtoKSdAQXPwmFSnjfZCDNFsQ&usqp=CAU",
          }}
        />
      )}
      {isOnlyImg ? (
        <></>
      ) : (
        <Text style={styles.posterTitle} numberOfLines={2}>
          {data.title.replace(extractTextPattern, "")}
        </Text>
      )}
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
    // width: "100%",
    fontSize: 11,
    marginTop: 5,
    fontWeight: "bold",
  },
});
