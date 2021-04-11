import PropTypes from 'prop-types';
import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';

import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

const firebase = require('firebase');
require('firebase/firestore');

export default class CustomActions extends React.Component {
  constructor() {
    super();
  }

  /**
     * Requests permission to access the CAMERA_ROLL, lets the user pick an image, then sends the uri of the image to uploadImage onSend.
     * @function pickImage
     * @async
     * @param {string} image - image uri
     */

    pickImage = async () => {
      try {
        // get Permission to access CAMERA_ROLL
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        // only proceed if user granted permission
        if (status === 'granted') {
          // let user pick an image
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'Images',
          }).catch((error) => console.log(error));

          // check if user cancelled image selection
          if (!result.cancelled) {
            const imageUrl = await this.uploadImage(result.uri);
            // send and use chosen image
            this.props.onSend({ image: imageUrl });
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    /**
     * Requests permission to access the CAMERA, lets the user take a photo with the device´s camera, then sends the uri of the image to uploadImage onSend.
     * @function takePhoto
     * @async
     * @param {string} image - image uri
     */

    takePhoto = async () => {
      try {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);

        if (status === 'granted') {
          const result = await ImagePicker.launchCameraAsync().catch((error) => console.log(error));

          if (!result.cancelled) {
            const imageUrlLink = await this.uploadImage(result.uri);
            this.props.onSend({ image: imageUrlLink });
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    /**
     * Requests permission to access the device´s location, then sends the user´s location onSend.
     * @function getLocation
     * @async
     * @param {number} location - longitudinal and latitudinal coordinates
     */

    getLocation = async () => {
      try {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);

        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({}).catch((error) => console.log(error));

          if (location) {
            this.props.onSend({
              location: {
                longitude: location.coords.longitude,
                latitude: location.coords.latitude,
              },
            });
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    /**
     * Uploads the picked image, or the image taken with the user´s device, as a blob to Firebase cloud storage.
     * @function uploadImage
     * @async
     * @param {string} uri
     * @returns {string} imageURL
     */

    // upload image to Storage with XMLHttpRequest
    uploadImage = async (uri) => {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          console.log(e);
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
      });
      const getImageName = uri.split('/');
      const imageArrayLength = getImageName[getImageName.length - 1];
      const ref = firebase
        .storage()
        .ref()
        .child(`images/${imageArrayLength}`);

      const snapshot = await ref.put(blob);
      blob.close();
      const imageUrl = await snapshot.ref.getDownloadURL();
      return imageUrl;
    }

    /**
     * Creates an action sheet with four buttons: pick image; take photo; get location; and cancel.
     * @function onActionPress
     * @returns {actionSheet}
     */

    onActionPress = () => {
      const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
      const cancelButtonIndex = options.length - 1;
      this.context.actionSheet().showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        async (buttonIndex) => {
          switch (buttonIndex) {
            case 0:
              return this.pickImage();
            case 1:
              return this.takePhoto();
            case 2:
              return this.getLocation();
            default:
          }
        },
      );
    };

    render() {
      return (
        <TouchableOpacity
          accessible
          accessibilityLabel="Click for options"
          style={[styles.container]}
          onPress={this.onActionPress}
        >
          <View style={[styles.wrapper, this.props.wrapperStyle]}>
            <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
          </View>
        </TouchableOpacity>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 12,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
};
