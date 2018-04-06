import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, TouchableOpacity } from 'react-native';
import { StackNavigator } from "react-navigation";

import Timer from "./Timer";

export default class CallPage extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			recipient:this.props.navigation.state.params.recipient
		}
	}

	sendCall = () => {
		fetch("http://dummydial93.herokuapp.com/"+this.state.recipient);
	}


	render() {
		const {navigate} = this.props.navigation;

		return (
			<View>
				<Text></Text>
				<Text></Text>
				<Text></Text>
				<Text></Text>
				<Text></Text>

				<Text>{this.state.recipient}</Text>

				<Button onPress={this.sendCall} title="SEND CALL" color="orange" />

				<TouchableOpacity onPress={()=>{navigate("Home")}}>
					<Text>CLICK TO RETURN TO HOME</Text>
				</TouchableOpacity>

				<Text>{"\n"}{"\n"}{"\n"}</Text>

				<Timer />

			</View>
    );
  }
}
