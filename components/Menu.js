import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, TouchableOpacity, Image } from 'react-native';
import { StackNavigator } from "react-navigation";

import Styles from "./scss/Styles.scss";

export default class Menu extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      recipient: this.props.recipient
    }
  }


  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={Styles.all}>
		
        <View style={Styles.tBan}>
        <Text></Text>
		<Text></Text>
        <Text style={Styles.tBanTitle}>Main Menu</Text>
        </View>

        <Text>
		{"\n"}
		{"\n"}
		{"\n"}
		{"\n"}
		{"\n"}
		</Text>

        <Text style={Styles.usrPhnNum}>{this.props.recipient}</Text>

        <Text>
		{"\n"}
		</Text>

        <TouchableOpacity style={Styles.btnM}>
          <View style={Styles.btnMCont}>
            <Image 
			source={require("./imgs/phonew.png")}
			style={{width: 40, height: 43}}
			/>
            <Text style={Styles.btnMTxt}>Call Now</Text>
          </View>
        </TouchableOpacity>

        <View style={Styles.smBreak}></View>

        <TouchableOpacity style={Styles.btnM}>
          <View style={Styles.btnMCont}>
            <Image 
		  	source={require("./imgs/textw.png")}
			style={{width: 43, height: 34}}
			/>
            <Text style={Styles.btnMTxt}>Text Now</Text>
          </View>
        </TouchableOpacity>
			

        <View style={Styles.navBar}>
			
          <TouchableOpacity onPress={()=>navigate("Home", {recipient: this.state.recipient})}>
			
			<View style={Styles.navBarBtn}>
			<Image 
			style={{width: 23, height: 25}}
			source={require("./imgs/sphoneb.png")}/>
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
