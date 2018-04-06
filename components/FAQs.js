import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, TouchableOpacity, TouchableHighlight, Icon, Image } from 'react-native';
import { StackNavigator } from "react-navigation";
import Styles from "./scss/Styles.scss";
import { Linking } from 'react-native';

export default class FAQs extends React.Component {

	constructor(props){
		super(props);

		this.state = {
      recipient:this.props.navigation.state.params.recipient
		}
	}


  render() {

		const {navigate} = this.props.navigation;

    return (


      <View style={Styles.all}>

        <View style={Styles.tBan}>
         <Text> </Text>
        <Text style={Styles.tBanTitle}> FAQs </Text>

      		<Text onPress={()=>{navigate("Settings", {recipient: this.state.recipient})}} style={Styles.backBtn}>
            <Image source={require("./imgs/backicon.png")}/>

          </Text>
        </View>


      </View>
    );
  }
}
