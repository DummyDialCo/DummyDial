import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Header
} from "react-native";
import { StackNavigator } from "react-navigation";

import Styles from "./scss/Styles.scss";

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipient: null,
      inputFormStatus: Styles.inptCheck
    };
  }

  validatePhoneNum = phoneNum => {
    const regex = /^\d{10}$/;
    return regex.test(phoneNum);
  };

  finishSignup = () => {
    const { navigate } = this.props.navigation;

    if (this.validatePhoneNum(this.state.recipient)) {
      // Stores the phone number in AsyncStorage
      AsyncStorage.setItem("storeTheNum", this.state.recipient).catch(err => {
        console.log(err);
      });
      navigate("Home", { recipient: this.state.recipient });
    } else {
      this.setState({
        inputFormStatus: Styles.inptInvalid
      });
    }
  };

  render() {
    return (
      <View style={Styles.all}>
        <View style={Styles.tBan}>
        <Text>
		{"\n"}
		</Text>
          <Text style={Styles.tBanTitle}>Welcome</Text>
        </View>

        <View style={Styles.smBreak2}>
            <Text> </Text>
            </View>

        <KeyboardAvoidingView>
          <View style={Styles.all}>
            <Image
              source={require("./imgs/DDLogo.png")}
              style={{ width: 78, height: 100 }}
            />

            <View style={Styles.smBreak2} />
    
            <Text style={Styles.title}>DummyDial</Text>

            <Text>
				{"\n"}
			</Text>

			<Text style={Styles.steps2}>
              Calls & texts will be sent to this number:
            </Text>

			<View style={Styles.smBreak2} />

            <View style={Styles.inptIcnCont}>
				
			<View style={Styles.inptCheckCont}>
				
              <TextInput
                style={this.state.inputFormStatus}
                keyboardType="number-pad"
                returnKeyType="done"
                placeholder="Enter your phone number"
                onChangeText={recipient => {
                  this.setState({ recipient });
                  if (this.validatePhoneNum(recipient)) {
                    this.setState({
                      inputFormStatus: Styles.inptValid
                    });
                  } else if(this.state.inputFormStatus === Styles.inptValid && !this.validatePhoneNum(recipient)){
                    // Condition only changes to invalid if it was previously true
                    this.setState({
                      inputFormStatus: Styles.inptInvalid
                    });
                  }
                }}
              />
			  
			  	<View style={Styles.checkBox}>
				  <Image
              	  source={require("./imgs/check.png")}
				  style={Styles.check}
            	  />
				</View>
				  
			</View>
			  
            </View>

			  <View style={Styles.smBreak} />

			 <Text style={Styles.steps2}>
              Calls & texts will appear with this ID:
            </Text>

			<View style={Styles.smBreak2}/>

            <View style={Styles.inptIcnCont}>
              <TextInput
                style={Styles.inpt}
                placeholder="Enter fake contact name"
              />
            </View>

            <View style={Styles.smBreak2} />

            <Text style={Styles.star}>
              * These can be changed later in settings
            </Text>

           	<Text></Text>
            <Text></Text>
			
            <TouchableOpacity style={Styles.btn} onPress={this.finishSignup}>
              <Text style={Styles.btnTxt}>Submit</Text>
            </TouchableOpacity>

              
            <View style={Styles.smBreak} />
                <Text></Text>
              
            <TouchableOpacity style={Styles.qInfo}>
              <Text style={Styles.blueTxt}>FAQs</Text>
              <Text> </Text>
                 <View style={Styles.qMrk}>
                  <Text style={Styles.qMrkTxt}>?</Text>
                  </View>
             
            </TouchableOpacity>

            <Text>
              {"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
            </Text>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
