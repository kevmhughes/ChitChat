import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text, TextInput, ImageBackground, Image, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-paper';

export default class Start extends React.Component {
  constructor (props) {  
    super(props);
    this.state= {
      name: '',
      color: '',
    };
    
    } 

  render() {
    return (

        <ImageBackground source={require('../assets/background-image.png')} style={styles.backgroundImage}>
        
        <Text style={styles.appTitle}>ChitChat</Text>
        
        <View style={styles.container}>

          <View style={styles.textInputBox}>

              <Image source={require('../assets/user-icon.png')}  style={styles.imageStyle}/>

              <TextInput
                placeholder='Your Name'
                style={styles.textStyle}
                onChangeText={(name) => this.setState ({name})}
              />

          </View>

              <Text style={styles.textBackgroundColor}>
                Choose Background Color:
              </Text>

              <View style={styles.colorPicker}>
                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel='More options'
                  accessibilityHint='Allows you to choose the background colour of the chatroom.'
                  accessibilityRole='button'
                   // setting of state
                  onPress={() => this.setState({color: '#090C08'})}
                  style={[styles.colorButton, styles.color1]}
                />
                          <TouchableOpacity
                  accessible={true}
                  accessibilityLabel='More options'
                  accessibilityHint='Allows you to choose the background colour of the chatroom.'
                  accessibilityRole='button'
                   // setting of state
                  onPress={() => this.setState({color: '#474056'})}
                  style={[styles.colorButton, styles.color2]}
                />
                          <TouchableOpacity
                  accessible={true}
                  accessibilityLabel='More options'
                  accessibilityHint='Allows you to choose the background colour of the chatroom.'
                  accessibilityRole='button'
                   // setting of state
                  onPress={() => this.setState({color: '#8A95A5'})}
                  style={[styles.colorButton, styles.color3]}
                />
                          <TouchableOpacity
                  accessible={true}
                  accessibilityLabel='More options'
                  accessibilityHint='Allows you to choose the background colour of the chatroom.'
                  accessibilityRole='button'
                   // setting of state
                  onPress={() => this.setState({color: '#B9C6AE'})}
                  style={[styles.colorButton, styles.color4]}
                />
              </View>

          <Button
          color='#757083'
          dark={true} 
          style={{
            width:'88%',
            height: '18%',
            marginBottom: '6%',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 0,
          }}
          mode= 'contained'
          // props sent to Chat through navigate
          onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, color: this.state.color })}>
            <Text style={{color:"white", fontSize: 16, textTransform: "none"}}>Start Chatting</Text>
          </Button>

        </View>

        </ImageBackground>

    )
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
  },
  appTitle: {
    color: 'white',
    fontWeight: '600',
    fontSize: 45,
    marginTop: '22%',
  },
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    width: '88%',
    height: '44%',
    marginBottom: '6%',
    position: 'absolute',
    bottom: 0,
  },
  textInputBox: {
    flexDirection: 'row',
    width: '88%',
    borderWidth: 1,
    borderColor: '#757083',
    marginTop: '6%',
    height: '18%',
    paddingLeft: 10,
  },
  imageStyle: {
    marginTop: 18,
    marginLeft: 5,
    marginRight: 5,
    height: 20,
    width: 20,
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 16,
    fontWeight: '300',
    paddingLeft: 5,
    width: '100%',
    opacity: 50,
  },
  textBackgroundColor: {
    fontSize: 16, 
    alignSelf: 'flex-start',
    marginLeft: '6%',
    fontWeight: '300', 
    color: '#757083', 
    marginTop: '10%',
  },
  colorPicker:{
    marginTop: '12%',
    alignSelf: 'flex-start',
    marginLeft: '6%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  colorButton:{
    height: 40,
    width: 40,
    borderRadius: 20,
    marginTop: -20,
    marginRight: 10,
    marginBottom: 0,
    marginLeft: 5,
  },
    color1: {
      backgroundColor: '#090C08' 
  },
    color2: {
      backgroundColor: '#474056' 
  },
    color3: {
      backgroundColor: '#8A95A5' 
  },
    color4: {
      backgroundColor: '#B9C6AE' 
  },
  })
