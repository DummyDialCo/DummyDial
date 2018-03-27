import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from "react-navigation";

export default class CallBtn extends React.Component {

  constructor(props){
    super(props);
  }

  sendCall = () => {
    fetch("http://dummydial93.herokuapp.com/"+this.props.recipient);
  }

  render() {
    return (
      <View>
				<Button onPress={this.sendCall} title="SEND CALL" color="orange" />
      </View>
    );
  }
}
