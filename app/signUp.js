import { Entypo, Feather, Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Loading from '../components/Loading';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { useAuth } from '../context/authContext';

export default function SignUp() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false)
    const { register } = useAuth();
    const usernameRef = useRef("");
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const profileRef = useRef("");

    const handleRegister = async() => {
        if(!emailRef.current || !passwordRef.current || !usernameRef.current || !profileRef.current) {
            Alert.alert("Sign Up", "Please enter all fields")
            return;
        }
        setLoading(true);

        let response = await register(emailRef.current, passwordRef.current, usernameRef.current, profileRef.current)
        setLoading(false)
        console.log("got result", response);

        if(!response.success) {
            Alert.alert("Sign Up", response.msg);
        }
    }

    return (
        <CustomKeyboardView>
            <StatusBar style='dark' />
            <View style={{paddingTop: hp(8), paddingHorizontal: wp(5)}} className="flex-1 gap-10">
                {/* signIn image */}
                <View className="items-center">
                    <Image style={{height: hp(25)}} resizeMode='contain' source={require("../assets/images/signup.jpg")} />
                </View>

                <View className="gap-10">
                    <Text style={{fontSize: hp(4)}} className="font-bold tracking-wider text-center text-neutral-800">
                        Sign Up
                    </Text>

                    <View className="gap-4">
                        <View style={{height: hp(7)}} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
                            <Feather name='user' size={hp(2.7)} color="gray" />
                            <TextInput 
                                style={{fontSize: hp(2)}}
                                onChangeText={value => usernameRef.current = value}
                                className="flex-1 font-semibold text-neutral-700"
                                placeholder='Username'
                                placeholderTextColor={'gray'}
                            />
                        </View>

                        <View style={{height: hp(7)}} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
                            <Octicons name='mail' size={hp(2.7)} color="gray" />
                            <TextInput 
                                style={{fontSize: hp(2)}}
                                onChangeText={value => emailRef.current = value}
                                className="flex-1 font-semibold text-neutral-700"
                                placeholder='Email address'
                                placeholderTextColor={'gray'}
                            />
                        </View>

                        <View style={{height: hp(7)}} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
                            <Octicons name='lock' size={hp(2.7)} color="gray" />
                            <TextInput 
                                style={{fontSize: hp(2)}}
                                onChangeText={value => passwordRef.current = value}
                                className="flex-1 font-semibold text-neutral-700"
                                placeholder='Password'
                                placeholderTextColor={'gray'}
                                secureTextEntry={!showPass}
                                autoCapitalize='none'
                                autoCorrect={false}
                            />
                            <TouchableOpacity>
                                <Entypo 
                                    name={showPass ? 'eye' : 'eye-with-line'}
                                    size={hp(2.7)} color="gray"
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={{height: hp(7)}} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
                            <Feather name='image' size={hp(2.7)} color="gray" />
                            <TextInput 
                                style={{fontSize: hp(2)}}
                                onChangeText={value => profileRef.current = value}
                                className="flex-1 font-semibold text-neutral-700"
                                placeholder='Profile Url'
                                placeholderTextColor={'gray'}
                            />
                        </View>

                        {/* submit button */}
                        <View className="pt-2">
                            {
                                loading ? (
                                    <View className="flex-row justify-center">
                                        <Loading size={hp(6.5)} />
                                    </View>
                                ): (
                                    <TouchableOpacity onPress={handleRegister} style={{height: hp(6.5)}} className="bg-violet-500 rounded-xl justify-center items-center">
                                        <Text style={{fontSize: hp(2.7)}} className="text-white font-bold tracking-wider">
                                            Sign Up
                                        </Text>
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                        
                        <View className="flex-row justify-center">
                            <Text style={{fontSize: hp(1.8)}} className="font-semibold text-neutral-500">Already have an account? </Text>
                            <Pressable onPress={() => router.push('signIn')}>
                                <Text style={{fontSize: hp(1.8)}} className="font-bold text-violet-500">Sign In</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </CustomKeyboardView>
    )
}
