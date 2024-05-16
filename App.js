import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import ImageViewer from './components/ImageViewer';
import Button from './components/Button';

import * as ImagePicker from 'expo-image-picker'

import { useState } from 'react';

const PlaceholderImage = require('./assets/images/background-image.png');


export default function App() {

  //React Native 'useState' hook, null is the default value of 'selectedImage'
  const [selectedImage, setSelectedImage] = useState(null);

  const [showAppOptions, setShowAppOptions] = useState(false);

  //async waits for the 'await'
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    //if using default image
    if (!result.canceled) {
      console.log(result);
      //setSelectedImage is a function that automatically sets Selected Image
      setSelectedImage(result.assets[0].uri);
      //set showAppOptions to 'true'
      setShowAppOptions(true); 
    } else {
      alert('You did not select any image.');
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer 
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage} 
        />
      </View>
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Choose a Photo" onPress={pickImageAsync}/>
        <Button label="Use this Photo" onPress={() => setShowAppOptions(true)} />
        //Using setShowAppOptions inside of an arrow function makes it act like an event handler.
        //This prevents setShowAppOptions from 
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'moccasin',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  footerContainer: {
    flex: 1/3,
    alignItems: 'center',
  },
});
