import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { StackNavigator } from "react-navigation";

import TimerCountdown from "react-native-timer-countdown";

export default class Timer extends React.Component {

	constructor(props){
		super(props);

		this.state = {

		}
	}



  render() {
    return (
      <View>


        <TimerCountdown
          initialSecondsRemaining={360*1000}
          onTimeElapsed={() => console.log('complete')}
          allowFontScaling={true}
          style={{ fontSize: 20 }}
        />


      </View>
    );
  }
}
