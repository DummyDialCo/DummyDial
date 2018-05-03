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
  Keyboard
} from "react-native";
import { StackNavigator } from "react-navigation";
import Styles from "./scss/Styles.scss";

export default class TextBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipient: this.props.navigation.state.params.recipient,
      myMsg: "",
      behavior: "position"
    };
  }

  componentDidMount = () => {
    // Retrieves the stored message
    AsyncStorage.getItem("storeTheMsg")
    .then(value => {
      if (value !== null) {
        // Logs out the current message if there is one
        console.log("Current stored text body:", value);
        this.setState({
          myMsg: value
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
  };

  saveText = () => {
    Keyboard.dismiss();
    // saving text message to AsyncStorage
    AsyncStorage.setItem("storeTheMsg", this.state.myMsg)
      .then(value => {
        // Logs out the message which you just saved
        console.log("Saved text body:", value);
      })
      .catch(err => {
        console.log(err);
      });
  };

  sendText = () => {
    Keyboard.dismiss();
    // Included in both saveText() and sendText() so that either can be clicked, and the message body will save

   this.saveText();

    fetch(
      "https://quiet-fortress-33478.herokuapp.com/" +
        this.state.recipient +
        "/" +
        this.state.myMsg
    );
  };

  componentWillMount() {
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidHide() {
    Keyboard.dismiss();
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={Styles.all}>
        <View style={Styles.tBan}>
          <Text>{"\n"}</Text>
          <Text style={Styles.tBanTitle}>Text Body</Text>
        </View>

        <View behavior={this.state.behavior}>
          <View>
            <Text>
              {"\n"}
              {"\n"}
              {"\n"}
            </Text>

            <View style={Styles.txtMsgInpCont}>
              <Text style={Styles.steps}>
                Enter text message content below
              </Text>

              <View style={Styles.smBreak2} />

              <TextInput
                style={Styles.inptTxtMsg}
                multiline={true}
                numberOfLines={4}
                blurOnSubmit={true}
                underlineColorAndroid="transparent"
                returnKeyType={"default"}
                placeholder="eg. &quot;Emergency, come now!&quot; "
                ref={el => {
                  this.myMsg = el;
                }}
                onChangeText={myMsg => this.setState({ myMsg })}
                value={this.state.myMsg}
                onSubmitEditing={this.saveText}
              />
            </View>

            <Text>{"\n"}</Text>

            <View style={Styles.BtnCont}>
              <TouchableOpacity style={Styles.btn} onPress={this.saveText}>
                <Image
                  source={require("./imgs/savew.png")}
                  style={{ width: 21, height: 21 }}
                />
                <Text style={Styles.btnTTxt}>Save</Text>
              </TouchableOpacity>

              <View style={Styles.smBreak3} />

              <TouchableOpacity style={Styles.btn} onPress={this.sendText}>
                <Image
                  source={require("./imgs/textw.png")}
                  style={{ width: 27, height: 21 }}
                />
                <Text style={Styles.btnTTxt}>Text Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={Styles.navBar}>
          <TouchableOpacity
            onPress={() =>
              navigate("Home", {
                recipient: this.state.recipient
              })
            }
          >
            <View style={Styles.navBarBtn}>
              <Image
                style={{ width: 28, height: 30 }}
                source={require("./imgs/sphone.png")}
              />
              <Text style={Styles.navTxt}>Instant</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigate("TextPage", {
                recipient: this.state.recipient
              })
            }
          >
            <View style={Styles.navBarBtn}>
              <Image
                style={{ width: 37, height: 30 }}
                source={require("./imgs/stextb.png")}
              />
              <Text style={Styles.navTxtB}>Text Body</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigate("Timer", {
                recipient: this.state.recipient
              })
            }
          >
            <View style={Styles.navBarBtn}>
              <Image
                style={{ width: 30, height: 30 }}
                source={require("./imgs/stime.png")}
              />
              <Text style={Styles.navTxt}>Timer</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigate("Settings", {
                recipient: this.state.recipient
              })
            }
          >
            <View style={Styles.navBarBtn}>
              <Image
                style={{ width: 30, height: 30 }}
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
