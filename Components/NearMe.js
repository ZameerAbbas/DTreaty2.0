import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

const NearMe = () => {
  return (
    <View style={styles.conatiner}>
      <Text>NearMe</Text>
    </View>
  )
}

export default NearMe

const styles = StyleSheet.create({

    conatiner:{
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      height:1000
    }
  
  
  })