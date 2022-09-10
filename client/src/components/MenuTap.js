import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { windowWidth } from "../util/WH";

export default function MenuTap({ title, navigation }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate(title)}
    >
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
