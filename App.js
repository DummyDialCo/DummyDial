import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from "react-navigation";

import Welcome from "./components/Welcome";

import CallPage from "./components/CallPage";
import TextPage from "./components/TextPage";
import AddContact from "./components/AddContact";

import Timer from "./components/Timer";

/* Only Stack Navigator controls in this file */
const DummyDial = StackNavigator({
  Welcome: { screen: Welcome },
  CallPage: { screen: CallPage },
  TextPage: { screen: TextPage },
  AddContact: { screen: AddContact }
}, {
  initialRouteName: 'Welcome',
  headerMode: 'screen'
});

export default class App extends React.Component {

  render() {
    return (
      <View>
		    <DummyDial />
      </View>
    );
  }
}
