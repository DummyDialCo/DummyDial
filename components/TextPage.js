import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, TouchableOpacity } from 'react-native';
import { StackNavigator } from "react-navigation";
import Styles from "./scss/Styles.scss";

export default class TextPage extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			recipient:this.props.navigation.state.params.recipient,
			myMsg:""
		}
	}

	componentDidMount = () => {
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


				<View style={Styles.navBar}>
          <TouchableOpacity onPress={()=>navigate("Menu", {recipient: this.state.recipient})}>
            <Text>Instant</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigate("TextPage", {recipient: this.state.recipient})}>
            <Text>Text Body</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigate("Timer", {recipient: this.state.recipient})}>
            <Text>Timer</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigate("Settings", {recipient: this.state.recipient})}>
            <Text>Settings</Text>
          </TouchableOpacity>
        </View>


			</View>
    );
  }
}
