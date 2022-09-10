import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

import MenuTap from "../components/MenuTap";
import { data, menus } from "../../dummy/data";
import PosterList from "../components/PosterList";

export default function Home({ navigation, route }) {
  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
        style={styles.scrollViewContainer}
      >
        <PosterList user={data} />
        <View
          style={{
            borderBottomWidth: 1,
            borderStyle: "dashed",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "orange",
              fontSize: 20,
              marginBottom: 10,
              marginTop: 10,
            }}
          >
            취향이 비슷한
          </Text>
        </View>
        <PosterList user={data} />
        <PosterList user={data} />
        <PosterList user={data} />
      </ScrollView>
      <View style={styles.MenuContainer}>
        {menus.map((menu) => (
          <MenuTap key={menu.id} title={menu.title} navigation={navigation} />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  MenuContainer: {
    flexDirection: "row",
    backgroundColor: "#32AAFF",
  },
});
