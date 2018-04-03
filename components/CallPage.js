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
			recipient:null
		}
	}

	componentDidMount = () => {
		AsyncStorage.getItem("storeTheNum").then((value)=>{
      console.log("Stored number -", value);
      if (value !== null){
        console.log(value);
        this.setState({
          recipient:value
        })
      }
    }).catch((err)=>{
      console.log(err);
    });
	}

  	sendCall = () => {
		fetch("http://dummydial93.herokuapp.com/"+this.state.recipient);
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

			<Text>{this.state.recipient}</Text>

        <Button onPress={this.sendCall} title="SEND CALL" color="orange" />

			<TouchableOpacity onPress={()=>{navigate("Home")}}>
				<Text>CLICK TO RETURN TO HOME</Text>
			</TouchableOpacity>


      </View>
    );
  }
}
