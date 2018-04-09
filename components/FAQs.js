import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, TouchableOpacity, TouchableHighlight, Icon, Image } from 'react-native';
import { StackNavigator } from "react-navigation";
import Styles from "./scss/Styles.scss";
import { Linking } from 'react-native';

export default class FAQs extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			recipient:this.props.navigation.state.params.recipient
		}
	}


	render() {
		const {navigate} = this.props.navigation;

		return (
			<View style={Styles.all}>
				<View style={Styles.tBan}>
					<Text></Text>
					<Text style={Styles.tBanTitle}>FAQs</Text>

					<Text onPress={()=>{navigate("Settings", {recipient: this.state.recipient})}} style={Styles.backBtn}>
						<Image source={require("./imgs/backicon.png")}/>
					</Text>

					<Text>Why do you need my number?</Text>
					<Text>Dummy Dial works by sending real calls and text messages straight to your phone.{"\n"}</Text>

					<Text>Will my number be shared?</Text>
					<Text>Your phone number will be kept confidential and never be shared.{"\n"}</Text>

					<Text>Why do I have to create a contact using a certain number?</Text>
					<Text>Dummy Dial uses a custom number to send your calls and texts, and you have to save this number into your phones contacts however you would like the ID of the caller to appear.
					{"\n"}Example: enter the number into your contacts as "Mom", then when receiving the call or text, it will appear as if "Mom" is contacting you.{"\n"}</Text>

					<Text>For all other inquiries:{"\n"}</Text>
					<TouchableOpacity onPress={() => Linking.openURL('mailto:rajanrai93@icloud.com?subject=DummyDial Sucks&body=That is all')} style={Styles.mBar}>
	 					<View style={Styles.mBarL}>
		 					<Image source={require("./imgs/mailicon.png")}/>
		 					<Text style={Styles.mTitle}> Contact Us </Text>
	 					</View>
	 				</TouchableOpacity>

				</View>
			</View>
    );
  }
}
