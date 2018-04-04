import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage } from 'react-native';
import { StackNavigator } from "react-navigation";

export default class Menu extends React.Component {

  static navigationOptions = {
    header: null
  };


  render() {

    const { navigate } = this.props.navigation;

    return (
      <View>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>

        <Text>Phone number: {this.props.recipient} Remove this part later.</Text>
        <Text></Text>

        <Text>THIS IS THE MENU PAGE</Text>

        <Button onPress={()=>navigate("CallPage")} title="CALL PAGE" />
		<Text></Text>
        <Button onPress={()=>navigate("TextPage")} title="TEXT PAGE" />
    <Text></Text>
        <Button onPress={()=>navigate("Settings")} title="SETTINGS" />

      </View>
    );
  }
}
