import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage } from 'react-native';
import { StackNavigator } from "react-navigation";


export default class Menu extends React.Component {

  static navigationOptions = {
    header: null
  };

	constructor(props){
		super(props);

		this.state = {

		}
	}


  render() {

    const { navigate } = this.props.navigation;

    return (
      <View>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>

        <Text>THIS IS THE MENU PAGE</Text>

        <Button onPress={()=>navigate("CallPage")} title="CALL PAGE" />
        <Button onPress={()=>navigate("TextPage")} title="TEXT PAGE" />

      </View>
    );
  }
}
