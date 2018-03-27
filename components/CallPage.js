import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { StackNavigator } from "react-navigation";

export default class CallPage extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			recipient:""
		}
	}

  sendCall = () => {
    fetch("http://dummydial93.herokuapp.com/"+this.state.recipient);
  }

  render() {
    return (
      <View>
				<TextInput
					placeholder="Enter your number"
					onChangeText={(recipient)=>this.setState({recipient})}
					value={this.state.recipient}
				/>

        <Button onPress={this.sendCall} title="SEND CALL" color="orange" />
      </View>
    );
  }
}
