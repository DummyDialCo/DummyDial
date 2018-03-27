import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { StackNavigator } from "react-navigation";

export default class TextInput extends React.Component {

  render() {
    return (
      <View>
		<TextInput> /* this is where they put their phone number and it sends to the url that will be called on in the TextBtn page */ </TextInput>
      </View>
    );
  }
}
