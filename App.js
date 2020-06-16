import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import BookCount from "./components/BookCount";
import { Ionicons } from "@expo/vector-icons";
import CustomActionButton from "./components/CustomActionButton";

class App extends Component {
  constructor() {
    super();

    this.state = {
      all: 0,
      reading: 0,
      read: 0,
      isAddNewBook: false,
      inputText: "",
      books: [],
    };
  }

  showAddInput = () => {
    this.setState({ isAddNewBook: true });
  };

  hideAddInput = () => {
    this.setState({ isAddNewBook: false });
  };

  addBook = () => {
    this.setState(
      (state, props) => ({
        books: [...state.books, state.inputText],
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
  };

  markAsRead = (item, index) => {
    let newlist = this.state.books.filter((book) => book !== item);

    this.setState((state) => ({
      books: newlist,
      read: state.read + 1,
      reading: state.reading - 1,
    }));
  };

  bookComponent = (item, index) => (
    <View style={styles.bookComponent}>
      <View style={styles.bookComponentItem}>
        <Text>{item}</Text>
      </View>

      {/* MARK AS READ  START */}
      <CustomActionButton
        style={styles.bookComponentMarkAsRead}
        onPress={() => this.markAsRead(item, index)}
      >
        <Text style={styles.bookComponentText}>Mark as Read</Text>
      </CustomActionButton>
      {/* MARK AS READ  END */}
    </View>
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
          <BookCount title="All" count={this.state.all} />
          <BookCount title="Reading" count={this.state.reading} />
          <BookCount title="Read" count={this.state.read} />
        </View>

        {/* FOOTER  END */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bookComponent: {
    flex: 1,
    flexDirection: "row",
  },
  bookComponentItem: {
    flex: 1,
    paddingLeft: 25,
    justifyContent: "center",
  },
  bookComponentMarkAsRead: {
    width: 100,
    backgroundColor: "green",
  },
  bookComponentText: {
    color: "white",
  },
  header: {
    height: 70,
    borderBottomWidth: 0.5,
    borderBottomColor: "#dddddd",
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
    backgroundColor: "#dddddd",
    paddingLeft: 15,
  },
  addNewBookCheckMark: {
    backgroundColor: "green",
  },
  noBookAdded: {
    marginTop: 30,
    alignItems: "center",
  },
  addSignStyle: {
    borderRadius: 25,
    backgroundColor: "#345678",
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
    borderTopColor: "#dddddd",
    flexDirection: "row",
  },
});

export default App;
