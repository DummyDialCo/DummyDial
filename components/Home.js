import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage } from 'react-native';
import { StackNavigator } from "react-navigation";

import Welcome from "./Welcome";
import Menu from "./Menu";

export default class Home extends React.Component {

  static navigationOptions = {
    header: null
  };

	constructor(props){
		super(props);

    this.state = {
      display:null
    }
	}

  componentDidMount = () => {

    // Retreives and determines if the user has already signed up
    AsyncStorage.getItem("storeSignupStatus").then((value)=>{
      console.log("The user has signed up already: ", value);

      // Evaluates string value of completedSignup from Welcome.js, and displays comp accordingly
      if (value === "false"){
        console.log(value);
        this.setState({
          display: <Welcome navigation={this.props.navigation} />
        });
      } else {
        console.log(value);
        this.setState({
          display: <Menu navigation={this.props.navigation} />
        });
      }
    }).catch((err)=>{
      console.log(err);
    });
  }

  render() {

    return (
      <View>
        {this.state.display}
      </View>
    );
  }
}
