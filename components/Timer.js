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
      minsRemaining: "00",
      secsRemaining: "00",
      totalSeconds: 0,
      initialTotalSeconds: 0,
      newMinsRemaining: "00", // becomes the input placeholders when paused
      newSecsRemaining: "00", // becomes the input placeholders when paused
      // progress bar
      progress: -1,
      progressBarColor: "transparent", // turns blue when timer starts
      // btn styling - !clicked turns grey
      callBtnStyles: Styles.btn,
      textBtnStyles: Styles.btn,
      // evaluates which button was clicked
      clickedCallBtn: false,
      clickedTextBtn: false,
      // events after the timer starts
      timerIsRunning: false,
      navBarHiding: Styles.navBar, // style changes to hidden when timer is running
      pauseBtn: "", // button text = change to icon later
      stopBtn: "", // button text - change to icon later
      displayingInputs:true,
      isPaused: false,
      mode: null, // controls whether pause/play is active
      timeString: "...", // displayed briefly after timer is initialized
      displayBlack: Styles.blckBGhidden,
      blckActive: null
    };
  }

  getInitialState() {
    return { progress: -1 };
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

  startedTimer = () => {
    var totalSeconds = parseFloat(this.state.minsRemaining * 60) + parseFloat(this.state.secsRemaining);
    this.setState({
      initialTotalSeconds: totalSeconds,
      navBarHiding: Styles.navBarHidden,
      exitTimerMessage: "Click here to exit timer",
      pauseBtn: "PAUSE",
      stopBtn: "STOP",
    });
    console.log(this.state.initialTotalSeconds);

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
          progressBarColor: "#5CACEE",
          newMinsRemaining: minZero + minutesDigit,
          newSecsRemaining: secZero + secondsDigit
        });

        if (this.state.totalSeconds > -1) {
          totalSeconds--;
          this.setState({
            totalSeconds: totalSeconds,
            progress: this.state.progress + 1
          });
          console.log("Time remaining:", this.state.totalSeconds);

          if (this.state.totalSeconds === -1) {
            clearInterval(beginCount);

            // if(this.state.clickedCallBtn)
            //   fetch("https://dummydial93.herokuapp.com/"+this.state.recipient);
            // else if(this.state.clickedTextBtn)
            //   fetch("https://quiet-fortress-33478.herokuapp.com/"+this.state.recipient+"/"+this.state.myMsg);

            this.setState({
              displayingInputs: true,
              timerIsRunning: false,
            });
						// this.resetTimer();
          }
        }
      }
    }, 1000);
  };

  pauseTimer = () => {
    if (!this.state.mode) {
      // PAUSED
      this.setState({
        isPaused: true,
        mode: true,
        pauseBtn: "PLAY",
        displayingInputs: true
      });
      return;
    } else if (this.state.mode) {
      // UNPAUSED
      this.setState({
        isPaused: false,
        mode: false,
        pauseBtn: "PAUSE",
        displayingInputs: false
      });
      return;
    }
  };

  resetTimer = () => {
    console.log("Clicked reset");
    // reset function
  };

    
    displayedBlack = () => {
       if(!this.state.blckActive){
           this.setState({
               displayBlack: Styles.blckBG,
               blckActive: true
           })
       } else {
           this.setState({
               displayBlack: Styles.blckBGhidden,
               blckActive: false
           })
       }
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
              style={Styles.timerInpMins}
              placeholder={this.state.newMinsRemaining}
              returnKeyType="done"
              keyboardType="number-pad"
              onChangeText={minsRemaining => this.setState({ minsRemaining })}

              // NOTE IF MINSREMAINING DECREMENTED DOWN, IT COULD BE USED FOR SETTING THE TIMER WHEN PAUSED

            />
            <Text style={Styles.timerInp}>:</Text>
            <TextInput
              style={Styles.timerInp}
              placeholder={this.state.newSecsRemaining}
              returnKeyType="done"
              keyboardType="number-pad"
              onChangeText={secsRemaining => this.setState({ secsRemaining })}
            />
          </View>
          <TouchableOpacity onPress={this.pauseTimer}>
            <Text>{this.state.pauseBtn}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.resetTimer}>
            <Text>{this.state.stopBtn}</Text>
          </TouchableOpacity>
        </View>
      );
    }

var blckScreen = (
    <TouchableOpacity onPress={this.displayedBlack} style={this.state.displayBlack}>
    </TouchableOpacity>

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
        </Text>

        <Text style={Styles.steps}>
          Do Not Close App While Timer is Running
          {"\n"}
        </Text>

        <TouchableOpacity onPress={this.displayedBlack}> 
            <Text style={Styles.blueTxt}> 
            Tap Here for Black Screen  
            </Text>
        </TouchableOpacity>
        
        <Text>     
          {"\n"}
        </Text>

        <CircularProgressDisplay.Hollow
          size={200}
          progressBarWidth={10}
          backgroundColor={"#ffffff"}
          progressBarColor={this.state.progressBarColor}
          easing="linear"
          innerComponent={innerDisplay}
          rotate={this.state.progress / this.state.initialTotalSeconds * 360}
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
                {blckScreen}
      </View>
    );
  }
}
