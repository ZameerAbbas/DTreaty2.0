import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

const Laibaray = () => {
  return (
    <View style={styles.conatiner}>
      <Text>Laibaray</Text>
    </View>
  )
}


export default Laibaray

const styles = StyleSheet.create({

    conatiner:{
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      height:1000
    }
  
  
  })