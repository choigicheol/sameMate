import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import Navigation from "./src/navigation/Navigation";
import { statusBarHeight } from "./src/util/WH";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./src/redux/store/store";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const queryClient = new QueryClient();

export default function App() {
  const [fontsLoaded] = useFonts({
    oneMobile: require("./src/assets/fonts/ONEMobileBold.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      setTimeout(async () => {
        await SplashScreen.hideAsync();
      }, 500);
    }
    prepare();
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <View style={styles.statusPadding} />
        <StatusBar />
        <Navigation />
      </QueryClientProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  statusPadding: { paddingTop: statusBarHeight },
});
