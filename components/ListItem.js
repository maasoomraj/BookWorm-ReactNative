import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import color from "../assets/colors";

const ListItem = ({ item, children }) => (
  <View style={styles.bookComponent}>
    <View style={styles.imageContainer}>
      <Image
        source={require("../assets/1461-512.webp")}
        style={styles.imageItem}
      />
    </View>
    <View style={styles.bookComponentItem}>
      <Text style={styles.bookComponentItemText}>{item.name}</Text>
    </View>
    {children}

    {/* {item.read ? (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Ionicons name="ios-checkmark" color={color.logocolor} size={40} />
      </View>
    ) : (
      <CustomActionButton
        style={styles.bookComponentMarkAsRead}
        onPress={() => this.markAsRead(item, index)}
      >
        <Text style={styles.bookComponentText}>Mark as Read</Text>
      </CustomActionButton>
    )} */}
  </View>
);

export default ListItem;

const styles = StyleSheet.create({
  bookComponent: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: color.flatList,
    marginVertical: 4,
    minHeight: 100,
    alignItems: "center",
  },
  imageContainer: {
    width: 70,
    height: 70,
    marginLeft: 10,
    borderRadius: 35,
    backgroundColor: color.white,
    alignItems: "center",
  },
  imageItem: {
    flex: 1,
    width: 50,
    height: 60,
  },
  bookComponentItem: {
    flex: 1,
    paddingLeft: 25,
    justifyContent: "center",
  },
  bookComponentItemText: {
    color: color.white,
    fontSize: 22,
    fontWeight: "200",
  },
});
