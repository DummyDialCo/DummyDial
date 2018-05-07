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
      value: 0, // position of the circle on the slider
      total: 0, // total time, in seconds
      timeString: "00:00", // displays before the timer is set
      initialTime: 0, // is set once timer starts, does not change after
      countingDown: 0, // reduces by 1/60th of value each interval
      // btn styling - !clicked turns grey
      callBtnStyles: Styles.btn,
      textBtnStyles: Styles.btn,
      // evaluates which button was clicked
      timerIsRunning: false,
      clickedCallBtn: false,
      clickedTextBtn: false,
      displayStop: Styles.stopBtnHidden,
      // events after the timer starts
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
      countingDown: this.state.initialTime,
      displayStop: Styles.stopBtnShowing,
      timerIsRunning: true
    });

    this.beginCount = setInterval(() => {

      if (this.state.total > 0) {
        this.setState({
          total: this.state.total - 1,
          countingDown: this.state.countingDown - (1/60)
        });

        this.updatingTimeString();

        if (this.state.total === 0 || this.state.countingDown <= 0) {
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
    this.setState({
      value: 0,
      total: 0,
      timeString: "00:00",
      initialTime: 0,
      countingDown: 0,
      callBtnStyles: Styles.btn,
      textBtnStyles: Styles.btn,
      timerIsRunning: false,
      clickedCallBtn: false,
      clickedTextBtn: false,
      displayStop: Styles.stopBtnHidden,
      navBarHiding: Styles.navBar,
      displayBlack: Styles.blckBGhidden,
      blckActive: null
    });
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

		<TouchableOpacity onPress={this.displayedBlack} style={Styles.timeTitles}>

        <Text>
          {"\n"}
          {"\n"}
          {"\n"}
        </Text>

        <Text style={Styles.steps}>
          Do not close app while timer is running
        </Text>

        <View style={Styles.smBreak2} />

          <Text style={Styles.blueTxt}> To hide screen tap here  </Text>
        </TouchableOpacity>

        <View style={Styles.smBreak} />

		<View style={Styles.timeCont}>

		<Text style={Styles.timeDis}>{this.state.timeString}</Text>

		 <Text>
          {"\n"}
          {"\n"}
        </Text>

		<TouchableOpacity onPress={this.resetTimer} style={this.state.displayStop}>
          <Image
            source={require("./imgs/stopC.png")}
            style={Styles.stopBtn}
          />
        </TouchableOpacity>

		  </View>
		  <View>

		<View style={Styles.timeLength}>
		  <Text style={Styles.steps}>0min</Text>
		  <Text style={Styles.steps}>20min</Text>
		 </View>

        <Slider
          trackStyle={{ height: 15, backgroundColor: "#fff", borderRadius: 50, shadowOpacity: 0.9,
          shadowRadius: 5, shadowColor: '#CECECE',
          shadowOffset: { height: 0, width: 0 } }}
          thumbStyle={{ width: 35, height: 35, borderRadius: 20}}
          thumbTintColor={"#5cacee"}
          minimumTrackTintColor={"#5cacee"}
          style={{
            width: 300,
            direction: "ltr"
          }}
          value={this.state.countingDown}
          step={0.5}
          minimumValue={0}
          maximumValue={20}
          onValueChange={(value) => {
            this.setState({
              countingDown: value,
              value: value,
              total: value * 60
            });

            this.updatingTimeString();
          }}
          onSlidingComplete={(value)=>{
            this.setState({
              initialTime: value
            });
          }}
        />

		</View>

        <View style={Styles.smBreak}/>

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
            <Text style={Styles.btnTTxt}>Set Call</Text>
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
            <Text style={Styles.btnTTxt}>Set Text</Text>
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
                style={Styles.instantNav}
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
                style={Styles.timerNav}
                source={require("./imgs/stimeb.png")}
              />
              <Text style={Styles.navTxtB}>Timer</Text>
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
        {blckScreen}
      </View>
    );
  }
}
