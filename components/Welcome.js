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

    // Stores the number asynchronously
    AsyncStorage.setItem("storeTheNum", this.state.recipient).catch((err)=>{
      console.log(err);
    });

    this.setState({
      completedSignup:"true"
    });

    AsyncStorage.setItem("storeSignupStatus", this.state.completedSignup).catch((err)=>{
      console.log(err);
    });

    if(this.state.recipient === ""){
      console.log("PHONE NUMBER EMPTY");
    }

    const { navigate } = this.props.navigation;
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

        <TextInput
					placeholder="Enter your number"
          placeholderTextColor="black"
					onChangeText={(recipient)=>this.setState({recipient})}
					value={this.state.recipient}
				/>

        <Button onPress={this.finishSignup} title="CONTINUE" />

      </View>
    );
  }
}
