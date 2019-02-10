import React, { Component } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from "react-native";

class Main extends Component {
  state = {
    name: ""
  };

  _onPress = () => {
    this.props.navigation.navigate("Chat", {
      name: this.state.name
    });
  };

  _onChangeText = (name) =>
    this.setState({
      name
    });

  render() {
    return (
      <View>
        <Text style={styles.title}>Enter your name:</Text>
        <TextInput
          onChangeText={this._onChangeText}
          style={styles.nameInput}
          placeholder="name"
          value={this.state.name}
        />

        <TouchableOpacity onPress={this._onPress}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const offset = 24;

const styles = StyleSheet.create({
  nameInput: {
    height: offset * 2,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: "#111111",
    borderWidth: 1
  },
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset
  },
  buttonText: {
    marginLeft: offset,
    fontSize: offset
  }
});

export default Main;
