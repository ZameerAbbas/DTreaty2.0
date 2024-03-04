import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

const Weather = () => {
  return (
       <View style={styles.conatiner}>
      <Text className="text-red-700">Weather</Text>
    </View>
  )
}

export default Weather

const styles = StyleSheet.create({

  conatiner:{
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height:1000
  }


})