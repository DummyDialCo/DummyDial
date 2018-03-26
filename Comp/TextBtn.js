import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from "react-navigation";

import CallInput from "./CallInput";
import TextInput from "./TextInput";
import CallBtn from "./CallBtn";

export default class TextBtn extends React.Component {
	
  render() {
    return (
      <View>
		<Button> /* twilio function that pulls the url containing the phone number for texting */ </Button>
      </View>
    );
  }
}