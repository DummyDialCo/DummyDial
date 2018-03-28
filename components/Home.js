import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from "react-navigation";

import CallBtn from "./CallBtn";

import CallPage from "./CallPage";
import TextPage from "./TextPage";
import AddContact from "./AddContact";

import styles from "./styles/Home";



export default class Home extends React.Component {

	/* Main page */

	/* Where main controls are to switch between pages, for now all funtions will be displayed on this page, but will still be in seperate files */

  render() {
    return (
      <View>
				<Text>DUMMY DIAL</Text>
				<Text>DUMMY DIAL</Text>
				<Text>DUMMY DIAL</Text>
				<CallPage />
				<TextPage />
        <AddContact />
        <Text style={styles.testSass}>TESTING SASS IN REACT NATIVE</Text>
      </View>
    );
  }
}
