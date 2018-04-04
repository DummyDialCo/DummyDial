import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, TouchableOpacity } from 'react-native';
import { StackNavigator } from "react-navigation";

import Styles from "./scss/Styles.scss";

export default class Welcome extends React.Component {

  static navigationOptions = {
    header: null
  };

	constructor(props){
		super(props);

		this.state = {
      	recipient:null
		}
	}


  validatePhoneNum = (phoneNum) => {
		const regex = /^\d{10}/;
		return regex.test(phoneNum);
	}


  finishSignup = () => {

    const { navigate } = this.props.navigation;

    if(this.validatePhoneNum(this.state.recipient)){
			// Stores the phone number in AsyncStorage
      AsyncStorage.setItem("storeTheNum", this.state.recipient).catch((err)=>{
        console.log(err);
      });
		} else {
      // TODO Change this to a notification for the user
			console.log("PHONE NUMBER INVALID");
		}

    navigate("Menu");

	}

  render() {
    return (
      <View style={Styles.all}>
		
		<View style={Styles.tBan}></View>

		<Text>
		{"\n"}
		{"\n"}
		{"\n"}
		{"\n"}
		{"\n"}
		{"\n"}
		</Text>

        <Text style={Styles.title}>Dummy Dial</Text>

		<Text>
		{"\n"}
		{"\n"}
		</Text>

		<Text style={Styles.steps}>
		Step 1
		{"\n"}
		Enter your phone number
		{"\n"}
		</Text>

		<View style={Styles.inptIcnCont}>
        <TextInput
            keyboardType="number-pad"
			style={Styles.inpt}
			placeholder="xxx-xxx-xxxx"
			onChangeText={(recipient)=>this.setState({recipient})}
			value={this.state.recipient}
			/>
		<View style={Styles.inptInc}></View>
		</View>

		<Text></Text>

		<TouchableOpacity style={Styles.qInfo}>
		<Text style={Styles.qInfoTxt}>
		Why do you need my number </Text>
		<View style={Styles.qMrk}>
		<Text style={Styles.qMrkTxt}>?</Text>
		</View>
		</TouchableOpacity>

		<Text>
		{"\n"}
		{"\n"}
		{"\n"}
		{"\n"}
		{"\n"}
		{"\n"}
		{"\n"}
		</Text>

        <TouchableOpacity style={Styles.btn} onPress={this.finishSignup}>
			<Text style={Styles.btnTxt}>Submit</Text>
		</TouchableOpacity>
      </View>
    );
  }
}
