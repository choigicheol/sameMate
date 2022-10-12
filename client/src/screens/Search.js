import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Modal,
} from "react-native";
import SearchBar from "../components/SearchBar";
import { menus } from "../../dummy/data";
import MenuTap from "../components/MenuTap";
import axios from "axios";
import SearchResult from "../components/SearchResult";
import { NAVER_API_CLIENT_ID, NAVER_API_CLIENT_KEY } from "react-native-dotenv";
import { db } from "../../firebaseConfig";
import { ref, update } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { addMovie } from "../redux/slice/movieSlice";
import { JSHash, CONSTANTS } from "react-native-hash";
import { TwoButtonModal } from "../components/TwoButtonModal";

export default function Search({ navigation }) {
  const disPatch = useDispatch();
  const [searchMovies, setSearchMovies] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const extractTextPattern = /(<([^>]+)>)/gi;
  const userUid = useSelector((state) => state.user.uid);
  const userMovies = useSelector((state) => state.movie.movie_list);

  const [modalVisible, setModalVisible] = useState(false);
  const getMovies = async (word) => {
    if (word.length > 1) {
      setIsSearching(true);
      const result = await axios.get(
        `https://openapi.naver.com/v1/search/movie.json?query=${word}&display=100`,
        {
          headers: {
            "X-Naver-Client-Id": NAVER_API_CLIENT_ID,
            "X-Naver-Client-Secret": NAVER_API_CLIENT_KEY,
          },
        }
      );

      if (result.data) {
        setSearchMovies(result.data.items);
      }
      setIsSearching(false);
    }
  };

  const addUserMovie = (data) => {
    if (userMovies.length > 10) {
      setModalVisible(true);
    } else {
      const updates = {};
      const movieTitle = data.title.replace(extractTextPattern, "");
      const actors = data.actor;
      JSHash(movieTitle + actors, CONSTANTS.HashAlgorithms.sha256)
        .then((hash) => {
          updates["/all-movies/" + hash + "/" + userUid] = true;
          updates["/user-movies/" + userUid + "/" + hash] = data;
          update(ref(db), updates);
        })
        .catch((error) => console.log(error));
      disPatch(addMovie([data]));
    }
  };

  const modalCheckButton = () => {
    setModalVisible(false);
  };

  const modalEditButton = () => {
    setModalVisible(false);
  };

  return (
    <>
      <TwoButtonModal
        btnFunc1={modalCheckButton}
        btnFunc2={modalEditButton}
        state={modalVisible}
      />
      <View style={styles.container}>
        <View style={styles.marginTB10}>
          <SearchBar getMovies={getMovies} />
        </View>
        <View style={styles.resultLengthBox}>
          <Text
            style={styles.resultLength}
          >{`검색 결과 : ${searchMovies.length} 개`}</Text>
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
            {searchMovies.map((movie, idx) => (
              <SearchResult
                movie={movie}
                key={idx}
                addUserMovie={addUserMovie}
              />
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
