/**React Native App
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
  TouchableOpacity,
  Image,
  SafeAreaView,
  Animated
} from "react-native";
import ListItem from "./src/ListItem";
import firebase from "react-native-firebase";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      load: "working",
      opacity: new Animated.Value(0),
      subscribed: false,
      loading: true,
      loadingImage: true,
      spots: [],
      coords: [
        { x: "55%", y: "86%" },
        { x: "55%", y: "79.2%" },
        { x: "55%", y: "72.6%" },
        { x: "55%", y: "65.8%" },
        { x: "55%", y: "59%" },
        { x: "55%", y: "52.2%" },
        { x: "55%", y: "45.4%" },
        { x: "55%", y: "38.6%" },
        { x: "55%", y: "31.8%" },
        { x: "55%", y: "25%" },
        { x: "55%", y: "18.2%" },
        { x: "55%", y: "11.4%" },
        { x: "6%", y: "31.8%" },
        { x: "6%", y: "25%" },
        { x: "6%", y: "18.2%" },
        { x: "6%", y: "11.4%" },
        { x: "72%", y: "3%" }
      ]
    };
    this.unsubscribe = null;
    this.ref = firebase.firestore().collection("Spots");
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
    const spots = [];
    querySnapshot.forEach(doc => {
      spots.push({
        key: doc.id,

        id: doc.id,
        available: doc.data().available,
        name: doc.data().name
      });
    });
    var loading = this.state.loading;
    if (loading) {
      this.setState({ spots, loading: false });
      this.onLoad();
    } else this.setState({ spots });
  };

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true
    }).start();
  };

  toggleSpot = (state, id) => {
    this.setState({ name: "" });
    firebase
      .firestore()
      .collection("Spots")
      .doc(id)
      .update({
        available: !state
      });
  };

  render() {
    if (this.state.loading) {
      return <View style={styles.container} />;
    } else
      return (
        <SafeAreaView style={styles.container}>
          <Animated.View
            style={{
              aspectRatio: 0.45,
              height: "100%",
              opacity: this.state.opacity
            }}
          >
            <Image
              source={{ uri: "parkingspots" }}
              style={{ width: "100%", height: "100%" }}
              onLoadEnd={() => this.setState({ loading: false })}
            />

            <Text>{this.state.name}</Text>

            <React.Fragment>
              {this.state.spots.map(item => (
                <TouchableOpacity
                  style={[
                    {
                      aspectRatio: 210 / 116,
                      position: "absolute",

                      height: "5.8%",
                      left: this.state.coords[item.id - 1].x,
                      bottom: this.state.coords[item.id - 1].y,
                      borderRadius: 4,
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 4
                    },
                    item.available
                      ? { backgroundColor: "#3bd774", borderColor: "#32bc65" }
                      : { backgroundColor: "#d74a3a", borderColor: "#bc3f31" }
                  ]}
                  key={item.id}
                  onPress={() => {
                    this.toggleSpot(item.available, item.id);
                  }}
                >
                  <Text
                    adjustsFontSizeToFit
                    numberOfLines={2}
                    style={styles.text}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </React.Fragment>
          </Animated.View>
        </SafeAreaView>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },

  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 20
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  item: {
    width: "100%"
  },
  text: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    textAlignVertical: "center"
  }
});
