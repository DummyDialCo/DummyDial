import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { StackNavigator } from "react-navigation";

export default class CallInput extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			phoneNum:""
		}
	}

	// setPhoneNumber = (evt) => {
	// 	this.setState({
	// 		phoneNum:evt.target.value
	// 	});
	// }

  render() {
    return (
      <View>
				<TextInput
					placeholder="Enter your number"
					onChangeText={(recipient)=>this.setState({recipient})}
					value={this.state.recipient}
				/>
      </View>
    );
  }
}
