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


		<View style={Styles.navBar}>
          <TouchableOpacity onPress={()=>navigate("Home", {recipient: this.state.recipient})}>
            <Text>Instant</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigate("TextBody", {recipient: this.state.recipient})}>
            <Text>Text Body</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigate("Timer", {recipient: this.state.recipient})}>
            <Text>Timer</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigate("Settings", {recipient: this.state.recipient})}>
            <Text>Settings</Text>
          </TouchableOpacity>
        </View>


			</View>
    );
  }
}
