import React from "react";
import { Text } from "react-native";

function WarningMessage({ msg, style }) {
  return <Text style={style}>{msg}</Text>;
}

export default WarningMessage;
