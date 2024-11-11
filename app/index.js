import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

const index = () => {
    return (
        <View className="flex-1 justify-center items-center">
            <ActivityIndicator size='large'></ActivityIndicator>
        </View>
    )
}

export default index