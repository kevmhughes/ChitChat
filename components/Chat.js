import React, { Component } from 'react';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat'
import { StyleSheet, View, Platform, KeyboardAvoidingView,LogBox } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

//import firestore
const firebase = require('firebase');
require('firebase/firestore');

// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']); 
//Ignore all log notifications
LogBox.ignoreAllLogs();

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
    isConnected: false,
    image: null,
    location: null,
    user: {
      _id: '',
      name: '',
      avatar: '',
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
  // loop through documents
  querySnapshot.forEach((doc) => {
    // get data snapshot
    const data = doc.data();
    messages.push({
      _id: data._id,
      createdAt: data.createdAt.toDate(),
      text: data.text.toString(),
      image: data.image || '',
      location: data.location,
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
    text: this.state.messages[0].text || '',
    createdAt: this.state.messages[0].createdAt,
    user: this.state.messages[0].user,
    image: this.state.messages[0].image || '',
    location: this.state.messages[0].location || null,
    uid: this.state.uid,
    sent: true,
  });
}

async getMessages() {
  let messages = '';
  try {
    messages = await AsyncStorage.getItem('messages') || [];
    this.setState({
      messages: JSON.parse(messages)
    });
  } catch (error) {
    console.log(error.message);
  }
};

async saveMessages() {
  try {
    await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
  } catch (error) {
    console.log(error.message);
  }
}

async deleteMessages() {
  try {
    await AsyncStorage.removeItem('messages');
    this.setState({
      messages: []
    })
  } catch (error) {
    console.log(error.message);
  }
}

componentDidMount() {
  //checks for connection
  NetInfo.fetch().then(connection => {
    //if connected:
    if (connection.isConnected) {
      this.setState({
        isConnected: true,
      })
      this.authUnsubscribe = firebase.auth().onAuthStateChanged(async user => {
        if (!user) {
          try {
              user = await firebase.auth().signInAnonymously();
            } catch (error) {
                console.log(error.message)
            }
      }
        this.unsubscribe = this.referenceMessages.orderBy("createdAt", "desc").onSnapshot(this.onCollectionUpdate);
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
              avatar: 'https://placeimg.com/140/140/any',
            },
            location: {
              latitude: 48.864601,
              longitude: 2.398704,
            },
          },
          {
            _id: 2,
            text: `${this.props.navigation.state.params.name} has entered the chatroom`,
            createdAt: new Date(),
            system: true
          }
        ]
      });
      //if not connected:
    } else {
      this.setState({
        isConnected: false
      });
      this.getMessages();
    }
  });
}

    componentWillUnmount() {
      // stop listening to authentication
      this.authUnsubscribe();
    }

    onSend(messages = []) {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }), () => {
        this.addMessage();
        this.saveMessages();
      });
    }

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

renderInputToolbar(props) {
  if (this.state.isConnected == false) {
  } else {
    return(
      <InputToolbar
      {...props}
      />
    );
  }
}

renderCustomActions = (props) => {
  return <CustomActions {...props} />;
};

renderCustomView (props) {
  const { currentMessage} = props;
  if (currentMessage.location) {
    return (
      <View>
        <MapView
          style={styles.map}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
    );
  }
  return null;
}

    render() {
  return (
    <View
				style={[styles.container, { backgroundColor: this.props.navigation.state.params.color }]}
			>
        {this.state.image && (
          <Image
            source={{ uri: this.state.image.uri }}
            style={{ width: 200, height: 200 }}
          />
        )}

        <GiftedChat
        renderCustomView={this.renderCustomView}
        renderInputToolbar={this.renderInputToolbar.bind(this)}
        renderActions={this.renderCustomActions}
        renderBubble={this.renderBubble.bind(this)}
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        image={this.state.image}
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
  map: {
    width: 250,
    height: 200,
    borderRadius: 13,
    margin: 3
  },
});

