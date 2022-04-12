// import react from react
import React from "react";
import { StyleSheet, Text, View } from "react-native";
// importing styling and operational components such as stylesheet, text, view
// from react-native framework
import { createStackNavigator, createAppContainer } from "react-navigation";
// createAppContainer function, gets called every time navigation state 
// (createStackNavigator) managed by the navigator changes.
import CameraFront from "./CameraScreens/CameraFront";
//importing CameraFront.js
import Home from "./CameraScreens/HomeScreen";
// importing Home.js

// Navigation for the mobile application display
const Navigation = createStackNavigator(
  {
    Home: { screen: Home },
    Camera: { screen: CameraFront }
  },
  {
    defaultNavigationOptions: {
      headerTintColor: "#f1b1e6",
      headerStyle: {
        backgroundColor: "#000000"
      },
      headerTitleStyle: {
        color: "#fff"
      }
    }
  }
);

const App = createAppContainer(Navigation);
export default App;
