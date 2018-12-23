/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";
import ListItem from "./src/ListItem";
import firebase from "react-native-firebase";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      subscribed: false
    };
    this.unsubscribe = null;
    this.ref = firebase.firestore().collection("People");
    // this.getPeople();
  }

  componentDidMount = () => {
    this.setState({ subscribed: true });

    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  };
  componentWillUnmount() {
    if (this.state.subscribed === true) {
      this.unsubscribe();
    }
  }
  onCollectionUpdate = querySnapshot => {
    const people = [];
    querySnapshot.forEach(doc => {
      people.push({
        key: doc.id,

        id: doc.id,
        state: doc.data().state,
        name: doc.data().name
      });
    });
    this.setState({ people });
  };

  getPeople = () => {
    const people = [];
    firebase
      .firestore()
      .collection("People")
      .get()
      .then(doc => {
        doc.forEach(doc => {});
      });
  };

  toggleSpot = (state, id) => {
    firebase
      .firestore()
      .collection("People")
      .doc(id)
      .update({
        state: !state
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.people}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => this.toggleSpot(item.state, item.id)}
            >
              <ListItem {...item} />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  item: {
    width: "100%"
  }
});
