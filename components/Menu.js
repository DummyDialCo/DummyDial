import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage } from 'react-native';
import { StackNavigator } from "react-navigation";
import Styles from "./scss/Styles.scss";

export default class Menu extends React.Component {

  static navigationOptions = {
    header: null
  };


  render() {

    const { navigate } = this.props.navigation;

    return (
      <View>
   

        <Text>Phone number: {this.props.recipient} Remove this part later.</Text>
        <Text></Text>

        <Text> Main Menu </Text>

        <Button onPress={()=>navigate("CallPage")} title="Call Timer" style={Styles.inpt}/>
		<Text></Text>
        <Button onPress={()=>navigate("TextPage")} title="Text Timer & Body" />
    <Text></Text>
        <Button onPress={()=>navigate("Settings")} title="Settings" />

      </View>
    );
  }
}
