import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Chat from "./src/Chat";
import Main from "./src/Main";

const Navigator = createStackNavigator({
  Main: { screen: Main },
  Chat: { screen: Chat }
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center"
//   }
// });

export default createAppContainer(Navigator);
