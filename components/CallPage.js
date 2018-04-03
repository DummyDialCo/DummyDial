import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, TouchableOpacity } from 'react-native';
import { StackNavigator } from "react-navigation";

export default class CallPage extends React.Component {

	static navigationOptions = {
    	header: null
  	};

	constructor(props){
		super(props);
		
		this.state = {
			recipient:""
		}
	}

	componentDidMount = () => {
		AsyncStorage.getItem("storeTheNum").then((value)=>{
      		console.log("Stored number: ", value);
			
      			if (value !== null){
						console.log(value);
						this.setState({
          				recipient:value
						})
						
      				}}).catch((err)=>{
      					console.log(err);
					});
				}

  	sendCall = () => {
		fetch("http://dummydial93.herokuapp.com/"+this.state.recipient);
		// AsyncStorage.setItem("storeTheNum", this.state.recipient).then((resp)=>{
    	//   console.log("resp", resp);
    	// }).catch((err)=>{
    	//   console.log(err);
    	// });
  	}

  render() {
		const {navigate} = this.props.navigation;
    return (
      <View>
		<Text></Text>
		<Text></Text>
		<Text></Text>
		<Text></Text>
		<Text></Text>
		
			<TextInput
				placeholder="Enter your number"
				onChangeText={(recipient)=>this.setState({recipient})}
				value={this.state.recipient}
			/>

        <Button onPress={this.sendCall} title="SEND CALL" color="orange" />

			<TouchableOpacity onPress={()=>{navigate("Home")}}>
				<Text>CLICK TO RETURN TO HOME</Text>
			</TouchableOpacity>
      </View>
    );
  }
}
