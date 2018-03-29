import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage } from 'react-native';
import { StackNavigator } from "react-navigation";

import Menu from "./Menu";
import Welcome from "./Welcome";

export default class Home extends React.Component {

	constructor(props){
		super(props);

    this.state = {
      display:null
    }
	}

  componentDidMount = () => {

    


    // this.setState({
    //   display: <Welcome />
    // });
  }

  render() {

    const { navigate } = this.props.navigation;

    // IF STATEMENT WHICH DETERMINES BOOLEAN VALUE OF completedSignup IN WELCOME.JS






    return (
      <View>
        {this.state.display}
      </View>
    );
  }
}
