// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import { useNavigation } from "@react-navigation/native";
// import defaultExport from "@react-native-firebase/auth";


// const Login = () => {
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [code, setCode] = useState('');
//     const [confirm, setConfirm] = useState(null);
//     const navigation = useNavigation();

//     const signInWithPhoneNumber = async () => {
//         try {
//             const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
//             setConfirm(confirmation);

//         } catch (error) {
//             console.log("Error sending code: ", error)
//         }
//     };

//     const confirmCode = async () => {
//         try {
//             const useCredential = await confirm.confirm(code);
//             const user = useCredential.user;


//             const userDocument = await firestore()
//                 .collection('users')
//                 .doc(user.uid)
//                 .get();

//             if (userDocument.exists) {
//                 navigation.navigate('HomeScreen');
//             } else {
//                 navigation.navigate('Details', { uid: user.id });
//             }

//         } catch (error) {
//             console.log("invalid code : ", error)
//         }
//         return (
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'black' }}>
//                 <Text style={{ fontSize: 16, fontWeight: 'bold', color:'black' }}>Phone Number Authentication</Text>
//                 {
//                     !confirm ? (
//                         <>
//                             <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Enter Phone Number</Text>
//                             <TextInput style={{ height: 50, width: '100%', borderColor: 'black', borderWidth: 1 }}
//                                 placeholder="e.g, +92 3466497023"
//                                 value={phoneNumber}
//                                 onChangeText={setPhoneNumber}
//                             />
//                             <TouchableOpacity 
//                             onPress={signInWithPhoneNumber}
//                             style={{
//                                 backgroundColor:'yellow',
//                                 padding: 10,
//                                 borderRadius:5, 
//                             }}
//                             >
//                                 <Text>Sign In</Text>
//                             </TouchableOpacity>
//                             </>
//                             ) : (
//                                 <>
//                             <Text style={{fontSize: 16, fontWeight:'bold'}}>Enter Code: </Text>
//                             <TextInput style={{ height: 50, width: '100%', borderColor: 'black', borderWidth: 1 }}
//                                 placeholder="Enter Code"
//                                 value={code}
//                                 onChangeText={setCode}
//                             />
//                             <TouchableOpacity 
//                             onPress={confirmCode}
//                             style={{
//                                 backgroundColor:'yellow',
//                                 padding: 10,
//                                 borderRadius:5, 
//                             }}
//                             >
//                                 <Text>Verify</Text>
//                             </TouchableOpacity>
//                             </>
//                             )
//                 }
//                         </View>
//                 )
//     }
// };

// export default Login;

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native";

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [confirm, setConfirm] = useState(null);
    const navigation = useNavigation();

    const signInWithPhoneNumber = async () => {
        try {
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            setConfirm(confirmation);
        } catch (error) {
            console.log("Error sending code: ", error);
        }
    };

    const confirmCode = async () => {
        try {
            const userCredential = await confirm.confirm(code);
            const user = userCredential.user;

            const userDocument = await firestore()
                .collection('users')
                .doc(user.uid)
                .get();

            if (userDocument.exists) {
                navigation.navigate('HomeScreen');
            } else {
                navigation.navigate('Details', { uid: user.uid }); // Corrected 'user.id' to 'user.uid'
            }
        } catch (error) {
            console.log("Invalid code: ", error);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Phone Number Authentication</Text>
            {
                !confirm ? (
                    <>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Enter Phone Number</Text>
                        <TextInput 
                            style={{ height: 50, width: '80%', borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }}
                            placeholder="e.g., +92 3466497023"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            keyboardType="phone-pad"
                        />
                        <TouchableOpacity 
                            onPress={signInWithPhoneNumber}
                            style={{
                                backgroundColor: 'yellow',
                                padding: 10,
                                borderRadius: 5,
                                alignItems: 'center',
                                width: '80%'
                            }}
                        >
                            <Text style={{ fontWeight: 'bold' }}>Sign In</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Enter Code</Text>
                        <TextInput 
                            style={{ height: 50, width: '80%', borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }}
                            placeholder="Enter Code"
                            value={code}
                            onChangeText={setCode}
                            keyboardType="number-pad"
                        />
                        <TouchableOpacity 
                            onPress={confirmCode}
                            style={{
                                backgroundColor: 'yellow',
                                padding: 10,
                                borderRadius: 5,
                                alignItems: 'center',
                                width: '80%'
                            }}
                        >
                            <Text style={{ fontWeight: 'bold' }}>Verify</Text>
                        </TouchableOpacity>
                    </>
                )
            }
        </View>
    );
};

export default Login;

