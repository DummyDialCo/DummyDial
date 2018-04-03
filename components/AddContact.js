import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { StackNavigator } from "react-navigation";

export default class addContact extends React.Component {

	static navigationOptions = {
		header: null
	};

	constructor(props){
		super(props);
		this.state = {
      	contactName:""
		}
	}

	addToContacts = () => {
		// react-native-contacts function will go here after ejecting
		console.log("New contact");
	}

  render() {
    return (
      <View>
		<Text></Text>
		<Text></Text>
		<Text></Text>
		<Text></Text>
		<Text></Text>
		<Text></Text>
		
		<TextInput
			placeholder="Enter contact name"
			onChangeText={(contactName)=>this.setState({contactName})}
			value={this.state.contactName}
			/>

        <Button onPress={this.addToContacts} title="ADD CONTACT" color="orange" />
      </View>
    );
  }
}
