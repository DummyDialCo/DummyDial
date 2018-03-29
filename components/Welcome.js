import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, TouchableOpacity } from 'react-native';
import { StackNavigator } from "react-navigation";

export default class Welcome extends React.Component {

  static navigationOptions = {
    header: null
  };

	constructor(props){
		super(props);

		this.state = {
      recipient:"",
      completedSignup:false
		}
	}

  finishSignup = () => {

    // Stores the number asynchronously
    AsyncStorage.setItem("storeTheNum", this.state.recipient).catch((err)=>{
      console.log(err);
    });

    this.setState({
      completedSignup:true
    });

  }

  render() {
    const { navigate } = this.props.navigation;

    console.log(this.state.completedSignup);

    return (
      <View>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>


        <Text>Welcome to Dummy Dial!</Text>

        <TextInput
					placeholder="Enter your number"
          placeholderTextColor="black"
					onChangeText={(recipient)=>this.setState({recipient})}
					value={this.state.recipient}
				/>

        <Button onPress={()=>navigate("Menu")} title="CONTINUE" />


      </View>
    );
  }
}
