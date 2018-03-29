import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from "react-navigation";

import Welcome from "./components/Welcome";
import Home from "./components/Home";
import Menu from "./components/Menu";
import CallPage from "./components/CallPage";
import TextPage from "./components/TextPage";
import AddContact from "./components/AddContact";

/* Only Stack Navigator controls in this file */
const DummyDial = StackNavigator({
  Home: { screen: Home },
  Welcome: { screen: Welcome },
  Menu: { screen: Menu },
  CallPage: { screen: CallPage },
  TextPage: { screen: TextPage },
  AddContact: { screen: AddContact }
}, {
  initialRouteName: "Home",
  headerMode: "Screen"
});

export default class App extends React.Component {

  render() {
    return (
      <DummyDial />
    );

  }
}
