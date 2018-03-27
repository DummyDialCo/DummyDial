import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from "react-navigation";

export default class CallBtn extends React.Component {

	constructor(props){
		super(props);
	}

	sendCall = () => {
		// Fetch Twilio URL to send call
	}

  render() {
    return (
      <View>
				<Button onPress={this.sendCall}>SEND CALL</Button>
      </View>
    );
  }
}
