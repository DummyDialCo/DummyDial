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
        <View
          style={Styles.tBan}
          onPress={() => {
            navigate("Settings", { recipient: this.state.recipient });
          }}
        >
          <Text>{"\n"}</Text>
		
        <Text style={Styles.tBanTitle}>FAQs</Text>
        </View>
            <Text></Text>
        <View style={Styles.whiteBG}>
        <Text style={Styles.faqTxt}>
          <Text style={Styles.blueTxt}>Why do you need my number?</Text>
          {"\n"}
          <Text style={Styles.faqTxtParas}>
            Dummy Dial works by sending real calls and text messages straight to
            your own phone.
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
            Dummy Dial uses a custom number to send you calls and texts. Saving this number into your contacts allows you to change the appearance of calls & texts.
          </Text>
          {"\n"}
          {"\n"}
          <Text style={Styles.faqTxtParas}>
            Example: enter the number into your contacts as “Mom” then when
            recieving a call or text it will appear as though “Mom” contacting
            you.
          </Text>
          {"\n"}
          {"\n"}

    <Text style={Styles.blueTxt}>For all other inquiries:</Text>
        </Text>
           </View>
            <Text>
            </Text>
        <TouchableOpacity
          style={Styles.setBtnsCont}
          onPress={() =>
            Linking.openURL(
              "mailto:rajanrai93@icloud.com?subject=DummyDial&body="
            )
          }
        >
          <View style={Styles.setBtnL}>
            <Image
              style={{ width: 28, height: 21 }}
              source={require("./imgs/mail.png")}
            />
            <Text style={Styles.setBtnsTitle}>Contact us</Text>
          </View>

          <Text style={Styles.setArw}>></Text>
        </TouchableOpacity>

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
              navigate("Settings", { recipient: this.state.recipient })
            }
          >
            <View style={Styles.navBarBtn}>
              <Image
                style={{ width: 25, height: 25 }}
                source={require("./imgs/sgearb.png")}
              />
              <Text style={Styles.navTxt}>Settings</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
