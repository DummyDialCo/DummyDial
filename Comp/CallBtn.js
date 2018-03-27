import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from "react-navigation";

export default class CallBtn extends React.Component {

  constructor(props){
    super(props);
  }

  sendCall = () => {
    // Fetches Twilio URL to send call
  }

  render() {
    return (
      <View>
		    <Button onPress={this.sendCall}> /* twilio function that pulls the url containing the phone number for calling */ </Button>
      </View>
    );
  }
}
