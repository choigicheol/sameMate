import React from "react";
import { Text } from "react-native";

function OverFlowText({ category, text, style }) {
  return (
    <>
      {text ? (
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
