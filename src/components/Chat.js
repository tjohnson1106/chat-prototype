import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

import Fire from "../data/Fire";

class Chat extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || "Chat!"
  });

  state = {
    messages: []
  };

  render() {
    return <GiftedChat messages={this.state.messages} />;
  }

  componentDidMount() {
    Fire.shared.on((message) =>
      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, message)
      }))
    );
  }

  componentWillUnmount() {
    Fire.shared.off();
  }
}

const styles = StyleSheet.create({});

export default Chat;
