import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, TouchableOpacity } from 'react-native';
import { StackNavigator } from "react-navigation";

export default class TextPage extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			recipient:null,
			myMsg:""
		}
	}

  componentDidMount = () => {

		// TODO get value using props so AsyncStorage doesn't have to be called when component mounts
		AsyncStorage.getItem("storeTheNum").then((value)=>{
      if (value !== null){
        console.log("Stored number -", value);
        this.setState({
          recipient:value
        })
      }
    }).catch((err)=>{
      console.log(err);
    });


		// Retrieves the stored message
		AsyncStorage.getItem("storeTheMsg").then((value)=>{
      			if (value !== null){
        			console.log("Your stored text message is -", value);
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

		// Stores the text message body for future use when component mounts
		AsyncStorage.setItem("storeTheMsg", this.state.myMsg).then((resp)=>{
      console.log("Message sent");
    }).catch((error)=>{
      console.log(error);
    });
  }

  render() {

		const { navigate } = this.props.navigation;

    return (
      <View>
		<Text></Text>
		<Text></Text>
		<Text></Text>
		<Text></Text>
		<Text></Text>

		<Text>{this.state.recipient}</Text>

        <TextInput
          placeholder="Enter your message"
					placeholderTextColor="black"
          ref={(el)=>{this.myMsg=el;}}
          onChangeText={(myMsg)=>this.setState({myMsg})}
          value={this.state.myMsg}
        />


        <Button onPress={this.sendText} title="SEND TEXT" color="orange" />
			<TouchableOpacity onPress={()=>{navigate("Home")}}>
				<Text>CLICK TO RETURN TO HOME</Text>
			</TouchableOpacity>
      </View>
    );
  }
}
