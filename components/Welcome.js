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
      inputFormStatus: null,
      displayFAQ: Styles.faqPopupHidden
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
        inputFormStatus: require("./imgs/checkXC.png")
      });
    }
  };

  render() {
    var faqs = (
      <View style={this.state.displayFAQ}>
		
		<Text>
		{"\n"} 
		{"\n"} 
		{"\n"} 
		{"\n"}
		</Text>
		
        <View style={Styles.whiteBG}>

		<TouchableOpacity
          onPress={() => this.setState({ displayFAQ: Styles.faqPopupHidden })}>
		
			<Image
            source={require("./imgs/greyX.png")}
            style={Styles.faqX}
            />
		
          <Text style={Styles.faqTxt}>
			  
			<Text style={Styles.blueTxt}>FAQs</Text>
			
            {"\n"} 
			{"\n"} 
			
            <Text style={Styles.blueTxt}>Why do you need my number?</Text>
			
            {"\n"}
	
            <Text style={Styles.faqTxtParas}>
              Dummy Dial works by sending real calls and text messages straight
              to your own phone.
            </Text>
            {"\n"}
            {"\n"}
            <Text style={Styles.blueTxt}>Will my number be shared?</Text>
            {"\n"}
            <Text style={Styles.faqTxtParas}>
              Your phone number will be kept confidential and never shared.
            </Text>
            {"\n"}
            {"\n"}
            <Text style={Styles.blueTxt}>
              Why do I have to create a contact using a certain number?
            </Text>
            {"\n"}

            <Text style={Styles.faqTxtParas}>
              Dummy Dial uses a custom number to send you calls and texts.
              Saving this number into your contacts allows you to change the
              appearance of calls & texts.
            </Text>
            {"\n"}
            {"\n"}
            <Text style={Styles.faqTxtParas}>
              Example: enter the number into your contacts as “Mom” then when
              recieving a call or text it will appear as though “Mom” contacting
              you.
            </Text>
          </Text>
		</TouchableOpacity>
       </View>
      </View>
    );

    return (
      <View style={Styles.all}>
        <View style={Styles.tBan}>
          <Text>{"\n"}</Text>
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

            <Text>{"\n"}</Text>

            <Text style={Styles.steps2}>
              Calls & texts will be sent to this number:
            </Text>

            <View style={Styles.smBreak2} />

            <View style={Styles.inptIcnCont}>
              <View style={Styles.inptCheckCont}>
                <TextInput
                  style={Styles.inptCheck}
                  keyboardType="number-pad"
                  returnKeyType="done"
                  placeholder="Enter your phone number"
                  onChangeText={recipient => {
                    this.setState({ recipient });
                    if (this.validatePhoneNum(recipient)) {
                      this.setState({
                        inputFormStatus: require("./imgs/checkC.png")
                      });
                    } else if (
                      this.state.inputFormStatus ===
                        require("./imgs/checkC.png") &&
                      !this.validatePhoneNum(recipient)
                    ) {
                      // Condition only changes to invalid if it was previously true
                      this.setState({
                        inputFormStatus: require("./imgs/checkXC.png")
                      });
                    }
                  }}
                />

                <View style={Styles.checkBox}>
                  <Image
                    source={this.state.inputFormStatus}
                    style={Styles.check}
                  />
                </View>
              </View>
            </View>

            <View style={Styles.smBreak} />

            <Text style={Styles.steps2}>
              Calls & texts will appear with this ID:
            </Text>

            <View style={Styles.smBreak2} />

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

            <Text />
            <Text />

            <TouchableOpacity style={Styles.btn} onPress={this.finishSignup}>
              <Text style={Styles.btnTxt}>Submit</Text>
            </TouchableOpacity>

            <View style={Styles.smBreak} />
            <Text />

            <TouchableOpacity
              style={Styles.qInfo}
              onPress={() => {
                this.setState({ displayFAQ: Styles.faqPopup });
                console.log("clicked faqs");
              }}
            >
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
			{faqs}
      </View>
    );
  }
}
