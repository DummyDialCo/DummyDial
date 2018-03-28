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
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>


        <Text>Welcome to Dummy Dial</Text>

        <TextInput
					placeholder="Enter your number"
					onChangeText={(recipient)=>this.setState({recipient})}
					value={this.state.recipient}
				/>

        <Button onPress={this.finishSignup} title="CONTINUE" />

      </View>
    );
  }
}
