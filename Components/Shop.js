import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

const Shop = () => {
  return (
    <View style={styles.conatiner}>
      <Text>Shop</Text>
    </View>
  )
}

export default Shop

const styles = StyleSheet.create({

    conatiner:{
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      height:1000
    }
  
  
  })