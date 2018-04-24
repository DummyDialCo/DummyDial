import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Easing,
  AsyncStorage
} from "react-native";
import { StackNavigator } from "react-navigation";
import Styles from "./scss/Styles.scss";

import CircularProgressDisplay from "react-native-progress-circular";

export default class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipient: this.props.navigation.state.params.recipient,
      myMsg: "",
      // time props
      minsRemaining: 0,
      secsRemaining: 0,
      totalSeconds: 0,
      // progress bar
      progress: 0,
      progressBarColor: "transparent",
      // btn styling - !clicked turns grey
      callBtnStyles: Styles.btn,
      textBtnStyles: Styles.btn,
      // evaluates which button was clicked
      clickedCallBtn: false,
      clickedTextBtn: false,
      // events after the timer starts
      timerIsRunning: false,
      navBarHiding: Styles.navBar,
      pauseBtn: "",
      stopBtn: "",
      pausePlayButton: "",
      displayingInputs:true,
      isPaused: false,
      mode: null,
      timeString: "..."
    };
  }

  getInitialState() {
    return { progress: 0 };
  }

  componentDidMount = () => {
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
  };

  startedTimer = () => {
    this.setState({
      navBarHiding: Styles.navBarHidden,
      exitTimerMessage: "Click here to exit timer",
      pauseBtn: "PAUSE",
      stopBtn: "STOP",
    });

    var totalSeconds = parseFloat(this.state.minsRemaining * 60) + parseFloat(this.state.secsRemaining);

    var beginCount = setInterval(() => {
      // checks if the timer is paused, or if there is already
      // an instance running if a timer is already running,
      // clicking between call/text will not create a new timer
      if (!this.state.isPaused) {

        var minZero = "";
        var secZero = "";
        var minutesDigit = Math.floor(totalSeconds / 60);
        var secondsDigit = totalSeconds % 60;
        if (minutesDigit <= 9) minZero = "0";
        if (secondsDigit <= 9) secZero = "0";

        this.setState({
          timeString: minZero + minutesDigit + ":" + secZero + secondsDigit,
          // progressBarColor: "#5CACEE"
        });

        if (this.state.totalSeconds > -1) {
          totalSeconds--;
          var progress = this.state.progress + 1;
          this.setState({
            totalSeconds: totalSeconds,
            progress: progress
          });
          console.log("Time remaining:", this.state.totalSeconds);

          if (this.state.totalSeconds === 0) {
            // clearInterval(beginCount);
            // this.sendCallorText();
            this.setState({
              displayingInputs: true,
              timerIsRunning: false
            });
						// this.resetTimer();
          }
        }
      }
    }, 1000);

    // this will run at the end of the interval
    // if(this.state.clickedCallBtn)
    //   fetch("https://dummydial93.herokuapp.com/"+this.state.recipient);
    // else if(this.state.clickedTextBtn)
    //   fetch("https://quiet-fortress-33478.herokuapp.com/"+this.state.recipient+"/"+this.state.myMsg);
  };

  pauseTimer = () => {
    if (!this.state.mode) {
      this.setState({
        isPaused: true,
        mode: true,
        pauseBtn: "PLAY"
      });
      return;
    } else if (this.state.mode) {
      this.setState({
        isPaused: false,
        mode: false,
        pauseBtn: "PAUSE"
      });
      return;
    }
  };

  resetTimer = () => {
    console.log("Clicked reset");
    // reset function
  };

  render() {
    const { navigate } = this.props.navigation;

    var innerDisplay;

    if (!this.state.displayingInputs) {
      innerDisplay = (
        <View style={Styles.circleInnerDisplay}>
          <Text style={Styles.timerInp}>{this.state.timeString}</Text>

          <TouchableOpacity onPress={this.pauseTimer}>
            <Text>{this.state.pauseBtn}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.resetTimer}>
            <Text>{this.state.stopBtn}</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      innerDisplay = (
        <View style={Styles.circleInnerDisplay}>
          <View style={Styles.timerInputContainer}>
            <TextInput
              style={Styles.timerInp}
              placeholder="00"
              returnKeyType="done"
              keyboardType="number-pad"
              onChangeText={minsRemaining => this.setState({ minsRemaining })}
            />
            <Text style={Styles.timerInp}>:</Text>
            <TextInput
              style={Styles.timerInp}
              placeholder="00"
              returnKeyType="done"
              keyboardType="number-pad"
              onChangeText={secsRemaining => this.setState({ secsRemaining })}
            />
          </View>
        </View>
      );
    }

    return (
      <View style={Styles.all}>
        <View style={Styles.tBan}>
          <Text>{"\n"}</Text>
          <Text style={Styles.tBanTitle}>Timer</Text>
        </View>

        <Text>
          {"\n"}
          {"\n"}
        </Text>

        <Text style={Styles.steps}>
          Do not close app while timer is running
          {"\n"}
        </Text>

        <Text>
          {"\n"}
          {"\n"}
        </Text>

        <CircularProgressDisplay.Hollow
          size={200}
          progressBarWidth={10}
          backgroundColor={"#ffffff"}
          progressBarColor={this.state.progressBarColor}
          easing="linear"
          innerComponent={innerDisplay}
          rotate={this.state.progress / this.state.totalSeconds * 360}
        />

        <Text>
          {"\n"}
          {"\n"}
        </Text>

        <View style={Styles.BtnCont}>
          <TouchableOpacity
            style={this.state.callBtnStyles}
            onPress={() => {
              if(!this.state.timerIsRunning){
                this.startedTimer();
              }
              this.setState({
                callBtnStyles: Styles.btn,
                textBtnStyles: Styles.greyBtn,
                clickedCallBtn: true,
                clickedTextBtn: false,
                displayingInputs: false,
                timerIsRunning: true
              });
            }}
          >
            <Image
              source={require("./imgs/phonew.png")}
              style={{ width: 19, height: 21 }}
            />
            <Text style={Styles.btnTTxt}>Call</Text>
          </TouchableOpacity>

          <View style={Styles.smBreak3} />

          <TouchableOpacity
            style={this.state.textBtnStyles}
            onPress={() => {
              if(!this.state.timerIsRunning){
                this.startedTimer();
              }
              this.setState({
                callBtnStyles: Styles.greyBtn,
                textBtnStyles: Styles.btn,
                clickedCallBtn: false,
                clickedTextBtn: true,
                displayingInputs: false,
                timerIsRunning: true
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

        <Text>
          {"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}
        </Text>

        <TouchableOpacity onPress={this.resetTimer}>
          <Text>{this.state.exitTimerMessage}</Text>
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
      </View>
    );
  }
}
