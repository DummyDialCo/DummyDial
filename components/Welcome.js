import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage } from 'react-native';
import { StackNavigator } from "react-navigation";

export default class Welcome extends React.Component {

	constructor(props){
		super(props);

		this.state = {
      recipient:"",
      completedSignUp:false
		}
	}

  finishSignup = () => {

    // Stores the number asynchronously
    AsyncStorage.setItem("storeTheNum", this.state.recipient).catch((err)=>{
      console.log(err);
    });

    this.setState({
      completedSignUp:true
    });
  }

  render() {
    return (
      <View>

        <Text>Welcome to Dummy Dial</Text>

        <TextInput placeholder="Enter your phone number"  />

        <Button onPress={this.finishSignup} title="CONTINUE" />

      </View>
    );
  }
}
