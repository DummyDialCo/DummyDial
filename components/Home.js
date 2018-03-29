import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage } from 'react-native';
import { StackNavigator } from "react-navigation";

import Menu from "./Menu";
import Welcome from "./Welcome";

export default class Home extends React.Component {

	constructor(props){
		super(props);

		this.state = {

		}
	}


  render() {

    // var display = null;
    // if(this.props.completedSignUp === false){
    //   display = "<Welcome finishSignup={this.finishSignup} />";
    // } else {
    //   display = <Welcome />;
    // }

    return (
      <View>
        <Welcome />
      </View>
    );
  }
}
