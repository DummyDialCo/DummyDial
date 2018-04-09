import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { StackNavigator } from "react-navigation";
import Styles from "./scss/Styles.scss";

import TimerCountdown from "react-native-timer-countdown";

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
			<View>
				<TextInput placeholder="Minutes" ref="minInput" keyboardType="numeric" returnKeyType='done' />
				<TextInput placeholder="Seconds" ref="secInput" keyboardType="numeric" returnKeyType='done' />

				<Button onPress={this.startTimer} title="START" />

				<TimerCountdown
					initialSecondsRemaining={(this.state.minsRemaining*60000) + (this.state.secsRemaining*1000)}
					onTimeElapsed={() => console.log('complete')}
					allowFontScaling={true}
					style={{ fontSize: 20 }}
				/>


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
