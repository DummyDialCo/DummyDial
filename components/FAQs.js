import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage,
  TouchableOpacity,
  TouchableHighlight,
  Icon,
  Image
} from "react-native";
import { StackNavigator } from "react-navigation";
import Styles from "./scss/Styles.scss";
import { Linking } from "react-native";

export default class FAQs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipient: this.props.navigation.state.params.recipient
    };
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={Styles.all}>
        <TouchableOpacity
          style={Styles.tBan}
          onPress={() => {
            navigate("Settings", { recipient: this.state.recipient });
          }}
        >
          <Text>{"\n"}</Text>

          <View style={Styles.backACont}>
			  <Image
                source={require("./imgs/backA.png")}
				style={Styles.backA}
              />
			 <Text style={Styles.tBanTitle}>FAQs</Text>
			 <View></View>
			</View>
		  
        </TouchableOpacity>
        <Text></Text>
        <View style={Styles.whiteBG}>
          <Text style={Styles.faqTxt}>
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
             No, your number will not be shared. 
			{"\n"}
			{"\n"}
			Dummy Dial will not access, send, or share your number. Your information is safe with us.
            </Text>
            {"\n"}
            {"\n"}
            <Text style={Styles.blueTxt}>
              Why do you need to access my contacts?
            </Text>
            {"\n"}

            <Text style={Styles.faqTxtParas}>
            Dummy Dial allows you to customize the look of the calls and texts by adding the number used to call or text your device into your contacts, with the name you provide.
			  {"\n"}
			  {"\n"}
			  You can change / view this contact in your phones contacts at any time.
			  {"\n"}
			  {"\n"}
			  Example:
			  {"\n"}
			  Entering the name of the contact as “Mom” will appear as though “Mom” is contacting you when you receive a call or text.

            </Text>
          </Text>
        </View>

        <View style={Styles.navBar}>
          <TouchableOpacity
            onPress={() =>
              navigate("Home", { recipient: this.state.recipient })
            }
          >
            <View style={Styles.navBarBtn}>
              <Image
                style={{ width: 23, height: 25 }}
                source={require("./imgs/sphone.png")}
              />
              <Text style={Styles.navTxt}>Instant</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigate("Timer", { recipient: this.state.recipient })
            }
          >
            <View style={Styles.navBarBtn}>
              <Image
                style={{ width: 25, height: 25 }}
                source={require("./imgs/stime.png")}
              />
              <Text style={Styles.navTxt}>Timer</Text>
            </View>
          </TouchableOpacity>

		<TouchableOpacity
            onPress={() =>
              navigate("TextBody", { recipient: this.state.recipient })
            }
          >
            <View style={Styles.navBarBtn}>
              <Image
                style={{ width: 32, height: 25 }}
                source={require("./imgs/stext.png")}
              />
              <Text style={Styles.navTxt}>Text Body</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigate("Settings", { recipient: this.state.recipient })
            }
          >
            <View style={Styles.navBarBtn}>
              <Image
                style={{ width: 25, height: 25 }}
                source={require("./imgs/sgearb.png")}
              />
              <Text style={Styles.navTxtB}>Settings</Text>
            </View>
          </TouchableOpacity>

        </View>

      </View>
    );
  }
}
