import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { StackNavigator } from "react-navigation";

export default class TestInput extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			phoneNum:"Phone Number"
		}
	}

	setPhoneNumber = (evt) => {
		this.setState({
			phoneNum:evt.target.value
		});
	}

  render() {
    return (
      <View>
				<TextInput onChangeText={this.setPhoneNumber} value={this.state.phoneNum} />
      </View>
    );
  }
}
