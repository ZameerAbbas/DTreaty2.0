import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'

const ComingSoon = () => {
  return (
    <View style={styles.conatiner}>
      <Text>ComingSoon</Text>
    </View>
  )
}

export default ComingSoon
const styles = StyleSheet.create({

  conatiner:{
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height:1000
  }


})