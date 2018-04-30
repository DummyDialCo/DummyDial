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
  AsyncStorage,
  Keyboard
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
      pauseBtn: null, // source of the image - changes once timer starts
      stopBtn: null, // source of the image - changes once timer starts
      displayingInputs: true,
      isPaused: true,
      mode: null, // controls whether pause/play is active
      timeString: "...", // displayed briefly after timer is initialized
      displayBlack: Styles.blckBGhidden, // styling changes to display: flex; after
      blckActive: null // function changes this to a boolean
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
	  
    var totalSeconds =
      parseFloat(this.state.minsRemaining * 60) +
      parseFloat(this.state.secsRemaining);
    this.setState({
      initialTotalSeconds: totalSeconds,
      navBarHiding: Styles.navBarHidden,
      exitTimerMessage: "Tap here to exit timer",
      pauseBtn: require("./imgs/pauseicon.png"),
      stopBtn: require("./imgs/stopicon.png"),
      isPaused: false,
      totalSeconds: totalSeconds
    });

    this.beginCount = setInterval(() => {
      // checks if the timer is paused, or if there is already
      // an instance running if a timer is already running,
      // clicking between call/text will not create a new timer
      if (!this.state.isPaused) {
        var minZero = "";
        var secZero = "";
        var minutesDigit = Math.floor(this.state.totalSeconds / 60);
        var secondsDigit = this.state.totalSeconds % 60;
        if (minutesDigit <= 9) minZero = "0";
        if (secondsDigit <= 9) secZero = "0";

        this.setState({
          timeString: minZero + minutesDigit + ":" + secZero + secondsDigit,
          progressBarColor: "#5CACEE",
          newMinsRemaining: minZero + minutesDigit,
          newSecsRemaining: secZero + secondsDigit,
          minsRemaining:
            minZero + Math.floor(this.state.totalSeconds / 60) + "", // + "" converts it to a string
          secsRemaining: secZero + this.state.totalSeconds % 60 + ""
        });

        if (this.state.totalSeconds > -1) {
          this.setState({
            totalSeconds: this.state.totalSeconds - 1,
            progress: this.state.progress + 1
          });
          console.log("Time remaining:", this.state.totalSeconds);

          if (this.state.totalSeconds === -1) {

            if (this.state.clickedCallBtn) {
              fetch("https://dummydial93.herokuapp.com/"+this.state.recipient);
            } else if (this.state.clickedTextBtn) {
              fetch("https://quiet-fortress-33478.herokuapp.com/"+this.state.recipient+"/"+this.state.myMsg);
            }

            this.resetTimer();
          }
        }
      }
    }, 1000);
  };

  pauseTimer = () => {
    if (!this.state.mode) {
      // PAUSED
      var minZero = "";
      if(Math.floor(this.state.totalSeconds / 60) < 10) minZero = "0";
      var secZero = "";
      if((this.state.totalSeconds % 60) < 10) secZero = "0";
      this.setState({
        isPaused: true,
        mode: true,
        pauseBtn: require("./imgs/playicon.png"),
        displayingInputs: true,
        minsRemaining: minZero + Math.floor(this.state.totalSeconds / 60) + "",
        secsRemaining: secZero + this.state.totalSeconds % 60 + ""
      });
      return;
    } else if (this.state.mode) {
      // UNPAUSED
      var totalSeconds = parseFloat(this.state.minsRemaining * 60) + parseFloat(this.state.secsRemaining);
      this.setState({
        progress: -1,
        isPaused: false,
        mode: false,
        pauseBtn: require("./imgs/pauseicon.png"),
        displayingInputs: false,
        totalSeconds: totalSeconds,
        initialTotalSeconds: totalSeconds
      });
      return;
    }
  };

  resetTimer = () => {
    clearInterval(this.beginCount);
    this.setState({
      minsRemaining: "00",
      secsRemaining: "00",
      totalSeconds: 0,
      initialTotalSeconds: 0,
      newMinsRemaining: "00",
      newSecsRemaining: "00",
      progress: -1,
      progressBarColor: "transparent",
      callBtnStyles: Styles.btn,
      textBtnStyles: Styles.btn,
      clickedCallBtn: false,
      clickedTextBtn: false,
      timerIsRunning: false,
      navBarHiding: Styles.navBar,
      pauseBtn: null,
      stopBtn: null,
      displayingInputs: true,
      isPaused: true,
      mode: null,
      timeString: "...",
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

    var innerDisplay = (
      <View style={Styles.circleInnerDisplay}>
		
		<Text>
        {"\n"}
		{"\n"}
		{"\n"}
		{"\n"}
       </Text>
		
        <View style={Styles.timerInputContainer}>
          <TextInput
            style={Styles.timerInpMins}
            placeholder={this.state.newMinsRemaining}
            returnKeyType="done"
            keyboardType="number-pad"
            editable={this.state.isPaused}
            onChangeText={minsRemaining => {
              if (this.state.isPaused) {
                minsRemaining = parseInt(minsRemaining);
                if (minsRemaining < 10) {
                  minsRemaining = "0" + minsRemaining;
                }
                minsRemaining = "" + minsRemaining;
                minsRemaining =
                  minsRemaining[minsRemaining.length - 2] +
                  minsRemaining[minsRemaining.length - 1];
                this.setState({ minsRemaining });
              }
            }}
            value={this.state.minsRemaining}
            // NOTE IF MINSREMAINING DECREMENTED DOWN, IT COULD BE USED FOR SETTING THE TIMER WHEN PAUSED
          />
          <Text style={Styles.timerInp}>:</Text>
          <TextInput
            style={Styles.timerInp}
            placeholder={this.state.newSecsRemaining}
            returnKeyType="done"
            keyboardType="number-pad"
            editable={this.state.isPaused}
            onChangeText={secsRemaining => {
              if (this.state.isPaused) {
                secsRemaining = parseInt(secsRemaining);
                if (secsRemaining < 10) {
                  secsRemaining = "0" + secsRemaining;
                }
                secsRemaining = "" + secsRemaining;
                secsRemaining =
                  secsRemaining[secsRemaining.length - 2] +
                  secsRemaining[secsRemaining.length - 1];
                this.setState({ secsRemaining });
              }
            }}
            value={this.state.secsRemaining}
          />
        </View>
			
		<View style={Styles.smBreak2}/>
		  
        <View style={Styles.pausePlayBtnCont}>
          <TouchableOpacity onPress={this.pauseTimer}>
            <Image source={this.state.pauseBtn} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
			
		<View style={Styles.smBreak4}/>

          <TouchableOpacity onPress={this.resetTimer}>
            <Image source={this.state.stopBtn} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
        </View>
			
      </View>
    );

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
		
        <CircularProgressDisplay.Hollow
          size={250}
          progressBarWidth={9}
          backgroundColor={"#ffffff"}
          progressBarColor={this.state.progressBarColor}
          easing="linear"
          innerComponent={innerDisplay}
          rotate={this.state.progress / this.state.initialTotalSeconds * 360}
        />

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
                clickedTextBtn: false,
                displayingInputs: false,
                timerIsRunning: true
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
