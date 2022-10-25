import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { deleteMovies } from "../redux/slice/movieSlice";
import { windowWidth } from "../util/WH";
import { db } from "../../firebaseConfig";

export default function Poster({
  movie,
  isOnlyImg = true,
  isDelete,
  isEditMode,
  showOverview,
}) {
  const [isSelect, setIsSelect] = useState(false);
  const dispatch = useDispatch();
  const userUid = useSelector((state) => state.user.uid);

  const deleteMovie = async () => {
    if (isSelect) {
      await db.ref(`userMovies/${userUid}/${movie.id}`).remove();
      await db.ref(`allMovies/${movie.id}/${userUid}`).remove();
      dispatch(deleteMovies(movie));
      setIsSelect(false);
    }
  };

  const pressImgSelect = () => {
    if (isEditMode) setIsSelect(!isSelect);
    else if (showOverview) showOverview(movie);
  };

  useEffect(() => {
    deleteMovie();
  }, [isDelete]);

  useEffect(() => {
    if (isEditMode) setIsSelect(false);
  }, [isEditMode]);

  return (
    <View style={styles.container}>
      {typeof movie === "object" ? (
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
            {movie.poster_path ? (
              <Image
                style={styles.posterImage}
                source={{
                  uri: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
                }}
              />
            ) : (
              <Image
                style={styles.posterImage}
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3D-lTi8YdxLGtoKSdAQXPwmFSnjfZCDNFsQ&usqp=CAU",
                }}
              />
            )}
          </TouchableOpacity>
        </>
      ) : (
        <></>
      )}

      {typeof movie === "object" && movie.title !== undefined && !isOnlyImg ? (
        <Text style={styles.posterTitle} numberOfLines={2}>
          {movie.title}
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
