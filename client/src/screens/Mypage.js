import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { data, menus } from "../../dummy/data";
import MenuTap from "../components/MenuTap";

export default function Mypage({ navigation }) {
  const favoriteNum = data[0].favorite.length;

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          horizontal={false}
          contentContainerStyle={styles.resultContainer}
        >
          <View>
            <Text>좋아하는 영상 수 {favoriteNum}</Text>
          </View>
        </ScrollView>
        <View style={styles.MenuContainer}>
          {menus.map((menu) => (
            <MenuTap key={menu.id} title={menu.title} navigation={navigation} />
          ))}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  MenuContainer: {
    flexDirection: "row",
    backgroundColor: "#32AAFF",
  },
});
