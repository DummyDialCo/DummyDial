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

          <Text style={Styles.tBanTitle}>FAQs</Text>
        </TouchableOpacity>
        <Text>{"\n"}{"\n"}{"\n"}</Text>
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
              Ensuring your privacy is important to us. DummyDial does not send,
              share or store information that you provided. DummyDial cannot
              access your information, your information is only stored on the
              authorized device.
            </Text>
            {"\n"}
            {"\n"}
            <Text style={Styles.blueTxt}>
              Why do you need to access my contacts?
            </Text>
            {"\n"}

            <Text style={Styles.faqTxtParas}>
              DummyDial lets you customize the look of calls/texts by adding our
              phone number (which we use to call you) into your contacts, with
              your preferred contact ID name that you enter. We do this so you
              don’t have to exit the app to add the information.
            </Text>
            {"\n"}
            {"\n"}
            <Text style={Styles.faqTxtParas}>
              Example: Entering the number into your contacts as “Mom” will
              appear as though “Mom” is contacting you when you receive a call or text.
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
              <Text style={Styles.navTxt}>Settings</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
