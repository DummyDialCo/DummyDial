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


	validatePhoneNum = (phoneNum) => {
		const regex = /^\d{10}/;
		return regex.test(phoneNum);
	}

	changePhoneNumber = () => {

		if(this.validatePhoneNum(this.state.recipient)){
			// Stores the phone number in AsyncStorage
	    AsyncStorage.setItem("storeTheNum", this.state.recipient).catch((err)=>{
	      console.log(err);
	    });
		} else {
			// TODO Change this to a notification for the user
			console.log("PHONE NUMBER INVALID");
		}

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


			<Text>
				{"\n"}
				{"\n"}
				{"\n"}
				{"\n"}
			</Text>

			<Text>EDIT PHONE NUMBER HERE</Text>
			<TextInput
                keyboardType="number-pad"
                returnKeyType='done'
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
