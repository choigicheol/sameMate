import React from "react";
import { Text } from "react-native";

function OverFlowText({ text, style }) {
  return (
    <Text numberOfLines={1} style={style}>
      {text}
    </Text>
  );
}

export default OverFlowText;
