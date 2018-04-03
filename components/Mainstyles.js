import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { StackNavigator } from "react-navigation";

import Styles from "./scss/Styles.scss";


export default class Mainstyles extends React.Component {

	constructor(props){
		super(props);
	}

  render() {
    return (
      <View>
		<Text></Text>
		<Text></Text>
		<Text></Text>
		<Text></Text>
		
		<View style={Styles.all}>
		<Text>hi</Text>
		</View>
		
      </View>
    );
  }
}