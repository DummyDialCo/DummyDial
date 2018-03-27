import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { StackNavigator } from "react-navigation";

export default class CallPage extends React.Component {

	constructor(props){
		super(props);

		this.state = {
      contactName:""
		}
	}

  addToContacts = () => {
    Contacts.addContact(newPerson, (err) => {
      if(err)
        console.log(err);
    });
  }

  render() {

    // TEMPLATE FROM REACT-NATIVE-CONTACTS ON GITHUB
    var newPerson = {
      emailAddresses: [{
        label: "work",
        email: "mrniet@example.com",
      }],
      familyName: "Nietzsche",
      givenName: "Friedrich",
    }

    return (
      <View>
				<TextInput
					placeholder="Enter Contact Name"
					onChangeText={(contactName)=>this.setState({contactName})}
					value={this.state.contactName}
				/>

        <Button onPress={this.addToContacts} title="ADD CONTACT" color="orange" />


      </View>
    );
  }
}
