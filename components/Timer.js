import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Styles from './scss/Styles.scss';

import TimerCountdown from 'react-native-timer-countdown';

export default class Timer extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			minsRemaining:5,
			secsRemaining:2
		}
	}

	// setMins = () => {
	//   this.setState({
	//     minsRemaining:parseInt(this.refs.minInput.value)
	//   });
	// }
	//
	// setSecs = () => {
	//   this.setState({
	//     secsRemaining:parseInt(this.refs.secInput.value)
	//   });
	// }


	startTimer = () => {
		this.setState({
			minsRemaining: this.refs.secInput.value,
			secsRemaining: this.refs.minInput.value
		});
	}


	render() {

		const {navigate} = this.props.navigation;

		return (
			<View style={Styles.all}>
		
			<View style={Styles.tBan}>
        	<Text></Text>
			<Text></Text>
        	<Text style={Styles.tBanTitle}>Timer</Text>
        	</View>

        	<Text>
			{'\n'}
			</Text>
			
			<Text style={Styles.steps}>Do not close app while timer is running
			{'\n'}
			</Text>
			<Text style={Styles.blueTxt}>Tap to set timer
			{'\n'}
			{'\n'}
			</Text>
			
			<View style={Styles.timerInpCont}>
			<TextInput
				style={Styles.timerInp}
				placeholder='00' 
				ref='hrInput' 
				keyboardType='numeric' 
				returnKeyType='done' 
				/>
			
			<Text style={Styles.timerInp}>:</Text>
			
			<TextInput
				style={Styles.timerInp}
				placeholder='00' 
				ref='minInput' 
				keyboardType='numeric' 
				returnKeyType='done' 
				/>
			
			<Text style={Styles.timerInp}>:</Text>
			
			<TextInput 
				style={Styles.timerInp}
				placeholder='00' 
				ref='secInput' 
				keyboardType='numeric' 
				returnKeyType='done' 
				/>
			</View>
			
        	<Text>
			{'\n'}
			</Text>
			
			<View style={Styles.BtnCont}>
			<TouchableOpacity style={Styles.btn} onPress={this.startTimer}>
			 	<Image 
				source={require("./imgs/phonew.png")}
				style={{width: 19, height: 21}}
				/>
				<Text style={Styles.btnTTxt}>Call</Text>
			</TouchableOpacity>
				
			<View style={Styles.smBreak3}></View>
			
			<TouchableOpacity style={Styles.btn} onPress={this.startTimer}>
				<Image 
		  		source={require("./imgs/textw.png")}
				style={{width: 27, height: 21}}
				/>
				<Text style={Styles.btnTTxt}>Text</Text>
			</TouchableOpacity>
			</View>

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
			source={require("./imgs/stimeb.png")}/>
            <Text style={Styles.navTxt}>Timer</Text>
			</View>
			
          </TouchableOpacity>
			
          <TouchableOpacity onPress={()=>navigate("Settings", {recipient: this.state.recipient})}>
			  
			<View style={Styles.navBarBtn}>
			<Image 
			style={{width: 25, height: 25}}
			source={require("./imgs/sgear.png")}/>
            <Text style={Styles.navTxt}>Settings</Text>
			</View>
			
          </TouchableOpacity>
        </View>
	</View>
    );
  }
}
