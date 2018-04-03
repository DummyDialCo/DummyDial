import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage } from 'react-native';
import { StackNavigator } from "react-navigation";

import Welcome from "./Welcome";
<<<<<<< HEAD

import CallBtn from "./CallBtn";
import CallPage from "./CallPage";

import TextPage from "./TextPage";

import AddContact from "./AddContact";
import Timer from "./Timer";
=======
import Menu from "./Menu";

export default class Home extends React.Component {

  static navigationOptions = {
    header: null
  };
>>>>>>> 6a9f110f92d0ee24b8b9fd2b7517cbd58d1047bb

	constructor(props){
		super(props);

    this.state = {
      display:null
    }
	}

  componentDidMount = () => {




    // TODO: REMOVE completedSignup IN STATE OBJECT






    // Retreives and determines if the user has already signed up
    AsyncStorage.getItem("storeTheNum").then((value)=>{
      console.log("You have signed up already, your phone number is -", value);

      // Evaluates whether or not a phone number was entered in Welcome.js, and displays comp accordingly
      if(value){
        this.setState({
          display: <Menu navigation={this.props.navigation} />
        });
      } else {
        this.setState({
          display: <Welcome navigation={this.props.navigation} />
        });
      }
      // if (value === "false"){
      //   this.setState({
      //     display: <Welcome navigation={this.props.navigation} />
      //   });
      // } else {
      //   this.setState({
      //     display: <Menu navigation={this.props.navigation} />
      //   });
      // }
    }).catch((err)=>{
      console.log(err);
    });
  }

  render() {

    return (
      <View>
<<<<<<< HEAD
		<Text>DUMMY DIAL</Text>
		<Text>DUMMY DIAL</Text>
		<Text>DUMMY DIAL</Text>
        <Welcome />
=======
        {this.state.display}
>>>>>>> 6a9f110f92d0ee24b8b9fd2b7517cbd58d1047bb
      </View>
    );
  }
}
