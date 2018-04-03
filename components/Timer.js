import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { StackNavigator } from "react-navigation";

import TimerCountdown from "react-native-timer-countdown";

export default class Timer extends React.Component {

	constructor(props){
		super(props);

		this.state = {
      minsRemaining:0,
      secsRemaining:0
		}
	}

  	setMins = (evt) => {
  	  this.setState({
  	    minsRemaining:evt.target.value
  	  });
  	}
	
  	setSecs = (evt) => {
  	  this.setState({
  	    secsRemaining:evt.target.value
  	  });
  	}
	
  render() {
    return (
      <View>
        <TextInput placeholder="Minutes" onChangeText={this.setMins} />
        <TextInput placeholder="Seconds" onChangeText={this.setSecs} />

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
