import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage } from 'react-native';
import { StackNavigator } from "react-navigation";

export default class Welcome extends React.Component {

  static navigationOptions = {
    header: null
  };

	constructor(props){
		super(props);
    
		this.state = {
      recipient:null
		}
	}

  finishSignup = () => {

    const { navigate } = this.props.navigation;

    // Stores the phone number in AsyncStorage
    AsyncStorage.setItem("storeTheNum", this.state.recipient).catch((err)=>{
      console.log(err);
    });

    // TODO Add RegEx to validate phone number
    if(this.state.recipient === "")
      console.log("PHONE NUMBER EMPTY");

      // TODO Send recipient state value to Menu.js
      navigate("Menu");
  	}

  render() {

    return (
      <View>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>

        <Text>Welcome to Dummy Dial!</Text>
		<Text></Text>
		<Text></Text>
		<Text></Text>
        <TextInput
			placeholder="Enter your number"
          	placeholderTextColor="black"
			onChangeText={(recipient)=>this.setState({recipient})}
			value={this.state.recipient}
			/>
		<Text></Text>
		<Text></Text>
		<Text></Text>
        <Button onPress={this.finishSignup} title="SAVE PHONE NUMBER" />
			<TextInput
				placeholder="Enter your number" />
      </View>
    );
  }
}
