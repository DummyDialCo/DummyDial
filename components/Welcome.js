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
      recipient:"",
      completedSignup:"false"
		}
	}

  finishSignup = () => {

    // Stores the phone number asynchronously
    AsyncStorage.setItem("storeTheNum", this.state.recipient).catch((err)=>{
      console.log(err);
    });

    this.setState({
      completedSignup:"true"
    });

    // Stores the value of completedSignup to "true"
    AsyncStorage.setItem("storeSignupStatus", this.state.completedSignup).catch((err)=>{
      console.log(err);
    });

    // Add RegEx later to validate phone number
    if(this.state.recipient === "")
      console.log("PHONE NUMBER EMPTY");

  }

  render() {

    const { navigate } = this.props.navigation;

    return (
      <View>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>


        <Text>Welcome to Dummy Dial!</Text>

        <TextInput
					placeholder="Enter your number"
          placeholderTextColor="black"
					onChangeText={(recipient)=>this.setState({recipient})}
					value={this.state.recipient}
				/>

        // Saves entered values to AsyncStorage
        <Button onPress={this.finishSignup} title="SAVE PHONE NUMBER" />

        // Navigates to the Menu comp. Later: Only allow navigation if signup has been completed
        <Button onPress={()=>navigate("Menu")} title="CONTINUE" />

      </View>
    );
  }
}
