import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";

export default class ListItem extends React.PureComponent {
  // toggle a todo as completed or not via update()

  render() {
    return (
      <View style={this.props.state ? styles.itemGreen : styles.itemRed}>
        <Text style={styles.text}>
          {this.props.name}
        </Text>
        <View style={styles.div} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  itemGreen: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "green",
    alignItems: "center"
  },
  itemRed: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "red",
    alignItems: "center"
  },
  div: {
    height: 1,
    width: "100%",
    backgroundColor: "#e0e0e0",
    bottom: 0,
    position: "absolute"
  },

  text: {
    fontWeight: "bold",
    fontSize: 20,
    flex: 1,
    flexWrap: "wrap",
    margin: 20
  },

  fieldImage: {
    width: 50,
    height: 50,

    marginStart: 8,
    borderWidth: 5,
    borderColor: "white",
    margin: 5
  }
});
