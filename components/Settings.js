import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, TouchableOpacity, Image } from 'react-native';
import { StackNavigator } from "react-navigation";
import Styles from "./scss/Styles.scss";

export default class CallPage extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			recipient:null
		}
	}

	componentDidMount = () => {

		// Retrieves phone number from AsyncStorage when the component mounts
		AsyncStorage.getItem("storeTheNum").then((value)=>{
      if (value !== null){
        console.log("Stored number -", value);
        this.setState({
          recipient:value
        })
      }
    }).catch((err)=>{
      console.log(err);
    });
	}


	validatePhoneNum = (phoneNum) => {
		const regex = /^\d{10}/;
		return regex.test(phoneNum);
	}

	changePhoneNumber = () => {

		if(this.validatePhoneNum(this.state.recipient)){
			// Stores the phone number in AsyncStorage
	    AsyncStorage.setItem("storeTheNum", this.state.recipient).catch((err)=>{
	      console.log(err);
	    });
		} else {
			// TODO Change this to a notification for the user
			console.log("PHONE NUMBER INVALID");
		}

	}


  render() {

		const {navigate} = this.props.navigation;

    return (
        
        
      <View style={Styles.all}>
        
        <View style={Styles.tBan}>
         <Text> </Text>
        <Text style={Styles.tBanTitle}> Settings </Text>
        
        		<Text onPress={()=>{navigate("Home")}} style={Styles.backBtn}>
        <Image source={require("./imgs/backicon.png")}/>
                       
        </Text>
        </View>
        
  


    
		<View style={Styles.userNumS}> 
            
            <Text>

			{"\n"}
			{"\n"}
			{"\n"}
			{"\n"}
    
    <Image source={require("./imgs/personicon.png")}/>
                   
            {"\n"}
            {"\n"}
    
        	Your Phone Number:  
			{this.state.recipient}
    
			{"\n"}
			{"\n"}
		
		</Text>
</View>

        	<Text> Change Your Number </Text>
            
			<TextInput
                keyboardType="number-pad"
                returnKeyType='done'
				placeholder="Change Phone Number"
				placeholderTextColor="black"
				ref="newPhoneInput"
				onChangeText={(recipient)=>this.setState({recipient})}
				value={this.state.recipient}
			/>
            
           
                
        <TouchableOpacity style={Styles.mBar}  onPress={this.changePhoneNumber}>
			
		<View style={Styles.mBarL}>
		<Text style={Styles.mTitle}> Change Phone Number </Text>
		</View>
		</TouchableOpacity>

        	<Text></Text>
      <TouchableOpacity style={Styles.mBar}>
			
		<View style={Styles.mBarL}>
		<Image source={require("./imgs/plusicon.png")}/>
		<Text style={Styles.mTitle}> Access My Contacts </Text>
		</View>
		</TouchableOpacity>
        
        	<Text></Text>
        
        	 <TouchableOpacity style={Styles.mBar}>
		<View style={Styles.mBarL}>
		<Image source={require("./imgs/mailicon.png")}/>
		<Text style={Styles.mTitle}> Contact Us </Text>
		</View>
		</TouchableOpacity>

        	<Text></Text>
        
            <TouchableOpacity style={Styles.mBar}>
		<View style={Styles.mBarL}>
		<Image source={require("./imgs/questionicon.png")}/>
		<Text style={Styles.mTitle}> FAQs </Text>
		</View>
		</TouchableOpacity>



      </View>
    );
  }
}
