import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  TouchableHighlight,
  Pressable,
} from "react-native";
import OverFlowText from "./OverFlowText";

export function OverviewModal({ movie, showOverview, state }) {
  const category = {
    title: "제목 : ",
    release_date: "개봉 : ",
    vote_average: "평점 : ",
  };
  const arrCategories = Object.keys(category);

  return (
    <Modal
      animationType="fade"
      transparent
      visible={state}
      onRequestClose={() => {
        showOverview();
      }}
      onBackdropPress={() => {
        showOverview();
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {movie.poster_path ? (
            <Image
              style={styles.modalPosterImage}
              source={{
                uri: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
              }}
            />
          ) : (
            <Image
              style={styles.modalPosterImage}
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3D-lTi8YdxLGtoKSdAQXPwmFSnjfZCDNFsQ&usqp=CAU",
              }}
            />
          )}
          <ScrollView>
            {arrCategories.map((cate, idx) => {
              return (
                <OverFlowText
                  category={category[cate]}
                  text={movie[cate]}
                  style={styles.modalText}
                  key={idx}
                  name={cate}
                ></OverFlowText>
              );
            })}
            <Text style={styles.modalText}>{`줄거리 : ${movie.overview}`}</Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modalView: {
    width: "80%",
    height: "80%",
    backgroundColor: "#2e2e2e",
    borderRadius: 10,
    padding: 20,
    opacity: 0.9,
    alignItems: "center",
  },
  buttonClose: {
    backgroundColor: "#32AAFF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 14,
    color: "white",
  },
  modalPosterImage: {
    width: "100%",
    height: "70%",
    marginBottom: 20,
    resizeMethod: "scale",
    resizeMode: "center",
  },
});
