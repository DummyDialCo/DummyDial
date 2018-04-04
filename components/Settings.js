import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, TouchableOpacity } from 'react-native';
import { StackNavigator } from "react-navigation";

export default class CallPage extends React.Component {

	static navigationOptions = {
    	header: null
  	};

	constructor(props){
		super(props);

		this.state = {
			recipient:null
		}
	}

	componentDidMount = () => {

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
	}


	changePhoneNumber = () => {
		// Stores the phone number in AsyncStorage
    AsyncStorage.setItem("storeTheNum", this.state.recipient).catch((err)=>{
      console.log(err);
    });

    // TODO Add RegEx to validate phone number
    if(this.refs.newPhoneInput === "")
      console.log("PHONE NUMBER EMPTY");

	}


  render() {

		const {navigate} = this.props.navigation;

    return (
      <View>
		<Text>
			{"\n"}
			{"\n"}
			{"\n"}
			{"\n"}
			THIS IS THE SETTINGS PAGE!
			{"\n"}
			{"\n"}
			{"\n"}
			{"\n"}
		</Text>

			<Text>YOUR PHONE NUMBER: {this.state.recipient}</Text>

			<Text>
				{"\n"}
				{"\n"}
				{"\n"}
				{"\n"}
			</Text>

			<Text>CHANGE YOUR PHONE NUMBER HERE</Text>
			<TextInput
				placeholder="New phone number..."
				ref="newPhoneInput"
				onChangeText={(recipient)=>this.setState({recipient})}
				value={this.state.recipient}
			/>

			<TouchableOpacity onPress={this.changePhoneNumber}>
				<Text>SAVE</Text>
			</TouchableOpacity>


			<Text>
				{"\n"}
				{"\n"}
				{"\n"}
				{"\n"}
			</Text>

			<TouchableOpacity onPress={()=>{navigate("Home")}}>
				<Text>CLICK TO RETURN TO HOME</Text>
			</TouchableOpacity>

      </View>
    );
  }
}
