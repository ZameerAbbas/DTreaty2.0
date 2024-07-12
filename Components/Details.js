// import React, {useState} from "react";
// import {View, Text, TextInput, TouchableOpacity} from 'react-native';
// import firestore from '@react-native-firebase/firestore';

// export default function Details ({routes, naviagtion }) {
//     const {uid} = routes.params;
//     const [name, setName] = useState('');
//     const [dob, setDob] = useState('');
//     const [gender, setGender] = useState('');



//     const saveDetails = async() =>{
//         try {
//             await firestore.collection("users").doc(uid).set({
//                 name,
//                 dob,
//                 gender,
//             });

//             naviagtion.naviagte('HomeScreen')
//         } catch (error) {
//             console.log('Error saving details: ', error)
//         }
//     }

//     return(
//         <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
//             <Text style={{fontSize:20, fontWeight:'bold'}}>Enter Name: </Text>
//             <TextInput style={{height: 50, width: '100%', borderColor: 'black', borderWidth: 1, marginBottom:12}}
//             placeholder="Enter Name"
//             value={name}
//             onChangeText={setName}
//             />
//             <Text style={{fontSize:20, fontWeight:'bold'}}>Enter DOB: </Text>
//             <TextInput style={{height: 50, width: '100%', borderColor: 'black', borderWidth: 1, marginBottom:12}}
//             placeholder="Enter DOB"
//             value={dob}
//             onChangeText={setDob}
//             />
//             <Text style={{fontSize:20, fontWeight:'bold'}}>Enter Gender: </Text>
//             <TextInput style={{height: 50, width: '100%', borderColor: 'black', borderWidth: 1, marginBottom:12}}
//             placeholder="Enter Gender"
//             value={name}
//             gender={setGender}
//             />

//             <TouchableOpacity 
//             onPress={saveDetails}
//             style={{
//                 backgroundColor:'yellow',
//                 padding: 10,
//                 borderRadius:5, 
//             }}>
//                 <Text>Save</Text>s
//             </TouchableOpacity>

//         </View>
//     )
// }

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function Details({ route, navigation }) {
    const { uid } = route.params; // Corrected prop name
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');

    const saveDetails = async () => {
        try {
            // Using firestore() function to get the firestore instance
            await firestore().collection("users").doc(uid).set({
                name,
                dob,
                gender,
            });

            navigation.navigate('HomeScreen'); // Corrected navigation method and name
        } catch (error) {
            console.log('Error saving details: ', error);
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Enter Name:</Text>
            <TextInput 
                style={{ height: 50, width: '80%', borderColor: 'gray', borderWidth: 1, marginBottom: 12, paddingHorizontal: 10 }}
                placeholder="Enter Name"
                value={name}
                onChangeText={setName}
            />
            
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Enter DOB:</Text>
            <TextInput 
                style={{ height: 50, width: '80%', borderColor: 'gray', borderWidth: 1, marginBottom: 12, paddingHorizontal: 10 }}
                placeholder="Enter DOB"
                value={dob}
                onChangeText={setDob}
            />
            
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Enter Gender:</Text>
            <TextInput 
                style={{ height: 50, width: '80%', borderColor: 'gray', borderWidth: 1, marginBottom: 12, paddingHorizontal: 10 }}
                placeholder="Enter Gender"
                value={gender} // Corrected to bind the gender state
                onChangeText={setGender} // Corrected to update gender state
            />

            <TouchableOpacity 
                onPress={saveDetails}
                style={{
                    backgroundColor: 'yellow',
                    padding: 10,
                    borderRadius: 5,
                    alignItems: 'center',
                    width: '80%',
                    marginTop: 20
                }}>
                <Text style={{ fontWeight: 'bold' }}>Save</Text>
            </TouchableOpacity>
        </View>
    );
}

