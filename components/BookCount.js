import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import propTypes from "prop-types";

const BookCount = ({ title, count }) => (
  <View style={styles.BookCount}>
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

const styles = StyleSheet.create({
  BookCount: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
