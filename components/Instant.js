import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage,
  TouchableOpacity,
  Image
} from "react-native";
import { StackNavigator } from "react-navigation";

import Styles from "./scss/Styles.scss";

export default class Instant extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipient: this.props.recipient,
      myMsg: ""
    };
  }

  componentDidMount() {
    // Determines if there is already a stored message
    AsyncStorage.getItem("storeTheMsg")
      .then(value => {
        if (value) {
          console.log("You have a stored message", value);
          this.setState({
            myMsg: value
          });
        } else {
          this.setState({
            myMsg: "Emergency, come now!"
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  sendCall = () => {
    fetch("https://dummydial93.herokuapp.com/" + this.state.recipient);
  };

  sendText = () => {
    fetch(
      "https://quiet-fortress-33478.herokuapp.com/" +
        this.state.recipient +
        "/" +
        this.state.myMsg
    );
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={Styles.all}>
        <View style={Styles.tBan}>
          <Text>{"\n"}</Text>
          <Text style={Styles.tBanTitle}>Instant</Text>
        </View>

        <Text>
          {"\n"}
          {"\n"}
        </Text>
        <Text> </Text>
        <Text style={Styles.steps}> Instantly receive a call or text </Text>
        <View style={Styles.smBreak2} />
        <Text style={Styles.blueTxt}>{this.state.recipient}</Text>

        <Text>{"\n"}</Text>

        <TouchableOpacity style={Styles.btnM} onPress={this.sendCall}>
          <View style={Styles.btnMCont}>
            <Image
              source={require("./imgs/phonew.png")}
              style={{ width: 40, height: 43 }}
            />
            <Text style={Styles.btnMTxt}>Call Now</Text>
          </View>
        </TouchableOpacity>

        <View style={Styles.smBreak} />

        <TouchableOpacity style={Styles.btnM} onPress={this.sendText}>
          <View style={Styles.btnMCont}>
            <Image
              source={require("./imgs/textw.png")}
              style={{ width: 43, height: 34 }}
            />
            <Text style={Styles.btnMTxt}>Text Now</Text>
          </View>
        </TouchableOpacity>

			<View style={Styles.navBar}>
          <TouchableOpacity
            onPress={() =>
              navigate("Home", { recipient: this.state.recipient })
            }
          >
            <View style={Styles.navBarBtn}>
              <Image
			 	style={Styles.instantNav}
                source={require("./imgs/sphoneb.png")}
              />
              <Text style={Styles.navTxtB}>Instant</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigate("Timer", { recipient: this.state.recipient })
            }
          >
            <View style={Styles.navBarBtn}>
              <Image
				style={Styles.timerNav}
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
				style={Styles.textNav}
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
				style={Styles.settingsNav}
                source={require("./imgs/sgear.png")}
              />
              <Text style={Styles.navTxt}>Settings</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
