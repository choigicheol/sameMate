import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { deleteMovie } from "../redux/slice/movieSlice";
import { windowWidth } from "../util/WH";
import { db } from "../../firebaseConfig";
import { GetMovieHash } from "../util/Functions";

export default function Poster({
  data,
  isOnlyImg = true,
  isDelete,
  isEditMode,
}) {
  const extractTextPattern = /(<([^>]+)>)/gi;
  const [isSelect, setIsSelect] = useState(false);
  const dispatch = useDispatch();
  const userUid = useSelector((state) => state.user.uid);

  const getHash = async () => {
    if (isSelect) {
      const movieHash = await GetMovieHash(data.title, data.actor);
      await db.ref(`user-movies/${userUid}/${movieHash}`).remove();
      await db.ref(`all-movies/${movieHash}/${userUid}`).remove();
      dispatch(deleteMovie(data));
      setIsSelect(false);
    }
  };

  const pressImgSelect = () => {
    if (isEditMode) setIsSelect(!isSelect);
  };

  useEffect(() => {
    getHash();
  }, [isDelete]);

  useEffect(() => {
    if (isEditMode) setIsSelect(false);
  }, [isEditMode]);

  return (
    <View style={styles.container}>
      {data.image ? (
        <>
          {isEditMode && (
            <TouchableOpacity
              style={{ width: "100%", alignItems: "center" }}
              onPress={() => setIsSelect(!isSelect)}
            >
              <View
                style={
                  isSelect ? styles.deleteButtonSelect : styles.deleteButton
                }
              >
                <Text
                  style={{ fontWeight: "bold", fontSize: 16, color: "#ffffff" }}
                >
                  ✔︎
                </Text>
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{ width: "100%" }}
            onPress={() => pressImgSelect()}
          >
            <Image
              style={styles.posterImage}
              source={{
                uri: data.image,
              }}
            />
          </TouchableOpacity>
        </>
      ) : (
        <>
          {isEditMode && (
            <TouchableOpacity
              style={{ width: "100%", alignItems: "center" }}
              onPress={() => setIsSelect(!isSelect)}
            >
              <View
                style={
                  isSelect ? styles.deleteButtonSelect : styles.deleteButton
                }
              >
                <Text
                  style={{ fontWeight: "bold", fontSize: 16, color: "#ffffff" }}
                >
                  ✔︎
                </Text>
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{ width: "100%" }}
            onPress={() => pressImgSelect()}
          >
            <Image
              style={styles.posterImage}
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3D-lTi8YdxLGtoKSdAQXPwmFSnjfZCDNFsQ&usqp=CAU",
              }}
            />
          </TouchableOpacity>
        </>
      )}
      {data.title !== undefined && !isOnlyImg ? (
        <Text style={styles.posterTitle} numberOfLines={2}>
          {data.title.replace(extractTextPattern, "")}
        </Text>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth / 4,
    alignItems: "center",
    paddingLeft: 1,
    paddingRight: 1,
  },
  posterImage: {
    width: "100%",
    height: 150,
    borderRadius: 2,
    zIndex: 3,
  },
  posterTitle: {
    color: "#9e9e9e",
    fontSize: 11,
    marginTop: 5,
    fontWeight: "bold",
  },
  deleteButton: {
    position: "relative",
    width: 25,
    height: 25,
    borderRadius: 30,
    backgroundColor: "#ffffff",
    marginBottom: 10,
    opacity: 0.2,
    zIndex: 3,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 5,
  },
  deleteButtonSelect: {
    position: "relative",
    width: 25,
    height: 25,
    borderRadius: 30,
    backgroundColor: "green",
    marginBottom: 10,
    opacity: 1,
    zIndex: 3,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 5,
  },
});
