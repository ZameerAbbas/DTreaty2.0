import React from "react";
import {View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";


const Item = ({ item }) => {
  
  const navigation = useNavigation();
  const handlediseaseCard = (event, item) => {
    navigation.navigate("DiseaseDetailsMain", {
      disease: item,
    });
  }
  return (
    <View style={styles.item}>
      <View style={styles.textContainer}>
        <Text style={styles.titleS}>{item.item?.title}</Text>
        <Text numberOfLines={2} style={styles.subtitleS}>{item.item?.subtitle}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={(event) => {
            event.persist(); // Persist the event
            handlediseaseCard(event, item);
          }}
        >
          <Text style={styles.buttonText}>{item.item?.buttonTxt}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={item.item?.img}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#E6E6E6",
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 16,
    borderRadius: 10,
    height: 190,
    width: 358,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginRight: 20,
  },
  titleS: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  subtitleS: {
    fontSize: 14,
    color: '#666',
    flexWrap: 'wrap'
  },
  button: {
    backgroundColor: "#4DB129",
    width: 90,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 6,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: 'bold',
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },

})