import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    AsyncStorage,
    TouchableOpacity,
    TouchableHighlight,
    Icon,
    Image
} from "react-native";
import { StackNavigator } from "react-navigation";
import Styles from "./scss/Styles.scss";
import { Linking } from "react-native";
import FadeView from "react-native-fade-view";
export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipient: this.props.navigation.state.params.recipient,
            inputFormStatus: null,
            active: true,
			displaySignOut: Styles.signOutHidden
        };
    }
    validatePhoneNum = phoneNum => {
        const regex = /^\d{10}$/;
        return regex.test(phoneNum);
    };
    changePhoneNumber = () => {
        if (this.validatePhoneNum(this.state.recipient)) {
            // Stores the new phone number in AsyncStorage
            AsyncStorage.setItem("storeTheNum", this.state.recipient).catch(
                err => {
                    console.log(err);
                }
            );
            this.setState({
                inputFormStatus: null,
                active: false
            });
            this.fadeCheckMark = setTimeout(() => {
                this.setState({ active: true });
            }, 1000);
        } else {
            this.setState({
                inputFormStatus: require("./imgs/checkXG.png")
            });
        }
    };
    render() {
		
	var signOut = (
      <View style={this.state.displaySignOut}>
       
       <View style={Styles.signOutCont}>
        
        <View>
        <Text style={Styles.steps1}>Clear number & sign out?
        {"\n"}
        {"\n"}
        Your number will be cleared and you will be redirected to the sign up page.
        </Text>
        </View>
        
        	<Text>
             {"\n"}
         	</Text>
        
         <View style={Styles.SBtnCont}>
           <TouchableOpacity style={Styles.Sbtn}
                    onPress={() => {
                        AsyncStorage.setItem("storeTheMsg", "").catch(err => {
                            console.log(err);
                        });
                        navigate("Welcome", {
                            recipient: ""
                        });
                    }}
                >
          
          <Text style={Styles.SbtnTxt}>
          Confirm
          </Text>
          </TouchableOpacity>
          
          <TouchableOpacity  onPress={() => this.setState({ displaySignOut: Styles.signOutHidden })} style={Styles.Sbtn}>
          <Text style={Styles.SbtnTxt}>Cancel</Text>
          </TouchableOpacity>
          
          </View> 
         </View>
		</View>
		)
		
		
        const { navigate } = this.props.navigation;
        return (
            <View style={Styles.all}>
                <View style={Styles.tBan}>
                    <Text>{"\n"}</Text>
                    <Text style={Styles.tBanTitle}>Settings</Text>
                    {signOut}
                </View>
                <Text>
                    {"\n"}
                    {"\n"}
                    {"\n"}
                </Text>
                
                <View style={Styles.settingsInpCont}>
                    <Text style={Styles.steps}>Update your phone number</Text>
                    <View style={Styles.smBreak2} />
                    <View style={Styles.setInpBtnCont}>
                        <View style={Styles.setInptBox}>
                            <TextInput
                                style={Styles.setInpt}
                                keyboardType="number-pad"
                                returnKeyType="done"
                                placeholder={this.state.recipient}
                                onChangeText={recipient => {
                                    this.setState({ recipient });
                                    if (this.validatePhoneNum(recipient)) {
                                        this.setState({
                                            inputFormStatus: require("./imgs/checkB.png")
                                        });
                                    } else if (
                                        this.state.inputFormStatus ===
                                            require("./imgs/checkB.png") &&
                                        !this.validatePhoneNum(recipient)
                                    ) {
                                        // Condition only changes to invalid if it was previously true
                                        this.setState({
                                            inputFormStatus: require("./imgs/checkXG.png")
                                        });
                                    }
                                }}
                                onSubmitEditing={this.changePhoneNumber}
                            />
                            <View style={Styles.checkBoxSet}>
                                <Image
                                    source={this.state.inputFormStatus}
                                    style={Styles.check}
                                />
                            </View>
                        </View>
                        <TouchableOpacity
                            style={Styles.btn}
                            onPress={this.changePhoneNumber}
                        >
                            <Image
                                source={require("./imgs/savew.png")}
                                style={{ width: 21, height: 21 }}
                            />
                            <Text style={Styles.btnTTxt}>Save</Text>
                            <FadeView
                                active={this.state.active}
                                style={Styles.checkTxtBodCont}
                            >
                                <Image
                                    source={require("./imgs/checkW.png")}
                                    style={Styles.checkTxtBod}
                                />
                            </FadeView>
                        </TouchableOpacity>
                    </View>
                    <View style={Styles.smBreak2} />
                </View>
                <Text>{"\n"}</Text>
                
                <TouchableOpacity
                    style={Styles.setBtnsCont}
                    onPress={() =>
                        Linking.openURL("mailto:dummydialapp@gmail.com")
                    }
                >
                    <View style={Styles.setBtnL}>
                        <Image
                            style={{ width: 28, height: 21 }}
                            source={require("./imgs/mail.png")}
                        />
                        <Text style={Styles.setBtnsTitle}>Contact Us</Text>
                    </View>
                    <Image
                        source={require("./imgs/frwA.png")}
                        style={Styles.backA}
                    />
                </TouchableOpacity>
                <View style={Styles.smBreak2} />
                <TouchableOpacity
                    style={Styles.setBtnsCont}
                    onPress={() =>
                        navigate("FAQs", { recipient: this.state.recipient })
                    }
                >
                    <View style={Styles.setBtnL}>
                        <Image
                            style={{ width: 28, height: 28 }}
                            source={require("./imgs/qmark.png")}
                        />
                        <Text style={Styles.setBtnsTitle}>FAQs</Text>
                    </View>
                    <Image
                        source={require("./imgs/frwA.png")}
                        style={Styles.backA}
                    />
                </TouchableOpacity>
                
           <TouchableOpacity
             style={Styles.clearSet}
             onPress={() => {
                this.setState({ displaySignOut: Styles.singOutPopUp });
                console.log("clicked faqs");
              }}
            >
            <View>
				<Text style={Styles.blueTxt}>Tap here to clear number & sign out</Text>
			</View>
            </TouchableOpacity>

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
                                style={Styles.instantNav}
                                source={require("./imgs/sphone.png")}
                            />
                            <Text style={Styles.navTxt}>Instant</Text>
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
                                style={Styles.timerNav}
                                source={require("./imgs/stime.png")}
                            />
                            <Text style={Styles.navTxt}>Timer</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            navigate("TextBody", {
                                recipient: this.state.recipient
                            })
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
                            navigate("Settings", {
                                recipient: this.state.recipient
                            })
                        }
                    >
                        <View style={Styles.navBarBtn}>
                            <Image
                                style={Styles.settingsNav}
                                source={require("./imgs/sgearb.png")}
                            />
                            <Text style={Styles.navTxtB}>Settings</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
