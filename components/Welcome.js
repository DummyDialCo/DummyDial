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

  finishSignup = () => {

    const { navigate } = this.props.navigation;

    // Stores the phone number in AsyncStorage
    // AsyncStorage.setItem("storeTheNum", this.state.recipient).catch((err)=>{
    //   console.log(err);
    // });

    // TODO Add RegEx to validate phone number
    if(this.state.recipient === "")
      console.log("PHONE NUMBER EMPTY");

      // TODO Send recipient state value to Menu.js
      navigate("Menu");
  	}

  render() {

    return (
      <View style={Styles.all}>

		<Text>
		{"\n"}
		{"\n"}
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
		Step 1)
		{"\n"}
		Enter your phone number
		{"\n"}
		</Text>

		<View style={Styles.inptIcnCont}>
        <TextInput
			style={Styles.inpt}
			placeholder="xxx-xxx-xxxx"
			onChangeText={(recipient)=>this.setState({recipient})}
			value={this.state.recipient}
			/>
		<View style={Styles.inptInc}></View>
		</View>

		<Text></Text>
		
		<View style={Styles.qInfo}>
		<Text style={Styles.qInfoTxt}>
		Why do you need my number </Text>
		<View style={Styles.qMrk}>
		<Text style={Styles.qMrkTxt}>?</Text>
		</View>
		</View>

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
