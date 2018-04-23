import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage
} from "react-native";
import { StackNavigator } from "react-navigation";

import Welcome from "./Welcome";
import Instant from "./Instant";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      display: null
    };
  }

  componentDidMount = () => {
    // Retreives and determines if the user has already signed up
    AsyncStorage.getItem("storeTheNum")
      .then(value => {
        // Evaluates whether or not a phone number was entered in Welcome.js, and displays comp accordingly
        if (value) {
          this.setState({
            display: (
              <Instant navigation={this.props.navigation} recipient={value} />
            )
          });
        } else {
          this.setState({
            display: <Welcome navigation={this.props.navigation} />
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return <View>{this.state.display}</View>;
  }
}
