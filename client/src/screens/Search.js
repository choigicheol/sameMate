import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import SearchBar from "../components/SearchBar";
import { videos } from "../../dummy/data";
import Poster from "../components/Poster";
import MenuTap from "../components/MenuTap";
import { windowWidth } from "../util/WH";

export default function Search({ navigation }) {
  const [searchResult, setSearchResult] = useState([]);

  const getVideo = (word) => {
    const result = videos.filter((video) => video.title.includes(word));
    setSearchResult(result);
  };

  const menus = [
    { id: 1, title: "Home" },
    { id: 2, title: "Search" },
    { id: 3, title: "Mypage" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.marginTB10}>
        <SearchBar getVideo={getVideo} />
      </View>

      <ScrollView
        horizontal={false}
        contentContainerStyle={styles.resultContainer}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            borderBottomWidth: 1,
          }}
        >
          <Text
            style={{ marginBottom: 10, fontWeight: "bold" }}
          >{`검색 결과 : ${searchResult.length} 개`}</Text>
        </View>
        {searchResult.map((result) => (
          <View style={styles.resultList}>
            <Poster data={result} key={result.id} isOnlyImg={true} />
            <View style={styles.resultInfo}>
              <Text>제목 : 영화 드라마 예능</Text>
              <Text>개봉일 : 2021. 04. 05</Text>
              <Text>출연 : 누구누구</Text>
            </View>
            <TouchableOpacity style={styles.addButton}>
              <Text>담기</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <View style={styles.MenuContainer}>
        {menus.map((menu) => (
          <MenuTap key={menu.id} title={menu.title} navigation={navigation} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  marginTB10: {
    marginTop: 10,
    marginBottom: 10,
  },
  resultContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    // paddingTop: 10,
    // paddingBottom: 10,
  },
  resultList: {
    flexDirection: "row",
    // justifyContent: "space-around",
    justifyContent: "space-between",
    width: "100%",
    height: 180,
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  resultInfo: {
    justifyContent: "space-between",
  },

  addButton: {
    width: 50,
    height: 30,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  MenuContainer: {
    height: 60,
    flexDirection: "row",
  },
});
