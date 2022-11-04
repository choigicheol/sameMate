import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";

export default function CountButton({ imageSrc, btnFunc }) {
  return (
    <TouchableOpacity style={styles.buttonStyle} onPress={() => btnFunc()}>
      <Image style={styles.countImageBox} source={imageSrc} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: "#9e9e9e",
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
  },
  countImageBox: {
    width: 20,
    height: 20,
  },
});
