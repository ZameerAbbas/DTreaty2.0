import React from "react";
import {View, StyleSheet} from 'react-native';
import YoutubeSlider from "./youtube";

const YoutubeVideos = () => {
    return (
      <View style={styles.container}>
        <YoutubeSlider/>
        <YoutubeSlider/>
        <YoutubeSlider/>
        <YoutubeSlider/>
      </View>
    );
  }
  
  export default YoutubeVideos;
  
  const styles = StyleSheet.create({
    container: {
      flex:1,
      justifyContent:'center',
      alignItems:'center',
    }
  });
  