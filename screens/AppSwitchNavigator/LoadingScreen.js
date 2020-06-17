import React, { Component } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import color from "../../assets/colors";
import { MaterialIndicator } from "react-native-indicators";
import * as firebase from "firebase/app";
import "firebase/auth";

export default class LoadingScreen extends Component {
  componentDidMount = () => {
    this.checkIfLoggedIn();
  };

  checkIfLoggedIn = () => {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate("HomeScreen", { user: user });
      } else {
        this.props.navigation.navigate("WelcomeScreen");
      }
    });
  };

  //   componentWillMount = () => {
  //     this.unsubscribe;
  //   };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Ionicons name="ios-bookmarks" size={200} color={color.logocolor} />
        </View>
        <View style={{ flex: 1 }}>
          <MaterialIndicator color={color.logocolor} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bgMain,
  },
});
