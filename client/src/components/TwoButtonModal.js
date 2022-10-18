import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export function TwoButtonModal({ btnFunc1, btnFunc2, state }) {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={state}
        onRequestClose={() => btnFunc1()}
      >
        <View style={[styles.centeredView, styles.modalBackGround]}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>최대 10개까지 등록 가능합니다.</Text>
            <View
              style={{
                flexDirection: "row",
                width: "50%",
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => btnFunc1()}
              >
                <Text style={styles.textStyle}>확인</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonEdit]}
                onPress={() => btnFunc2()}
              >
                <Text style={styles.textStyle}>편집</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  modalBackGround: {
    backgroundColor: "#9e9e9e",
    opacity: 0.9,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 4,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    elevation: 2,
  },
  buttonEdit: {
    backgroundColor: "tomato",
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
    textAlign: "center",
  },
});
