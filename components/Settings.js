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
			<Text>
			{'\n'}
			</Text>
			<Text style={Styles.tBanTitle}>Settings</Text>
			</View>

         	<Text>
			{'\n'}
			</Text>

		<View style={Styles.settingsInpCont}>

		<Text style={Styles.steps}>Change or update your number here
			</Text>

			<View style={Styles.smBreak2}></View>

			<View style={Styles.setInpBtnCont}>
			 <TextInput
					style={Styles.setInpt}
					keyboardType='number-pad'
					returnKeyType='done'
					placeholder={this.state.recipient}
					onChangeText={(recipient)=>this.setState({recipient})}
					onSubmitEditing={this.changePhoneNumber}
				/>

				<TouchableOpacity style={Styles.btn} onPress={this.changePhoneNumber}>
				<Image
		  		source={require("./imgs/savew.png")}
					style={{width: 21, height: 21}}
				/>
				<Text style={Styles.btnTTxt}>Save</Text>
				</TouchableOpacity>

			</View>

		<View style={Styles.smBreak}></View>

        <Text style={Styles.steps}>Add this number to your contacts
			</Text>

			<View style={Styles.smBreak2}></View>

			<View style={Styles.setInpBtnCont}>
				
			 <View style={Styles.contNum}>
				 <Text style={Styles.steps}>1 (604) 330-2056</Text>
			 </View>
			 
				<TouchableOpacity style={Styles.btn}>
				<Image
		  		source={require("./imgs/copyw.png")}
				style={{width: 19, height: 21}}
				/>
				<Text style={Styles.btnTTxt}>Copy</Text>
				</TouchableOpacity>
			</View>

		</View>

        <Text>
		{'\n'}
		</Text>

		<TouchableOpacity style={Styles.setBtnsCont} onPress={() => Linking.openURL('mailto:rajanrai93@icloud.com?subject=DummyDial Sucks&body=That is all')}>

			<View style={Styles.setBtnL}>
				<Image
				style={{width: 28, height: 21}}
				source={require('./imgs/mail.png')}/>

				<Text style={Styles.setBtnsTitle}>Contact us</Text>
			</View>

				<Text style={Styles.setArw}>></Text>

		</TouchableOpacity>

		<View style={Styles.smBreak2}></View>

		<TouchableOpacity style={Styles.setBtnsCont} onPress={()=>navigate("FAQs", {recipient: this.state.recipient})}>

			<View style={Styles.setBtnL}>
				<Image
				style={{width: 28, height: 28}}
				source={require('./imgs/qmark.png')}/>
				<Text style={Styles.setBtnsTitle}>FAQs</Text>
			</View>

				<Text style={Styles.setArw}>></Text>

		</TouchableOpacity>

<View style={Styles.navBar}>

          <TouchableOpacity onPress={()=>navigate("Home", {recipient: this.state.recipient})}>

			<View style={Styles.navBarBtn}>
			<Image
			style={{width: 23, height: 25}}
			source={require("./imgs/sphone.png")}/>
            <Text style={Styles.navTxt}>Instant</Text>
			</View>

          </TouchableOpacity>

          <TouchableOpacity onPress={()=>navigate("TextPage", {recipient: this.state.recipient})}>

			<View style={Styles.navBarBtn}>
			<Image
			style={{width: 32, height: 25}}
			source={require("./imgs/stext.png")}/>
            <Text style={Styles.navTxt}>Text Body</Text>
			</View>

          </TouchableOpacity>

          <TouchableOpacity onPress={()=>navigate("Timer", {recipient: this.state.recipient})}>

			<View style={Styles.navBarBtn}>
			<Image
			style={{width: 25, height: 25}}
			source={require("./imgs/stime.png")}/>
            <Text style={Styles.navTxt}>Timer</Text>
			</View>

          </TouchableOpacity>

          <TouchableOpacity onPress={()=>navigate("Settings", {recipient: this.state.recipient})}>

			<View style={Styles.navBarBtn}>
			<Image
			style={{width: 25, height: 25}}
			source={require("./imgs/sgearb.png")}/>
            <Text style={Styles.navTxt}>Settings</Text>
			</View>

          </TouchableOpacity>
        </View>
	</View>
    );
  }
}
