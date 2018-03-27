import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { StackNavigator } from "react-navigation";

export default class TestInput extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			recipient:""
		}
	}

	// setPhoneNumber = (evt) => {
	// 	this.setState({
	// 		recipient:evt.target.value
	// 	});
	// 	console.log(this.state.recipient);
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
