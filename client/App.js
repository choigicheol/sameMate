import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import Navigation from "./src/navigation/Navigation";
import { statusBarHeight } from "./src/util/WH";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./src/redux/store/store";
import { Provider } from "react-redux";

const queryClient = new QueryClient();

export default function App() {
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
