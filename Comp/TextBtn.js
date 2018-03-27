import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from "react-navigation";

export default class TextBtn extends React.Component {

  constructor(props){
    super(props);
  }

  sendText = () => {
    // Fetch Twilio URL to send text
  }

  render() {
    return (
      <View>
        <Button onPress={this.sendText} title="SEND TEXT" />
      </View>
    );
  }
}
