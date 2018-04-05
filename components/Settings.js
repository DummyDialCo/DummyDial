import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, TouchableOpacity } from 'react-native';
import { StackNavigator } from "react-navigation";
import Styles from "./scss/Styles.scss";

export default class CallPage extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			recipient:null
		}
	}

	componentDidMount = () => {

		// Retrieves phone number from AsyncStorage when the component mounts
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
        
        
      <View style={Styles.all}>
        
        <View style={Styles.tBan}></View>
        
  

			<Text>
				{"\n"}
			</Text>

			<View>
				<Text onPress={()=>{navigate("Home")}}>BACK</Text>
				<Text>Settings</Text>
			</View>


    
		<Text>
			{"\n"}
			{"\n"}
			{"\n"}
			{"\n"}
			{this.state.recipient}
			{"\n"}
			{"\n"}
			{"\n"}
			{"\n"}
			Change Your Number
		</Text>


			<TextInput
                keyboardType="number-pad"
                returnKeyType='done'
				placeholder="Change Phone Number"
				placeholderTextColor="black"
				ref="newPhoneInput"
				onChangeText={(recipient)=>this.setState({recipient})}
				value={this.state.recipient}
			/>

			<TouchableOpacity onPress={this.changePhoneNumber}>
				<Text>Done</Text>
			</TouchableOpacity>


			<Text>
				{"\n"}
				{"\n"}
				{"\n"}
				{"\n"}
			</Text>

			<TouchableOpacity>
				<Text>Access My Contacts</Text>
			</TouchableOpacity>

			<TouchableOpacity>
				<Text>Contact Us</Text>
			</TouchableOpacity>

			<TouchableOpacity>
				<Text>Leave a Rating</Text>
			</TouchableOpacity>



      </View>
    );
  }
}
