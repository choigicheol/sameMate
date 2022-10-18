import React from "react";
import { Text } from "react-native";

function OverFlowText({ category, text, style, name }) {
  return (
    <>
      {name === "overview" ? (
        <Text numberOfLines={4} style={style}>
          {category + text}
        </Text>
      ) : text ? (
        <Text numberOfLines={1} style={style}>
          {category + text}
        </Text>
      ) : (
        <></>
      )}
    </>
  );
}

export default OverFlowText;
