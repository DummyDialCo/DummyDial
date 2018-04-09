import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, TouchableOpacity, Image } from 'react-native';
import { StackNavigator } from "react-navigation";

import Styles from "./scss/Styles.scss";

export default class Menu extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      recipient: this.props.recipient
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={Styles.all}>
        <View style={Styles.tBan}>
          <Text> </Text>
          <Text style={Styles.tBanTitle}>Main Menu</Text>
        </View>

        <Text>{"\n"}{"\n"}{"\n"}</Text>

        <Text style={Styles.subTitle}>DummyDial</Text>
        <Text></Text>

        <Text style={Styles.usrPhnNum}>{this.props.recipient}</Text>

        <Text>{"\n"}{"\n"}</Text>

        <TouchableOpacity style={Styles.mBar} onPress={()=>navigate("CallPage", {recipient: this.state.recipient})}>
          <View style={Styles.mBarL}>
            <Image source={require("./imgs/phoneIconBM.png")}/>
            <Text style={Styles.mTitle}>Call Page</Text>
          </View>
          <Text style={Styles.arw}>></Text>
        </TouchableOpacity>

        <Text></Text>

        <TouchableOpacity style={Styles.mBar} onPress={()=>navigate("TextPage", {recipient: this.state.recipient})}>
          <View style={Styles.mBarL}>
            <Image source={require("./imgs/textIconB.png")}/>
            <Text style={Styles.mTitle}>Text Body & Timer</Text>
          </View>
          <Text style={Styles.arw}>></Text>
        </TouchableOpacity>

        <Text></Text>

        <TouchableOpacity style={Styles.mBar} onPress={()=>navigate("Settings", {recipient: this.state.recipient})}>
          <View style={Styles.mBarL}>
            <Image source={require("./imgs/settingsIcon.png")}/>
            <Text style={Styles.mTitle}>Settings</Text>
          </View>
          <Text style={Styles.arw}>></Text>
        </TouchableOpacity>

        <Text>{"\n"}{"\n"}{"\n"}</Text>

        <TouchableOpacity style={Styles.btnM}>
          <View style={Styles.btnMCont}>
            <Image source={require("./imgs/phoneIconW.png")}/>
            <Text style={Styles.btnMTxt}>Call Now</Text>
          </View>
        </TouchableOpacity>

        <Text></Text>

        <TouchableOpacity style={Styles.btnM}>
          <View style={Styles.btnMCont}>
            <Image source={require("./imgs/textIconW.png")}/>
            <Text style={Styles.btnMTxt}>Text Now</Text>
          </View>
        </TouchableOpacity>

        <View style={Styles.navBar}>
          <TouchableOpacity onPress={()=>navigate("Menu", {recipient: this.state.recipient})}>
            <Text>Instant</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigate("TextPage", {recipient: this.state.recipient})}>
            <Text>Text Body</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigate("Timer", {recipient: this.state.recipient})}>
            <Text>Timer</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigate("Settings", {recipient: this.state.recipient})}>
            <Text>Settings</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}
