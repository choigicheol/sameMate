import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import OverFlowText from "./OverFlowText";

export function OverviewModal({ movie, state, hideModal, showModal }) {
  const category = {
    title: "제목 : ",
    release_date: "개봉 : ",
    vote_average: "평점 : ",
  };
  const arrCategories = Object.keys(category);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={state}
      onRequestClose={() => {
        hideModal();
      }}
    >
      <Pressable style={styles.centeredView} onPressIn={() => hideModal()}>
        <Pressable style={styles.modalView}>
          <View
            style={{
              width: "100%",
              alignItems: "flex-end",
            }}
            onPress={() => {
              console.log("!!!");
            }}
          >
            <TouchableOpacity
              style={[styles.closeButton]}
              onPress={() => {
                hideModal();
              }}
            >
              <Text style={{ color: "#ffffff", fontWeight: "bold" }}>닫기</Text>
            </TouchableOpacity>
          </View>
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
            <View onStartShouldSetResponder={() => true}>
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
              <Text
                style={styles.modalText}
              >{`줄거리 : ${movie.overview}`}</Text>
            </View>
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
  },

  modalView: {
    width: "80%",
    height: "90%",
    backgroundColor: "#2e2e2e",
    borderRadius: 10,
    padding: 20,
    opacity: 0.9,
    paddingTop: 0,
  },
  closeButton: {
    width: 45,
    height: 25,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "tomato",
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
    height: "60%",
    marginBottom: 20,
    resizeMethod: "scale",
    resizeMode: "center",
  },
});
