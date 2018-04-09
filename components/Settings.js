import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, TouchableOpacity, TouchableHighlight, Icon, Image } from 'react-native';
import { StackNavigator } from "react-navigation";
import Styles from "./scss/Styles.scss";
import { Linking } from 'react-native';

export default class Settings extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			recipient:this.props.navigation.state.params.recipient
		}
	}


	validatePhoneNum = (phoneNum) => {
		const regex = /^\d{10}$/;
		return regex.test(phoneNum);
	}

	changePhoneNumber = () => {

		if(this.validatePhoneNum(this.state.recipient)){
			// Stores the new phone number in AsyncStorage
	    AsyncStorage.setItem("storeTheNum", this.state.recipient).catch((err)=>{
	      console.log(err);
	    });
		} else {
			// TODO Change this to a notification for the user
			throw "INVALID PHONE NUMBER";
		}
	}


  render() {

		const {navigate} = this.props.navigation;

    return (


      <View style={Styles.all}>

        <View style={Styles.tBan}>
        	<Text> </Text>
      		<Text style={Styles.tBanTitle}> Settings </Text>
        </View>

				<View style={Styles.userNumS}>

          <Text>
					{"\n"}{"\n"}{"\n"}{"\n"}

					<Image source={require("./imgs/personicon.png")}/>

          {"\n"}{"\n"}

        	Your Phone Number: {this.state.recipient}

					{"\n"}{"\n"}

					</Text>
			</View>

    	<Text> Change Your Number </Text>

			<TextInput
        keyboardType="number-pad"
        returnKeyType='done'
				placeholder="Change Phone Number"
				placeholderTextColor="black"
				ref="newPhoneInput"
				onChangeText={(recipient)=>this.setState({recipient})}
				value={this.state.recipient}
				onSubmitEditing={this.changePhoneNumber}
			/>


      <TouchableOpacity style={Styles.mBar} onPress={this.changePhoneNumber}>
				<View style={Styles.mBarL}>
					<Text style={Styles.mTitle}> Change Phone Number </Text>
				</View>
			</TouchableOpacity>

        	<Text></Text>

      <TouchableOpacity style={Styles.mBar}>
				<View style={Styles.mBarL}>
					<Image source={require("./imgs/plusicon.png")}/>
					<Text style={Styles.mTitle}> Access My Contacts </Text>
				</View>
			</TouchableOpacity>

    	<Text></Text>

    	 <TouchableOpacity
        onPress={() => Linking.openURL('mailto:rajanrai93@icloud.com?subject=DummyDial Sucks&body=That is all')}
        style={Styles.mBar}>
					<View style={Styles.mBarL}>

					<Image source={require("./imgs/mailicon.png")}/>
					<Text style={Styles.mTitle}> Contact Us </Text>
				</View>
			</TouchableOpacity>

        	<Text></Text>

      <TouchableOpacity style={Styles.mBar} onPress={()=>navigate("FAQs", {recipient: this.state.recipient})}>
				<View style={Styles.mBarL}>
					<Image source={require("./imgs/questionicon.png")}/>
					<Text style={Styles.mTitle}> FAQs </Text>
				</View>
			</TouchableOpacity>


			<View style={Styles.navBar}>
				<TouchableOpacity onPress={()=>navigate("Home", {recipient: this.state.recipient}, {visitedInstant: this.state.visitedInstant})}>
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
