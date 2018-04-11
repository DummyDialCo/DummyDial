import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, TouchableOpacity, Image, KeyboardAvoidingView, Header } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Styles from './scss/Styles.scss';

export default class Welcome extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			recipient:null
		}
	}

	validatePhoneNum = (phoneNum) => {
		const regex = /^\d{10}$/;
		return regex.test(phoneNum);
	}

	finishSignup = () => {

		const { navigate } = this.props.navigation;

		if(this.validatePhoneNum(this.state.recipient)){
			// Stores the phone number in AsyncStorage
			AsyncStorage.setItem('storeTheNum', this.state.recipient).catch((err)=>{
				console.log(err);
			});
		} else {
			// TODO Change this to a notification for the user
			throw 'INVALID PHONE NUMBER';
		}
		navigate('Menu', { recipient: this.state.recipient});
	}

	render() {
		return (
			<View style={Styles.all}>

			<View style={Styles.tBan}>
			<Text>
			{'\n'}
			</Text>
			<Text style={Styles.tBanTitle}>Welcome</Text>
			</View>

				<Text>
				{'\n'}
				{'\n'}
				{'\n'}
				{'\n'}
				</Text>

				<KeyboardAvoidingView>
				<View style={Styles.all}>

				<Image
				source={require('./imgs/sphoneb.png')}
				style={{width: 56, height: 60}}
				/>

				<View style={Styles.smBreak2}></View>

				<Text style={Styles.title}>DummyDial</Text>

				<View style={Styles.smBreak}></View>

				<View style={Styles.smBreak2}></View>

				<View style={Styles.inptIcnCont}>
					<TextInput
						style={Styles.inpt}
						keyboardType='number-pad'
						returnKeyType='done'
						placeholder='Enter your phone number'
						onChangeText={(recipient)=>this.setState({recipient})}
					/>
				</View>

				<View style={Styles.smBreak2}></View>

				<Text style={Styles.star}>* This can be changed later in settings</Text>

				<Text>
                {'\n'}
                </Text>

                 <TouchableOpacity style={Styles.btn} onPress={this.finishSignup}>
					<Text style={Styles.btnTxt}>Submit</Text>
				 </TouchableOpacity>

                <Text>
				{'\n'}
				{'\n'}
				</Text>

				<TouchableOpacity style={Styles.qInfo}>
					<Text style={Styles.blueTxt}>Why do you need my number</Text>
					<Text> </Text>
					<View style={Styles.qMrk}>
					<Text style={Styles.qMrkTxt}>?</Text>
					</View>
				</TouchableOpacity>

				<Text>
				{'\n'}
				{'\n'}
				{'\n'}
				{'\n'}
				</Text>

      			</View>
			</KeyboardAvoidingView>
		</View>
    );
  }
}
