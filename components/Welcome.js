import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import { StackNavigator } from "react-navigation";

import Styles from "./scss/Styles.scss";

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
			AsyncStorage.setItem("storeTheNum", this.state.recipient).catch((err)=>{
				console.log(err);
			});
		} else {
			// TODO Change this to a notification for the user
			throw "INVALID PHONE NUMBER";
		}
		navigate("Menu");
	}

	render() {
		return (
            <KeyboardAvoidingView behavior="position">
			<View style={Styles.all}>
				<View style={Styles.tBan}></View>
				<Text>
					{"\n"}
					{"\n"}
				</Text>

				<Image source={require("./imgs/phoneIconB.png")}/>

				<Text>
				</Text>

				<Text style={Styles.title}>DummyDial</Text>

				<Text>
					{"\n"}
                {"\n"}
				</Text>

				<Text style={Styles.steps}>Step 1) {"\n"}Enter Your Phone Number{"\n"}</Text>

				<View style={Styles.inptIcnCont}>

					<TextInput
						keyboardType="number-pad"
						returnKeyType='done'
						style={Styles.inpt}
						placeholder="xxx-xxx-xxxx"
						onChangeText={(recipient)=>this.setState({recipient})}
						value={this.state.recipient}
					/>

					<View style={Styles.inptInc}></View>

				</View>
				<Text>
                {"\n"}
                <Text>
                </Text>
                </Text>


                    	<TouchableOpacity style={Styles.btn} onPress={this.finishSignup}>
					<Text style={Styles.btnTxt}>Submit</Text>
				</TouchableOpacity>

                    	<Text>
					{"\n"}
                    {"\n"}
				</Text>

				<TouchableOpacity style={Styles.qInfo}>
					<Text style={Styles.qInfoTxt}>Why do you need my number</Text>
					<View style={Styles.qMrk}>
						<Text style={Styles.qMrkTxt}>?</Text>
					</View>
				</TouchableOpacity>

				<Text>{"\n"}{"\n"}{"\n"}{"\n"}</Text>


      </View>
                    </KeyboardAvoidingView>
    );
  }
}
