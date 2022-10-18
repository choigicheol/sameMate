import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Modal,
} from "react-native";
import SearchBar from "../components/SearchBar";
import { menus } from "../../dummy/data";
import MenuTap from "../components/MenuTap";
import axios from "axios";
import SearchResult from "../components/SearchResult";
import {
  NAVER_API_CLIENT_ID,
  NAVER_API_CLIENT_KEY,
  TMDB_API_KEY,
} from "react-native-dotenv";
import { db } from "../../firebaseConfig";
import { ref, update } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { addMovie } from "../redux/slice/movieSlice";
import { TwoButtonModal } from "../components/TwoButtonModal";
import { GetMovieHash } from "../util/Functions";

export default function Search({ navigation }) {
  const disPatch = useDispatch();
  const [searchMovies, setSearchMovies] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const userUid = useSelector((state) => state.user.uid);
  const userMovies = useSelector((state) => state.movie.movie_list);
  const [searchCategory, setSearchCategory] = useState("movie");
  const [modalVisible, setModalVisible] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [searchWord, setSearchWord] = useState("");
  const [isAddModal, setIsAddModal] = useState(false);

  const getMovies = async (word) => {
    if (word.length > 1) {
      setIsSearching(true);
      const result = await axios.get(
        `https://api.themoviedb.org/3/search/${searchCategory}?api_key=${TMDB_API_KEY}&page=1&query=${word}&language=ko-KR&include_adult=false`
      );

      if (result.data) {
        if (searchCategory === "tv") {
          result.data.results.map(
            (tvProgram) => (tvProgram.title = tvProgram.name)
          );
        }
        setSearchMovies(result.data.results);
        setSearchWord(word);
        setTotalResults(result.data.total_results);
      }

      setPage(1);
      setIsSearching(false);
    }
  };

  const getData = async () => {
    setIsSearching(true);
    await getNextPage(searchWord);
    setIsSearching(false);
  };

  const getNextPage = async (word) => {
    if (word.length > 1) {
      const result = await axios.get(
        `https://api.themoviedb.org/3/search/${searchCategory}?api_key=${TMDB_API_KEY}&page=${
          page + 1
        }&query=${word}&language=ko-KR&include_adult=false`
      );
      if (result.data) {
        const newData = [...searchMovies, ...result.data.results];
        setSearchMovies(newData);
        setPage(page + 1);
      }
    }
  };

  const addUserMovie = async (movie) => {
    if (userMovies.length >= 10) {
      setModalVisible(true);
    } else {
      setIsAddModal(true);
      const updates = {};
      const title = movie.title;
      const releaseDate = movie.release_date;
      const movieHash = await GetMovieHash(title, releaseDate);
      if (movieHash) {
        updates["/all-movies/" + movieHash + "/" + userUid] = true;
        updates["/user-movies/" + userUid + "/" + movieHash] = movie;
        update(ref(db), updates);
      }
      disPatch(addMovie([movie]));
      setTimeout(() => {
        setIsAddModal(false);
      }, 300);
    }
  };

  const modalCheckButton = () => {
    setModalVisible(false);
  };

  const modalEditButton = () => {
    setModalVisible(false);
    navigation.navigate("Mypage");
  };

  return (
    <>
      {isSearching ? (
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            zIndex: 3,
          }}
        >
          <ActivityIndicator size="large" color="tomato" />
        </View>
      ) : (
        <></>
      )}

      <Modal animationType="fade" transparent visible={isAddModal}>
        <View style={styles.addMessage}>
          <View style={styles.addMessageView}>
            <Text
              style={{ fontWeight: "bold", color: "#ffffff", fontSize: 16 }}
            >
              List에 담겼습니다.
            </Text>
          </View>
        </View>
      </Modal>

      <TwoButtonModal
        btnFunc1={modalCheckButton}
        btnFunc2={modalEditButton}
        state={modalVisible}
      />

      <View style={styles.container}>
        <View style={styles.marginTB10}>
          <SearchBar getMovies={getMovies} />
        </View>
        <View style={styles.resultCountBox}>
          <Text style={styles.resultCount}>검색 결과</Text>
          <Text style={[styles.resultCount, styles.number]}>
            {totalResults}
          </Text>
          <Text style={styles.resultCount}>개</Text>
        </View>

        <FlatList
          data={searchMovies}
          style={styles.resultContainer}
          renderItem={(movie) => {
            return (
              <SearchResult movie={movie.item} addUserMovie={addUserMovie} />
            );
          }}
          keyExtractor={(item, index) => index}
          onEndReached={getData}
          onEndReachedThreshold={1}
        />
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
    backgroundColor: "#000000",
  },
  marginTB10: {
    marginTop: 10,
    marginBottom: 10,
  },
  resultContainer: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  resultCountBox: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 10,
  },
  resultCount: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#2e2e2e",
  },

  MenuContainer: {
    flexDirection: "row",
    backgroundColor: "#000000",
  },
  number: {
    color: "#32AAFF",
    marginRight: 5,
    marginLeft: 5,
  },
  addMessage: { flex: 1, justifyContent: "center", alignItems: "center" },
  addMessageView: {
    backgroundColor: "#32AAFF",
    width: 220,
    height: 30,
    opacity: 0.8,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
