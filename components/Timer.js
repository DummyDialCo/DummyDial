import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { StackNavigator } from "react-navigation";

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
		return (
			<View>
				<TextInput placeholder="Minutes" ref="minInput" keyboardType="numeric" />
				<TextInput placeholder="Seconds" ref="secInput" keyboardType="numeric" />

				<Button onPress={this.startTimer} title="START" />

				<TimerCountdown
					initialSecondsRemaining={(this.state.minsRemaining*60000) + (this.state.secsRemaining*1000)}
					onTimeElapsed={() => console.log('complete')}
					allowFontScaling={true}
					style={{ fontSize: 20 }}
				/>

			</View>
    );
  }
}
