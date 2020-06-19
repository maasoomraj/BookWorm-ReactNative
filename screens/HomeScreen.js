import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import BookCount from "../components/BookCount";
import { Ionicons } from "@expo/vector-icons";
import CustomActionButton from "../components/CustomActionButton";
import color from "../assets/colors";
import { snapshotToArray } from "../helpers/firebaseHelpers";
import ListItem from "../components/ListItem";

import * as firebase from "firebase/app";
import("firebase/auth");
import("firebase/database");

class HomeScreen extends Component {
  constructor() {
    super();

    this.state = {
      user: {},
      all: 0,
      reading: 0,
      read: 0,
      isAddNewBook: false,
      inputText: "",
      books: [],
      booksReading: [],
      booksRead: [],
    };
  }

  async componentDidMount() {
    // get user from authentication
    const { navigation } = this.props;
    const user = navigation.getParam("user");

    // get user from database
    const currentUser = await firebase
      .database()
      .ref("users")
      .child(user.uid)
      .once("value");

    const books = await firebase
      .database()
      .ref("books")
      .child(user.uid)
      .once("value");

    const booksArray = snapshotToArray(books);

    // set state of user
    this.setState({
      user: currentUser.val(),
      books: booksArray,
      booksReading: booksArray.filter((book) => book.read == false),
      booksRead: booksArray.filter((book) => book.read == true),
    });
  }

  showAddInput = () => {
    this.setState({ isAddNewBook: true });
  };

  hideAddInput = () => {
    this.setState({ isAddNewBook: false });
  };

  addBook = async () => {
    try {
      const available = await firebase
        .database()
        .ref("books")
        .child(this.state.user.uid)
        .orderByChild("name")
        .equalTo(this.state.inputText)
        .once("value");

      if (available.exists()) {
        alert("Book already exists");
      } else {
        const key = await firebase
          .database()
          .ref("books")
          .child(this.state.user.uid)
          .push().key;

        await firebase
          .database()
          .ref("books")
          .child(this.state.user.uid)
          .child(key)
          .set({ name: this.state.inputText, read: false });

        this.setState(
          (state, props) => ({
            books: [
              ...state.books,
              { name: state.inputText, read: false, key: key },
            ],
            booksReading: [
              ...state.booksReading,
              { name: state.inputText, read: false, key: key },
            ],
            all: state.all + 1,
            reading: state.reading + 1,
            inputText: "",
          }),
          () => {
            // console.log(this.state.books);
            this.setState({
              isAddNewBook: false,
            });
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  markAsRead = async (item, index) => {
    try {
      await firebase
        .database()
        .ref("books")
        .child(this.state.user.uid)
        .child(item.key)
        .update({ read: true });

      let newlist = this.state.books.map((book) => {
        if (book.name == item.name) {
          return { ...book, read: true };
        } else {
          return book;
        }
      });
      let booksReading1 = this.state.booksReading.filter(
        (book) => book.name !== item.name
      );

      this.setState((state) => ({
        books: newlist,
        booksReading: booksReading1,
        booksRead: [...state.booksRead, { name: item.name, read: true }],
        read: state.read + 1,
        reading: state.reading - 1,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  bookComponent = (item, index) => (
    <ListItem item={item}>
      {item.read ? (
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
      )}
    </ListItem>
    // <View style={styles.bookComponent}>
    //   <View style={styles.imageContainer}>
    //     <Image
    //       source={require("../assets/1461-512.webp")}
    //       style={styles.imageItem}
    //     />
    //   </View>
    //   <View style={styles.bookComponentItem}>
    //     <Text style={styles.bookComponentItemText}>{item.name}</Text>
    //   </View>

    // {item.read ? (
    //   <View style={{ justifyContent: "center", alignItems: "center" }}>
    //     <Ionicons name="ios-checkmark" color={color.logocolor} size={40} />
    //   </View>
    // ) : (
    //   <CustomActionButton
    //     style={styles.bookComponentMarkAsRead}
    //     onPress={() => this.markAsRead(item, index)}
    //   >
    //     <Text style={styles.bookComponentText}>Mark as Read</Text>
    //   </CustomActionButton>
    // )}
    // </View>
  );

  render() {
    return (
      <View style={styles.container}>
        {/* HEADER START */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Book Worm</Text>
        </View>
        {/* HEADER END */}

        {/* BODY  START */}

        <View style={styles.body}>
          {this.state.isAddNewBook && (
            <View style={styles.addNewBook}>
              {/* ADD TEXTINPUT  */}
              <TextInput
                onChangeText={(text) => this.setState({ inputText: text })}
                style={styles.addNewBookText}
                placeholder="Enter Book Name"
                placeholderTextColor="#000"
              />

              {/* GREEN CHECK MARK WITH INPUT */}
              <CustomActionButton
                style={styles.addNewBookCheckMark}
                onPress={this.addBook}
              >
                <Ionicons name="ios-checkmark" color="white" size={40} />
              </CustomActionButton>

              {/* RED CLOSE WITH INPUT */}
              <CustomActionButton onPress={this.hideAddInput}>
                <Ionicons name="ios-close" color="white" size={40} />
              </CustomActionButton>
            </View>
          )}

          {/* LIST OF BOOKS DISPLAY */}
          <FlatList
            data={this.state.books}
            renderItem={({ item }, index) => this.bookComponent(item, index)}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <View style={styles.noBookAdded}>
                <Text>There are no books added.</Text>
              </View>
            }
          />

          {/* ADD SIGN */}

          <CustomActionButton
            style={styles.addSignStyle}
            styleTouch={styles.addSignStyleTouch}
            onPress={this.showAddInput}
          >
            <Text style={styles.addSignText}>+</Text>
          </CustomActionButton>
        </View>
        {/* BODY  END */}

        {/* FOOTER  START */}

        <View style={styles.footer}>
          <BookCount title="All" count={this.state.books.length} />
          <BookCount title="Reading" count={this.state.booksReading.length} />
          <BookCount title="Read" count={this.state.booksRead.length} />
        </View>

        {/* FOOTER  END */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bgMain,
  },
  bookComponentMarkAsRead: {
    width: 100,
    backgroundColor: color.checkmark,
  },
  bookComponentText: {
    color: "white",
  },
  header: {
    height: 70,
    borderBottomWidth: 0.5,
    borderBottomColor: color.lightGrey,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  headerText: {
    fontSize: 32,
  },
  body: {
    flex: 1,
  },
  addNewBook: {
    height: 50,
    flexDirection: "row",
  },
  addNewBookText: {
    flex: 1,
    backgroundColor: color.lightGrey,
    paddingLeft: 15,
  },
  addNewBookCheckMark: {
    backgroundColor: color.checkmark,
  },
  noBookAdded: {
    marginTop: 30,
    alignItems: "center",
  },
  addSignStyle: {
    borderRadius: 25,
    backgroundColor: color.addSign,
  },
  addSignStyleTouch: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  addSignText: {
    color: "white",
    fontSize: 30,
  },
  footer: {
    height: 70,
    borderTopWidth: 0.5,
    borderTopColor: color.borderTopColor,
    flexDirection: "row",
  },
});

export default HomeScreen;
