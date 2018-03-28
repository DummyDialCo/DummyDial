import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage } from 'react-native';
import { StackNavigator } from "react-navigation";

export default class TextPage extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			recipient:"",
			myMsg:""
		}
	}
    
    componentDidMount = () => {
    
    AsyncStorage.getItem("storeTheNum").then((value)=>{
      console.log("value", value);
      if (value !== null){
        console.log(value);
        this.setState({
          recipient:value
        })
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
