import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { StackNavigator } from "react-navigation";

export default class TextPage extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			recipient:"",
			myMsg:""
		}
	}

  sendText = () => {
    fetch("https://quiet-fortress-33478.herokuapp.com/"+this.state.recipient+"/"+this.state.myMsg);
  }

  render() {
    return (
      <View>


				<TextInput
					placeholder="Enter your number"
					onChangeText={(recipient)=>this.setState({recipient})}
					value={this.state.recipient}
				/>

        <TextInput
          placeholder="Enter your message"
          ref={(el)=>{this.myMsg=el;}}
          onChangeText={(myMsg)=>this.setState({myMsg})}
          value={this.state.myMsg}
          placeholderTextColor="black"
        />


        <Button onPress={this.sendText} title="SEND TEXT" color="orange" />


      </View>
    );
  }
}
