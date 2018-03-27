import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { StackNavigator } from "react-navigation";

export default class CallInput extends React.Component {

  render() {
    return (
      <View>
		<TextInput> /* this is where they put their phone number and it sends to the url that will be called on in the CallBtn page */ </TextInput>
      </View>
    );
  }
}
