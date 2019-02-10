import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Chat from "./src/components/Chat";
import Main from "./src/components/Main";

const Navigator = createStackNavigator({
  Main: { screen: Main },
  Chat: { screen: Chat }
});

export default createAppContainer(Navigator);
