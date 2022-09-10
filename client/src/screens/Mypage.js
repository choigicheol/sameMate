import React from "react";
import { View, Text } from "react-native";
import { data } from "../../dummy/data";

export default function Mypage() {
  const favoriteNum = data[0].favorite.length;
  return (
    <View style={styles.container}>
      <View>
        <Text>좋아하는 영상 수 {favoriteNum}</Text>
      </View>
      <View style={styles.MenuContainer}>
        {menus.map((menu) => (
          <MenuTap key={menu.id} title={menu.title} navigation={navigation} />
        ))}
      </View>
    </View>
  );
}
