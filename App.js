import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { StackNavigator } from 'react-navigation';

import Styles from "./components/scss/Styles.scss";

import Welcome from "./components/Welcome";
import Home from "./components/Home";
import Menu from "./components/Menu";
import CallPage from "./components/CallPage";
import TextPage from "./components/TextPage";
import Settings from "./components/Settings";
import Faqs from "./components/Faqs";
import AddContact from "./components/AddContact";

/* Only Stack Navigator controls in this file */
const DummyDial = StackNavigator({
  			Home: { screen: Home },
  			Welcome: { screen: Welcome },
  			Menu: { screen: Menu },
  			CallPage: { screen: CallPage },
  			TextPage: { screen: TextPage },
        	Settings: { screen: Settings },
          FAQs: { screen: FAQs },
  			AddContact: { screen: AddContact }
			}, {
  				initialRouteName: "Home",
  				headerMode: "none",
				transitionConfig: () => ({
    		  		transitionSpec: {
						duration: 0
    		  			},
    				}),
				});

export default class App extends React.Component {
  render() {
    return (
		  <DummyDial />
    );
  }
}
