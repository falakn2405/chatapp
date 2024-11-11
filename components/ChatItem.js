import { TouchableOpacity, View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import { formDate, getRoomId } from '../utils/common';
import { collection, doc, onSnapshot, orderBy, query, Timestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function ChatItem({item, router, noBorder, currentUser}) {
    const [lastMessage, setLastMessage] = useState(undefined);

    const blurhash =
        '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
    const openChatRoom = () => {
        router.push({pathname: '/chatRoom', params: item});
    }

    useEffect(() => {
        let roomId = getRoomId(currentUser?.userId, item?.userId);
        const docRef = doc(db, "rooms", roomId);
        const messagesRef = collection(docRef, "messages");
        const q = query(messagesRef, orderBy('createdAt', 'desc'))

        let unsub = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map(doc=>{
                return doc.data();
            });
            setLastMessage(allMessages[0]? allMessages[0]: null);
        });

        return unsub;
    }, [])

    const renderTime = () => {
        Todo: "show time when msgs are sent after day show date"
        if(lastMessage) {
            let date = lastMessage?.createdAt;
            return formDate(new Date(date?.seconds * 1000));
        }
        return "Time";
    }

    const renderLastMessage = () => {
        ToDo: "If new msg show with background color"
        if(typeof lastMessage == "undefined") return "Loading...";
        if(lastMessage) {
            if(currentUser?.userId == lastMessage?.userId) return "You: "+lastMessage?.text;
            return lastMessage?.text;
        }else {
            return "Say Hi 👋";
        }
    }

    return (
        <TouchableOpacity onPress={openChatRoom} className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${noBorder? '' : 'border-b border-b-neutral-200' }`} >
            <Image source={item?.profileUrl}
                style={{height: hp(6), width: hp(6), borderRadius: 100}}
                placeholder={{blurhash}}
                transition={500}
            />
            {/* name and last msg w/ time */}
            <View className="flex-1 gap-1">
                <View className="flex-row justify-between">
                    <Text style={{fontSize: hp(1.8)}} className="font-semibold text-neutral-800">{item?.userName}</Text>
                    <Text style={{fontSize: hp(1.6)}} className="font-medium text-neutral-500">
                        {renderTime()}
                    </Text>
                </View>
                <Text style={{fontSize: hp(1.6)}} className="font-medium text-neutral-500">
                    {renderLastMessage()}
                </Text>
            </View>
        
        </TouchableOpacity>
    )
}