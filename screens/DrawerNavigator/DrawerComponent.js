import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import color from "../../assets/colors";

import { DrawerItems } from "react-navigation";

class DrawerComponent extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Ionicons name="ios-bookmarks" size={100} color={color.logocolor} />
          <Text style={styles.text}>Book Worm</Text>
        </View>
        <DrawerItems {...this.props} />
      </View>
    );
  }
}

export default DrawerComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 200,
    paddingTop: 70,
    paddingBottom: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.bgMain,
  },
  text: {
    fontSize: 24,
    fontWeight: "100",
    color: color.white,
  },
});
