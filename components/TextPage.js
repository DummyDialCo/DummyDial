import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, TouchableOpacity, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Styles from './scss/Styles.scss';

export default class TextPage extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			recipient:this.props.navigation.state.params.recipient,
			myMsg:''
		}
	}

	componentDidMount = () => {
		console.log("comp mounted");
		// Retrieves the stored message
		AsyncStorage.getItem("storeTheMsg").then((value)=>{
      console.log("value", value);
      if (value !== null){
        console.log(value);
        this.setState({
          myMsg:value
        });
       }
		}).catch((error)=>{
			console.log(error);
		});
	}


	saveText = () => {
		// saving text message to AsyncStorage
		AsyncStorage.setItem("storeTheMsg", this.state.myMsg).then((value)=>{
       console.log("resp", value);
     }).catch((err)=>{
       console.log(err);
		 });
	}


	sendText = () => {

		// Included in both saveText() and sendText() so that either can be clicked, and the message body will save

		// saving text message to AsyncStorage
		AsyncStorage.setItem("storeTheMsg", this.state.myMsg).then((value)=>{
       console.log("resp", value);
     }).catch((err)=>{
       console.log(err);
		 });

		fetch('https://quiet-fortress-33478.herokuapp.com/'+this.state.recipient+'/'+this.state.myMsg);
	}


	render() {
		const { navigate } = this.props.navigation;

		return (
      	<View style={Styles.all}>

        <View style={Styles.tBan}>
        <Text></Text>
		<Text></Text>
        <Text style={Styles.tBanTitle}>Text Body</Text>
        </View>

        <Text>
		{'\n'}
		{'\n'}
		{'\n'}
		</Text>

		<View style={Styles.txtMsgInpCont}>
		<Text style={Styles.steps}>Create content of text body below
		</Text>

		<View style={Styles.smBreak2}></View>

        <TextInput
			style={Styles.inptTxtMsg}
		    returnKeyType="done"
			numberOfLines = {4}
			placeholder='eg. Emergency come now!'
			ref={(el)=>{this.myMsg=el;}}
			onChangeText={(myMsg)=>this.setState({myMsg})}
			value={this.state.myMsg}
			onSubmitEditing={this.saveText}
			/>
		</View>

        <Text>
		{'\n'}
		</Text>

		<View style={Styles.BtnCont}>
			<TouchableOpacity style={Styles.btn} onPress={this.saveText}>
				<Image
		  		source={require("./imgs/savew.png")}
				style={{width: 21, height: 21}}
				/>
				<Text style={Styles.btnTTxt}>Save</Text>
			</TouchableOpacity>

			<View style={Styles.smBreak3}></View>

			<TouchableOpacity style={Styles.btn} onPress={this.sendText}>
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
			source={require("./imgs/stextb.png")}/>
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
			source={require("./imgs/sgear.png")}/>
            <Text style={Styles.navTxt}>Settings</Text>
			</View>

          </TouchableOpacity>
        </View>
	</View>
    );
  }
}
