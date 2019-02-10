import React, { Component } from "react";
// import { StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

import Fire from "../data/Fire";

class Chat extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || "Chat!"
  });

  state = {
    messages: []
  };

  // Return name and our UID for GiftedChat to parse
  get user() {
    return {
      name: this.props.navigation.state.params.name,
      id: Fire.shared.uid
    };
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={Fire.shared.send}
        user={this.user}
      />
    );
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

export default Chat;
