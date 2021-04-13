![Collection](https://user-images.githubusercontent.com/48656356/114532245-f19d5680-9c4c-11eb-9162-a909f30a8009.png)
# ChitChat
Made with **React Native**.
## Description
**ChitChat** is a messenger service application for mobile phones similar to WhatsApp, where users can do the following:

* send and receive text messages.
* send and receive images, or photos.
* take photos with the device's camera, and then send them as a message.
* share their location.
* view messages offline: text messages, images, photos, and sent locations.

# Take a Look at the App
<kbd>
<img src="readme-images/ChitChat-on-iOS.gif" height="450"/>
</kbd>
 
# Setting Up the Application

1. Install the Expo CLI on your machine:
`npm install expo-cli g`

2. Clone the application: 
`git clone https://github.com/kevmhughes/ChitChat`

2. Enter the root folder: 
`cd ChitChat`

4. Install dependencies in the root folder: `npm install`


5. Open the project in the root folder:
 `expo start`
 
6. Install Expo Go on your mobile device: [Expo Go](https://docs.expo.io/get-started/installation/)
 
6. Download Android Studio to create an Android emulator: [Android Studio](https://developer.android.com/studio)

7. Download Xcode to create an iOS simulator: [Xcode](https://developer.apple.com/xcode/resources/)

8. Configure Google Firebase for this project: [Google Firebase](https://firebase.google.com)

* Add Firestore, a NoSQL database to the Project: [Add Firestore](https://firebase.google.com/docs/web/setup)

* Copy the contents of the config object from `{ apiKey:… to messagingSenderId:…}`. You will need to integrate this configuration info into the `firebase.initializeApp` object in the “Chat.js” file, which is what will allow the app to connect to Firestore.

* In Cloud Firestore, create a collection, name it "messages", and add the following fields.

![Collection](https://user-images.githubusercontent.com/48656356/114532245-f19d5680-9c4c-11eb-9162-a909f30a8009.png)

* Create the storage for the videos/photos: [Create storage](https://firebase.google.com/docs/storage?authuser=0)


# Tools Used

### Frameworks
* React Native
* Expo CLI

### Development Environment
* Node.js
* Android Studio
* Expo Go

### Libraries
* Gifted Chat

### Database & Storage
* Google Firebase    

### Dependencies

    "@react-native-community/async-storage": "~1.12.0",
    "@react-native-community/masked-view": "^0.1.10",
    "@react-native-community/netinfo": "^5.9.7",
    "@react-navigation/native": "^5.9.3",
    "@react-navigation/stack": "^5.14.3",
    "expo": "~40.0.0",
    "expo-image-picker": "^9.2.0",
    "expo-location": "^10.0.0",
    "expo-permissions": "^10.0.0",
    "expo-status-bar": "~1.0.3",
    "firebase": "^7.9.0",
    "npm": "^7.8.0",
    "prop-types": "^15.7.2",
    "react": "16.13.1",
    "react-dom": "16.13.1",
    "react-native": "https://github.com/expo/react-native/archive/sdk-40.0.1.tar.gz",
    "react-native-gesture-handler": "~1.8.0",
    "react-native-gifted-chat": "^0.16.3",
    "react-native-maps": "0.27.1",
    "react-native-paper": "^4.7.2",
    "react-native-reanimated": "~1.13.0",
    "react-native-safe-area-context": "^3.1.9",
    "react-native-screens": "~2.15.2",
    "react-native-web": "~0.13.12",
    "react-navigation": "^4.4.4",
    "react-navigation-stack": "^2.10.4"


