import React from "react";
import {View, Text, TouchableOpacity, Linking, StyleSheet} from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';

const YoutubeSlider = () => {
    const videoId = 'an9me4glKQU';
  
    const openYouTubeApp = () => {
      const url = `vnd.youtube://${videoId}`;
      Linking.canOpenURL(url)
        .then((supported) => {
          if (supported) {
            Linking.openURL(url);
          } else {
            // Fallback to the browser if YouTube app is not installed
            Linking.openURL(`https://www.youtube.com/watch?v=${videoId}`);
          }
        })
        .catch((err) => console.error('An error occurred', err));
    };
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={openYouTubeApp} style={styles.videoCont}>
        <YoutubeIframe
          // width={'40%'}
          // height={"50%"}
          play={false}
          videoId={'an9me4glKQU'}
        />
        <View  style={{marginLeft:12}}>
          <Text style={styles.titleText}>Apple Scab</Text>
          <Text style={styles.text}>Apple Scab is a disease effected by the virus that has been created due to the corona virus in 2019</Text>
        </View>
        </TouchableOpacity>
      </View>
    );
  }
  
  export default YoutubeSlider;
  
  const styles = StyleSheet.create({
    container: {
      paddingTop: 17,
    },
    videoCont:{
      height:164,
      width:'90%',
      borderWidth:2,
      borderRadius:12,
      backgroundColor:'white',
      borderColor:'black',
      justifyContent:'center',
      alignItems:'center',
      paddingVertical: 17, 
    },
    titleText:{
      fontSize:18,
      fontWeight:'bold',
    },
    text:{
      fontSize:14,
      fontWeight:'300',
    }
  });
  