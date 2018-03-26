import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from "react-navigation";

import CallInput from "./CallInput";
import TextInput from "./TextInput";
import TextBtn from "./TextBtn";

export default class CallBtn extends React.Component {
	
  render() {
    return (
      <View>
		<Button> /* twilio function that pulls the url containing the phone number for calling */ </Button>
      </View>
    );
  }
}