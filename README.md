# ChitChat
ChitChat was built with **React Native**.

# Description
**ChitChat** is a messenger service application for mobile phones similar to WhatsApp.

# Take a Look at the App
<kbd>
<img src="readme-images/chitchat.gif"/>
</kbd>

Please click on the image if the view is not displayed correctly on your web browswer.
 
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

# Features

### Users are able to:

* send and receive text messages.
* send and receive images, or photos.
* take photos with the device's camera, and then send them as a message.
* share their location.
* view messages offline: text messages, images, photos, and sent locations.


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



