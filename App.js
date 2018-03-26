import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from "react-navigation";

import Home from "./Comp/Home";

export default class App extends React.Component {
	
	/* Only Stack Navigator controls in this file */
	
  render() {
    return (
      <View>
		<Home />
      </View>
    );
  }
}
