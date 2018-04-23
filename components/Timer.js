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
    }
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


  render() {
    const { navigate } = this.props.navigation;

		var innerDisplay = (
			<Text>Timer</Text>
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

          <TouchableOpacity>
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
