import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from "react-navigation";

import CallInput from "./CallInput";
import TestInput from "./TestInput";
import CallBtn from "./CallBtn";
import TextBtn from "./TextBtn";

import CallPage from "./CallPage";



export default class Home extends React.Component {

	/* Main page */

	/* Where main controls are to switch between pages, for now all funtions will be displayed on this page, but will still be in seperate files */

  render() {
    return (
      <View>
				<Text>AHSHAIASBASB</Text>
				<Text>AHSHAIASBASB</Text>
				<Text>AHSHAIASBASB</Text>
				<CallPage />
				<TestInput />
				<TextBtn />
      </View>
    );
  }
}
