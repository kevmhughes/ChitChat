import React, { Component } from 'react';
//Platform - determines the current OS
//KeyboardAvoidingView solves Android issue: keyboard hiding messsage input field 
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'

export default class Chat extends Component { 
  constructor() {
    super();
    this.state = {
      messages: [],
    }
  }

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello Developer',
          createdAt: new Date(),
          user: {
            _id:2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          // system message passing name props from state thanks to the navigate function in Start.js
          text: this.props.navigation.state.params.name + ' has entered the chatroom',
          createdAt: new Date(),
          // converts message into a system message
          system: true,
        }
      ], 
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
        // the message received is appended to state "messages" to be displayed in chat 
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  // method to personalise bubble properties
  renderBubble(props) { return ( <Bubble {...props} 
    wrapperStyle={{
        left: {
          backgroundColor: 'white',
        },
        right: {
          backgroundColor: 'black'
        }
      }} />
    )
  }

  // title to be seen in the header - state set in Start.js
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.name,
    };
  };

  render() {
    return (
      <View
        // background color choice - props passed from Start.js
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

          { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}

      </View>
      )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});