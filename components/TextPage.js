import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage } from 'react-native';
import { StackNavigator } from "react-navigation";

export default class TextPage extends React.Component {

	static navigationOptions = {
    header: null
  };

	constructor(props){
		super(props);

		this.state = {
			recipient:"",
			myMsg:""
		}
	}

  componentDidMount = () => {

		// NOTE
		// Phone number storage will take place in a settings/setup page.
		// This will be transfered at a later date.

		// Retrieves the stored phone number
    AsyncStorage.getItem("storeTheNum").then((value)=>{
      console.log("value", value);
      if (value !== null){
        console.log(value);
        this.setState({
          recipient:value
        });
      }
    }).catch((error)=>{
      console.log(error);
    });
		// Retrieves the stored message
		AsyncStorage.getItem("storeTheMsg").then((value)=>{
      console.log("value", value);
      if (value !== null){
        console.log(value);
        this.setState({
          myMsg:value
        });
      }
    }).catch((error)=>{
      console.log(error);
    });
	}


  sendText = () => {
    fetch("https://quiet-fortress-33478.herokuapp.com/"+this.state.recipient+"/"+this.state.myMsg);

  	AsyncStorage.setItem("storeTheNum", this.state.recipient).then((resp)=>{
      console.log("resp", resp);
    }).catch((error)=>{
      console.log(error);
    });
		AsyncStorage.setItem("storeTheMsg", this.state.myMsg).then((resp)=>{
      console.log("resp", resp);
    }).catch((error)=>{
      console.log(error);
    });
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
        />


        <Button onPress={this.sendText} title="SEND TEXT" color="orange" />


      </View>
    );
  }
}
