import { Dimensions } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;
export const statusBarHeight = getStatusBarHeight();
