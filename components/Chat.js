import React, { Component } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import { StyleSheet, View, Platform, Text, KeyboardAvoidingView  } from 'react-native';
//import firestore
const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends Component {

static navigationOptions = ({ navigation }) => {
  return {
    title: navigation.state.params.name,
  };
};

constructor(){
  super();
  this.state = {
    messages: [],
    uid: 0,
    user: {
      _id: '',
      name: '',
      avatar: ''
    },
  };

  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: "AIzaSyABtEeaMnX10l0BA2lBVZsSvhRPsbT1xs0",
      authDomain: "react-native-chat-app-db384.firebaseapp.com",
      databaseURL: "https://react-native-chat-app-db384.firebaseio.com",
      projectId: "react-native-chat-app-db384",
      storageBucket: "react-native-chat-app-db384.appspot.com",
      messagingSenderId: "150324992541",
      appId: "1:150324992541:web:a80d7d4bf671b149acc4f4",
      measurementId: "G-6XNLK09WJ5"
    });
  } 
  this.referenceMessages = firebase.firestore().collection('messages');
}

onCollectionUpdate = (querySnapshot) => {
  const messages = [];
  querySnapshot.forEach((doc) => {
    var data = doc.data();
    messages.push({
      _id: data._id,
      createdAt: data.createdAt.toDate(),
      text: data.text,
      user: {
        _id: data.user._id,
        name: data.user.name,
        avatar: data.user.avatar,
      },
    });
  });
  this.setState({
    messages,
  });
};

addMessage() {
  this.referenceMessages.add({
    _id: this.state.messages[0]._id,
    text: this.state.messages[0].text,
    createdAt: this.state.messages[0].createdAt,
    user: this.state.messages[0].user,
    uid: this.state.uid
  });
}

componentDidMount() {
  this.authUnsubscribe = firebase.auth().onAuthStateChanged(async user => {
    if (!user) {
      user = await firebase.auth().signInAnonymously();
    }
    this.unsubscribe = this.referenceMessages.onSnapshot(
      this.onCollectionUpdate
    );
  });
  this.setState({
    messages: [
      {
        _id: 1,
        text: "Hello everybody",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any"
        }
      },
      {
        _id: 2,
        text: this.props.navigation.state.params.name + ' has entered the chatroom',
        createdAt: new Date(),
        system: true
      }
    ]
  });
}

    componentWillUnmount() {
      // stop listening to authentication
      this.authUnsubscribe();
    }

onSend(messages = []) {
  this.setState(previousState => ({
    messages: GiftedChat.append(previousState.messages, messages),
  }),
    () => {
      this.addMessage();
    })
};

//speech bubble props
renderBubble(props) {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: 'lightgray',
        }
      }}
      textStyle={{
        left: {
          color: 'black',
        },
        right: {
          color: '#000',
        },
      }}
    />
  )
}

    render() {
  return (
    <View
				style={[styles.container, { backgroundColor: this.props.navigation.state.params.color }]}
			>

        <GiftedChat
        renderBubble={this.renderBubble.bind(this)}
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
      {Platform.OS === 'android' ? <KeyboardAvoidingView /> : null }
</View>
  )
}
 }


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});