import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import SearchBar from "../components/SearchBar";
import { videos, menus } from "../../dummy/data";
import Poster from "../components/Poster";
import MenuTap from "../components/MenuTap";
import { windowWidth } from "../util/WH";
import axios from "axios";
import OverFlowText from "../components/OverFlowText";
import SearchResult from "../components/SearchResult";
import { CLIENT_ID, CLIENT_KEY } from "react-native-dotenv";
// import { useQuery } from "@tanstack/react-query";

export default function Search({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const getMovies = async (word) => {
    if (word.length > 1) {
      setIsSearching(true);
      const result = await axios.get(
        `https://openapi.naver.com/v1/search/movie.json?query=${word}&display=100`,
        {
          headers: {
            "X-Naver-Client-Id": CLIENT_ID,
            "X-Naver-Client-Secret": CLIENT_KEY,
          },
        }
      );

      if (result.data) {
        setMovies(result.data.items);
      }
      setIsSearching(false);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.marginTB10}>
          <SearchBar getMovies={getMovies} />
        </View>
        <View style={styles.resultLengthBox}>
          <Text
            style={styles.resultLength}
          >{`검색 결과 : ${movies.length} 개`}</Text>
        </View>
        {isSearching ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size="large" color="tomato" />
          </View>
        ) : (
          <ScrollView
            horizontal={false}
            contentContainerStyle={styles.resultContainer}
          >
            {movies.map((movie, idx) => (
              <SearchResult movie={movie} key={idx} />
            ))}
          </ScrollView>
        )}
      </View>
      <View style={styles.MenuContainer}>
        {menus.map((menu) => (
          <MenuTap key={menu.id} title={menu.title} navigation={navigation} />
        ))}
      </View>
    </>
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
  },
  resultLengthBox: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 10,
  },
  resultLength: { marginBottom: 10, fontWeight: "bold", color: "#4e4e4e" },

  MenuContainer: {
    flexDirection: "row",
    backgroundColor: "#32AAFF",
  },
});
