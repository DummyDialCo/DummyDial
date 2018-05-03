import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  Easing,
  AsyncStorage,
  Keyboard
} from "react-native";
import { StackNavigator } from "react-navigation";
import Styles from "./scss/Styles.scss";

import Slider from "react-native-slider";

export default class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipient: this.props.navigation.state.params.recipient,
      myMsg: "",
      // time props
      value: 0,
      total: 0,
      timeString: "00:00",
      initialTime: 0,
      // btn styling - !clicked turns grey
      callBtnStyles: Styles.btn,
      textBtnStyles: Styles.btn,
      // evaluates which button was clicked
      clickedCallBtn: false,
      clickedTextBtn: false,
      // events after the timer starts\
      navBarHiding: Styles.navBar, // style changes to hidden when timer is running
      displayBlack: Styles.blckBGhidden, // styling changes to display: flex; after
      blckActive: null // function changes this to a boolean
    };
  }

  componentDidMount = () => {
    AsyncStorage.getItem("storeTheMsg")
      .then(value => {
        if (value) this.setState({ myMsg: value });
        else this.setState({ myMsg: "Emergency, come now!" });
      })
      .catch(error => {
        console.log(error);
      });
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

  startedTimer = () => {
    Keyboard.dismiss();

    this.setState({
      navBarHiding: Styles.navBarHidden,
      exitTimerMessage: "Tap here to exit timer",
    });

    this.beginCount = setInterval(() => {

      if (this.state.total > 0) {
        this.setState({
          total: this.state.total - 1,
        });

        this.updatingTimeString();

        console.log("Total", this.state.total);


        if (this.state.total === 0) {
          if (this.state.clickedCallBtn) {
            fetch("https://dummydial93.herokuapp.com/" + this.state.recipient);
          } else if (this.state.clickedTextBtn) {
            fetch("https://quiet-fortress-33478.herokuapp.com/" + this.state.recipient + "/" + this.state.myMsg);
          }

          this.resetTimer();
        }
      }
    }, 1000);
  };

  updatingTimeString = () => {
    var minZero = "";
    var minDigit = Math.floor(this.state.total/60);
    var secZero = "";
    var secDigit = this.state.total % 60;
    if(minDigit <= 9) minZero = "0";
    if(secDigit <= 9) secZero = "0";
    this.setState({ timeString: minZero + minDigit + ":" + secZero + secDigit });
  }


  resetTimer = () => {
    clearInterval(this.beginCount);
    this.setState({});
  };

  displayedBlack = () => {
    if (!this.state.blckActive) {
      this.setState({
        displayBlack: Styles.blckBG,
        blckActive: true
      });
    } else {
      this.setState({
        displayBlack: Styles.blckBGhidden,
        blckActive: false
      });
    }
  };

  render() {
    const { navigate } = this.props.navigation;

    var blckScreen = (
      <TouchableOpacity
        onPress={this.displayedBlack}
        style={this.state.displayBlack}
      />
    );

    return (
      <View style={Styles.all}>
        <View style={Styles.tBan}>
          <Text>{"\n"}</Text>
          <Text style={Styles.tBanTitle}>Timer</Text>
        </View>

        <Text>
          {"\n"}
          {"\n"}
          {"\n"}
        </Text>

        <Text style={Styles.steps}>
          Do not close app while timer is running
        </Text>

        <View style={Styles.smBreak2} />

        <TouchableOpacity onPress={this.displayedBlack}>
          <Text style={Styles.blueTxt}>Tap here for black screen</Text>
        </TouchableOpacity>

        <View style={Styles.smBreak} />

        <Slider
          trackStyle={{ height: 20, backgroundColor: "#fff", borderRadius: 50 }}
          thumbStyle={{ width: 40, height: 40, borderRadius: 20 }}
          thumbTintColor={"#5cacee"}
          minimumTrackTintColor={"#5cacee"}
          style={{
            width: 300,
            direction: "ltr"
          }}
          value={this.state.value}
          step={1}
          minimumValue={0}
          maximumValue={30}
          onValueChange={(value) => {
            this.setState({
              value: value,
              total: value * 60
            });

            this.updatingTimeString();
          }}
          onSlidingComplete={(value)=>{
            console.log("sliding complete", value);
            this.setState({
            });
          }}
        />

        <Text>{this.state.timeString}</Text>

        <Text>{"\n"}</Text>

        <View style={Styles.BtnCont}>
          <TouchableOpacity
            style={this.state.callBtnStyles}
            onPress={() => {
              if (!this.state.timerIsRunning) {
                this.startedTimer();
              }
              this.setState({
                callBtnStyles: Styles.btn,
                textBtnStyles: Styles.greyBtn,
                clickedCallBtn: true,
                clickedTextBtn: false
              });
            }}
          >
            <Image
              source={require("./imgs/phonew.png")}
              style={{ width: 24, height: 26 }}
            />
            <Text style={Styles.btnTTxt}>Call</Text>
          </TouchableOpacity>

          <View style={Styles.smBreak3} />

          <TouchableOpacity
            style={this.state.textBtnStyles}
            onPress={() => {
              if (!this.state.timerIsRunning) {
                this.startedTimer();
              }
              this.setState({
                callBtnStyles: Styles.greyBtn,
                textBtnStyles: Styles.btn,
                clickedCallBtn: false,
                clickedTextBtn: true
              });
            }}
          >
            <Image
              source={require("./imgs/textw.png")}
              style={{ width: 27, height: 21 }}
            />
            <Text style={Styles.btnTTxt}>Text</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={Styles.navBar} onPress={this.resetTimer}>
          <Text style={Styles.stopTimeTxt}>{this.state.exitTimerMessage}</Text>
        </TouchableOpacity>

        <View style={this.state.navBarHiding}>
          <TouchableOpacity
            onPress={() =>
              navigate("Home", { recipient: this.state.recipient })
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
              navigate("TextBody", { recipient: this.state.recipient })
            }
          >
            <View style={Styles.navBarBtn}>
              <Image
                style={{ width: 37, height: 30 }}
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
                style={{ width: 30, height: 30 }}
                source={require("./imgs/stimeb.png")}
              />
              <Text style={Styles.navTxtB}>Timer</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigate("Settings", { recipient: this.state.recipient })
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
        {blckScreen}
      </View>
    );
  }
}
