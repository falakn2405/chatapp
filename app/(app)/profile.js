import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import ProfileHeader from '../../components/ProfileHeader'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useAuth } from '../../context/authContext'
import { Image } from 'expo-image'

export default function profile() {
    const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
    
    const {user} = useAuth();

    return (
        <View>
            <StatusBar style='light' />
            <ProfileHeader />
            <View className="flex-row items-center justify-center mt-8">
                <Image
                    style={{height: hp(30), aspectRatio: 1, borderRadius: 120}}
                    source={user?.profileUrl}
                    placeholder={{blurhash}}
                />
            </View>
            <View className="flex-row items-center justify-between">
                <Text>Name</Text>
                <View className="flex-1 mx-2">
                    <TextInput 
                        className="border-b border-neutral-700"
                        value={user?.userName}
                        placeholder='Name'
                        placeholderTextColor='#3e4145'
                    />
                </View>
            </View>
        </View>
    )
}