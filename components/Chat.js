import React, { Component } from 'react';
import { StyleSheet, View, Text} from 'react-native';


export default class Chat extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.name,
    };
  };

  render() {

    let color = this.props.route.params.color;
    let name = this.props.route.params.name;  
    // OR ...
    // let { color } = this.props.route.params;

    this.props.navigation.setOptions({ title: name });

    return (
      <View 
      style={[styles.container, { backgroundColor: color }]}>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});