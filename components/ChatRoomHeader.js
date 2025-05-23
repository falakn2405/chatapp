import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';

export default function ChatRoomHeader({user, router}) {
    return (
        <Stack.Screen 
            options={{
                title: "",
                headerShadowVisible: false,
                headerLeft: ()=>(
                    <View className="flex-row items-center gap-4">
                        <TouchableOpacity onPress={() => router.back()}>
                            <Entypo name='chevron-left' size={hp(4)} color='#737373' />
                        </TouchableOpacity>
                        <View className="flex-row items-center gap-3">
                            <Image style={{height: hp(4.5), aspectRatio: 1, borderRadius: 100}}
                                source={user?.profileUrl}
                            />
                            <Text style={{fontSize: hp(2.5)}} className="text-neutral-700 font-medium">
                                {user?.userName}
                            </Text>
                        </View>
                    </View>
                ),
                headerRight: ()=>(
                    <View className="flex-row items-center gap-8">
                        {/* Todo: call function */}
                        <Ionicons name='call' size={hp(2.8)} color='#787878' />
                        <Ionicons name='videocam' size={hp(2.8)} color='#787878' />
                    </View>
                )
            }}
        />
    )
}