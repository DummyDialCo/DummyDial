import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, TouchableOpacity } from 'react-native';
import { StackNavigator } from "react-navigation";

import Styles from "./scss/Styles.scss";

export default class Menu extends React.Component {

  static navigationOptions = {
    header: null
  };


  render() {

    const { navigate } = this.props.navigation;

    return (
       <View style={Styles.all}>

		<View style={Styles.tBan}></View>
		
		<Text>
		{"\n"}
		</Text>
		
		<Text style={Styles.subTitle}>Dummy Dial</Text>
		<Text></Text>
		
		<Text>
		{"\n"}
		{"\n"}
		</Text>

        <Text style={Styles.usrPhnNum}>{this.props.recipient}</Text>
		
        <Text>
		{"\n"}
		{"\n"}
		</Text>

        <TouchableOpacity style={Styles.mBar} onPress={()=>navigate("CallPage")}>
		<View style={Styles.inptInc}></View>
		<Text style={Styles.mTitle}>Call Page</Text>

		<Text style={Styles.arw}>
			>
		</Text>
		</TouchableOpacity>
		
		<Text></Text>
	
        <TouchableOpacity style={Styles.mBar} onPress={()=>navigate("TextPage")}>
		<View style={Styles.inptInc}></View>
		<Text style={Styles.mTitle}>Text Body & Timer</Text>
		
		<Text style={Styles.arw}>
			>
		</Text>
		</TouchableOpacity>
		
    	<Text></Text>
		
        <TouchableOpacity style={Styles.mBar} onPress={()=>navigate("Settings")}>
		<View style={Styles.inptInc}></View>
		<Text style={Styles.mTitle}>Settings</Text>
		
		<Text style={Styles.arw}>
			>
		</Text>
		</TouchableOpacity>
		
		<Text>
		{"\n"}
		{"\n"}
		{"\n"}
		</Text>
		
		<TouchableOpacity style={Styles.btnM}>
			<View style={Styles.btnMCont}>
			<View style={Styles.inptIncM}></View>
			<Text style={Styles.btnMTxt}>Call Now</Text>
			</View>
		</TouchableOpacity>
			
		<Text></Text>
		
		<TouchableOpacity style={Styles.btnM}>
			<View style={Styles.btnMCont}>
			<View style={Styles.inptIncM}></View>
			<Text style={Styles.btnMTxt}>Text Now</Text>
			</View>
		</TouchableOpacity>

      </View>
    );
  }
}
