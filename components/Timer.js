import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image, Easing } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Styles from './scss/Styles.scss';

import CircularProgressDisplay from 'react-native-progress-circular';

export default class Timer extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			recipient:this.props.navigation.state.params.recipient,
			minsRemaining:0,
			secsRemaining:0,
			progress:0,
			progressBarColor:"transparent",
			totalSecsRemaining:0,
			timeString:"00:00"
		}
	}


	getInitialState(){
    return { progress:0};
  }


	startTimer = () => {
		// var totalSecsRemaining = (this.state.minsRemaining*60) + (this.state.secsRemaining);
		var totalSecsRemaining = (parseFloat(this.state.minsRemaining*60) + parseFloat(this.state.secsRemaining));
		console.log(totalSecsRemaining);

		this.setState({
			totalSecsRemaining: totalSecsRemaining,
			progressBarColor: "#5CACEE"
		});

    var beginCount = setInterval(() => {

			var minZero = "";
			var secZero = "";
      var secondsDigit = totalSecsRemaining % 60;
      var minutesDigit = Math.floor(totalSecsRemaining/60);
      if (secondsDigit <= 9) secZero = "0";
			if(minutesDigit <= 9) minZero = "0";

      this.setState({
        timeString:minZero+minutesDigit+":"+secZero+secondsDigit
      });

			if(this.state.totalSecsRemaining > -1){
				totalSecsRemaining--;
				this.setState({
					totalSecsRemaining: totalSecsRemaining
				});
				var updateProgress = this.state.progress + 1;
				this.setState({progress: updateProgress});
			}

      if (this.state.totalSecsRemaining === 0){
				clearInterval(beginCount);
        console.log(this.state.recipient);
				fetch("http://dummydial93.herokuapp.com/"+this.state.recipient);
			}

    }, 1000);
	}


	render() {

		const {navigate} = this.props.navigation;

    var innerDisplay = (
      <View style={{width: 200, height: 200, flex:1, justifyContent: 'center',
      	alignItems: 'center', backgroundColor: '#f6f6f6'}}>
        <Text style={{fontSize: 30}}>{this.state.timeString}</Text>
      </View>
    );

		return (
			<View style={Styles.all}>

			<View style={Styles.tBan}>
        	<Text>
			{'\n'}
			</Text>
        	<Text style={Styles.tBanTitle}>Timer</Text>
        	</View>

        	<Text>
            {'\n'}
            {'\n'}
			</Text>

			<Text style={Styles.steps}>Do not close app while timer is running
			{'\n'}
			</Text>
			<Text style={Styles.blueTxt}>Tap to set timer
			{'\n'}
			{'\n'}
			</Text>


			<TextInput
				returnKeyType='done'
				keyboardType='number-pad'
				placeholder='Minutes'
				onChangeText={
					(minsRemaining)=>{this.setState({minsRemaining})}
				}
			/>

			<TextInput
				returnKeyType='done'
				keyboardType='number-pad'
				placeholder='Seconds'
				onChangeText={
					(secsRemaining)=>{this.setState({secsRemaining})}
				}
			/>



			<TouchableOpacity onPress={this.startTimer}>
				<Text>Call</Text>
			</TouchableOpacity>


      <View>
        <CircularProgressDisplay.Hollow
            size={200}
	        progressBarWidth={10}
	        backgroundColor={'#ffffff'}
            progressBarColor={this.state.progressBarColor}
             easing= "linear"
	        innerComponent={innerDisplay}
            rotate={((this.state.progress/(parseFloat(this.state.minsRemaining*60)+parseFloat(this.state.secsRemaining)))*360)}
				/>
      </View>


			<Text>
			{'\n'}
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
			style={{width: 28, height: 30}}
			source={require("./imgs/sphone.png")}/>
            <Text style={Styles.navTxt}>Instant</Text>
			</View>

          </TouchableOpacity>

          <TouchableOpacity onPress={()=>navigate("TextBody", {recipient: this.state.recipient})}>

			<View style={Styles.navBarBtn}>
			<Image
			style={{width: 37, height: 30}}
			source={require("./imgs/stext.png")}/>
            <Text style={Styles.navTxt}>Text Body</Text>
			</View>

          </TouchableOpacity>

          <TouchableOpacity onPress={()=>navigate("Timer", {recipient: this.state.recipient})}>

			<View style={Styles.navBarBtn}>
			<Image
			style={{width: 30, height: 30}}
			source={require("./imgs/stimeb.png")}/>
            <Text style={Styles.navTxt}>Timer</Text>
			</View>

          </TouchableOpacity>

          <TouchableOpacity onPress={()=>navigate("Settings", {recipient: this.state.recipient})}>

			<View style={Styles.navBarBtn}>
			<Image
			style={{width: 30, height: 30}}
			source={require("./imgs/sgear.png")}/>
            <Text style={Styles.navTxt}>Settings</Text>
			</View>

          </TouchableOpacity>
        </View>
	</View>
    );
  }
}
