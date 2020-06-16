import React, { Component } from "react";
import { Text, View } from "react-native";
import propTypes from "prop-types";

const BookCount = ({ title, count }) => (
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text>{title}</Text>
    <Text>{count}</Text>
  </View>
);

BookCount.propTypes = {
  title: propTypes.string,
  count: propTypes.number.isRequired,
};

BookCount.defaultProps = {
  title: "Title",
};

export default BookCount;
