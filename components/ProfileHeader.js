import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function ProfileHeader() {
    return (
        <Stack.Screen 
            options={{
                title: 'Profile',
                headerShadowVisible: true,
                headerStyle: {
                    backgroundColor: '#818CF8',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontSize: hp(3),
                }
            }}
        />
    )
}