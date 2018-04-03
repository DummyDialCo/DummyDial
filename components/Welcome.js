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
      recipient:""
		}
	}

  finishSignup = () => {

    const { navigate } = this.props.navigation;

    // Stores the phone number asynchronously
    AsyncStorage.setItem("storeTheNum", this.state.recipient).catch((err)=>{
      console.log(err);
    });

    // this.setState({
    //   completedSignup:"true"
    // });
    // console.log(this.state.completedSignup);

    // Stores the value of completedSignup to "true"
    // AsyncStorage.setItem("storeSignupStatus", this.state.completedSignup).catch((err)=>{
    //   console.log(err);
    // });

    // Add RegEx later to validate phone number
    if(this.state.recipient === "")
      console.log("PHONE NUMBER EMPTY");

    // console.log("THIS IS THE SIGNUP STATUS FROM WELCOME.JS", this.state.completedSignup);

    navigate("Menu");

  }



  render() {

    // const { navigate } = this.props.navigation;

    // var currentButton = null;
    // if(this.state.completedSignup === "true"){
    //   // Saves entered values to AsyncStorage
    //   currentButton = <Button onPress={this.finishSignup} title="SAVE PHONE NUMBER" />
    // }
    // else {
    //   // Navigates to the Menu comp. Later: Only allow navigation if signup has been completed
    //   currentButton = <Button onPress={()=>navigate("Menu")} title="CONTINUE" />
    // }

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

        <Button onPress={this.finishSignup} title="SAVE PHONE NUMBER" />

      </View>
    );
  }
}
