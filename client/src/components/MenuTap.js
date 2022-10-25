import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";

export default function MenuTap({ title, navigation }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate(title)}
    >
      <Text style={styles.menuText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  menuText: { color: "#9e9e9e" },
});
