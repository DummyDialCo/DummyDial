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
      minsRemaining: 0,
      secsRemaining: 0,
      totalTimeRemaining: 0, // (in seconds)
      progress: -1, // number of seconds the timer has been running - set to -1 so that the circle completes at 00:00 and not 00:01
      progressBarColor: "transparent",
      timeString: "00:00", // default display inside the circle
      displayingInputs: true,
      clickedCall: false,
      clickedText: false,
      pausePlayButton: "",
      mode: false,
      clickedReset: false,
      isPaused: false,
      prevInterval: null,
			navStyling: Styles.navBar,
			exitTimerMessage:"",
			callButton:Styles.btn,
			textButton:Styles.btn
    }
  }


  getInitialState() {
    return { progress: -1 };
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

  startTimer = () => {
    this.setState({
      displayingInputs: false,
      pausePlayButton: "PAUSE",
      isPaused: false,
      totalTimeRemaining: 0,
			navStyling: Styles.navBarHidden,
			exitTimerMessage: "Click here to exit timer"
    });


    var beginCount = setInterval(() => {
      if (!this.state.isPaused) {
				var totalTimeRemaining = parseFloat(this.state.minsRemaining * 60) + parseFloat(this.state.secsRemaining);

        var minZero = "";
        var secZero = "";
        var secondsDigit = totalTimeRemaining % 60;
        var minutesDigit = Math.floor(totalTimeRemaining / 60);
        if (secondsDigit <= 9) secZero = "0";
        if (minutesDigit <= 9) minZero = "0";

        this.setState({
          timeString: minZero + minutesDigit + ":" + secZero + secondsDigit,
          progressBarColor: "#5CACEE"
        });

        if (this.state.totalTimeRemaining > -1) {
          totalTimeRemaining--;
          var progress = this.state.progress + 1;
          this.setState({
            totalTimeRemaining: totalTimeRemaining,
            progress: progress
          });
          console.log("totalTimeRemaining:", this.state.totalTimeRemaining);

          if (this.state.totalTimeRemaining === -1) {
            clearInterval(beginCount);
            this.sendCallorText();
            this.setState({
              displayingInputs: true
            });
						this.resetTimer();
          }
        }
      }
    }, 1000);

    this.setState({
      // prevInterval: beginCount
    });

    if (this.state.clickedReset) {
      this.setState({
        // clickedReset: false,
				prevInterval: beginCount
      });
      return;
    }
  };

  sendCallorText = () => {
    if (this.state.clickedCall) {
      fetch("https://dummydial93.herokuapp.com/" + this.state.recipient);
      this.setState({
        clickedCall: false
      });
    } else if (this.state.clickedText) {
      fetch(
        "https://quiet-fortress-33478.herokuapp.com/" +
          this.state.recipient +
          "/" +
          this.state.myMsg
      );
      this.setState({
        clickedText: false
      });
    }
  };


	resetTimer = () => {
		this.setState({
			recipient: this.props.navigation.state.params.recipient,
      myMsg: "",
      minsRemaining: 0,
      secsRemaining: 0,
      totalTimeRemaining: 0,
      progress: -1,
      progressBarColor: "transparent",
      timeString: "00:00",
      displayingInputs: true,
      clickedCall: false,
      clickedText: false,
      pausePlayButton: "",
      mode: false,
      isPaused: false,
      prevInterval: null,
			navStyling: Styles.navBar,
			exitTimerMessage:"",
			callButton:Styles.btn,
			textButton:Styles.btn,
			clickedReset: true
		});
		// console.log(this.state);
	};


  render() {
    const { navigate } = this.props.navigation;

    var innerDisplay;

    if (this.state.displayingInputs) {
      innerDisplay = (
        <View
          style={{
            width: 200,
            height: 200,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f6f6f6"
          }}
        >
          <View style={Styles.timerInputContainer}>
            <TextInput
              style={Styles.timerInpMins}
              placeholder="00"
              returnKeyType="done"
              keyboardType="number-pad"
              onChangeText={minsRemaining => {
                this.setState({ minsRemaining });
              }}
            />
            <Text style={Styles.timerInp}>:</Text>
            <TextInput
              style={Styles.timerInp}
              placeholder="00"
              returnKeyType="done"
              keyboardType="number-pad"
              onChangeText={secsRemaining => {
                this.setState({ secsRemaining });
              }}
            />
          </View>
        </View>
      );
    } else {
      innerDisplay = (
        <View
          style={{
            width: 200,
            height: 200,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f6f6f6"
          }}
        >
          <Text style={Styles.timerInp}>{this.state.timeString}</Text>
					<TouchableOpacity
	          onPress={() => {
	            if (!this.state.mode) {
	              this.setState({
	                isPaused: true,
	                mode: true,
	                pausePlayButton: "PLAY"
	              });
	              return;
	            } else if (this.state.mode) {
	              this.setState({
	                isPaused: false,
	                mode: false,
	                pausePlayButton: "PAUSE"
	              });
	              return;
	            }
	          }}
	        >
	          <Text>{this.state.pausePlayButton}</Text>
	        </TouchableOpacity>
					<TouchableOpacity onPress={this.resetTimer}>
	          <Text>RESET</Text>
	        </TouchableOpacity>
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
          rotate={this.state.progress / this.state.totalTimeRemaining * 360}
        />

        <Text>
          {"\n"}
          {"\n"}
        </Text>

        <View style={Styles.BtnCont}>
          <TouchableOpacity
            style={this.state.callButton}
            onPress={() => {
              this.setState({
								callButton: Styles.btn,
                textButton: Styles.greyBtn
              });
							if(this.state.totalTimeRemaining <= 0){
								this.startTimer();
							} else if (this.state.prevInterval != null){
								clearInterval(this.state.prevInterval);
							}

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
            style={this.state.textButton}
            onPress={() => {
              this.setState({
								callButton: Styles.greyBtn,
								textButton: Styles.btn
              });
							if(this.state.totalTimeRemaining <= 0){
								this.startTimer();
							} else if (this.state.prevInterval != null){
								clearInterval(this.state.prevInterval);
							}

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
          {"\n"}
          {"\n"}
        </Text>

				<Text>{"\n"}</Text>


				<TouchableOpacity onPress={this.resetTimer}>
					<Text>{this.state.exitTimerMessage}</Text>
				</TouchableOpacity>






        <View style={this.state.navStyling}>
          <TouchableOpacity onPress={() => navigate("Home", { recipient: this.state.recipient })}>
            <View style={Styles.navBarBtn}>
              <Image
                style={{ width: 28, height: 30 }}
                source={require("./imgs/sphone.png")}
              />
              <Text style={Styles.navTxt}>Instant</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate("TextBody", { recipient: this.state.recipient })}>
            <View style={Styles.navBarBtn}>
              <Image
                style={{ width: 37, height: 30 }}
                source={require("./imgs/stext.png")}
              />
              <Text style={Styles.navTxt}>Text Body</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate("Timer", { recipient: this.state.recipient })}>
            <View style={Styles.navBarBtn}>
              <Image
                style={{ width: 30, height: 30 }}
                source={require("./imgs/stimeb.png")}
              />
              <Text style={Styles.navTxtB}>Timer</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate("Settings", { recipient: this.state.recipient })}>
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
