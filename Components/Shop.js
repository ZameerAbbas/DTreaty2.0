import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import Footer from './Footer'

const Shop = () => {
  return (
    <View style={styles.conatiner}>
      <Text>Shop</Text>
      <Footer/>
    </View>
  )
}

export default Shop

const styles = StyleSheet.create({

    conatiner:{

      flex:1,
      justifyContent: "center",
      alignItems: "center",
      height:1000
    }
  
  
  })