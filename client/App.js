import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Navigation from "./src/navigation/Navigation";
import { statusBarHeight } from "./src/util/WH";

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      <View style={styles.statusPadding} />
      <StatusBar />
      <Navigation isLogin={isLogin} />
    </>
  );
}

const styles = StyleSheet.create({
  statusPadding: { paddingTop: statusBarHeight },
});
