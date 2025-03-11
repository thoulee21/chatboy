import { router, Stack } from 'expo-router'
import React, { useCallback, useState } from 'react'
import type { TextInputProps } from 'react-native'
import {
  GiftedChat,
  IMessage,
  InputToolbar,
} from 'react-native-gifted-chat'
import { Avatar, IconButton, useTheme } from 'react-native-paper'
import type {
  AvatarImageSource
} from 'react-native-paper/lib/typescript/components/Avatar/AvatarImage'

const STARTER_MESSAGES: IMessage[] = [
  {
    _id: 1,
    text: 'Hello developer',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Expo',
      avatar: require('@/assets/images/icon.png'),
    },
  },
]

export default function App() {
  const appTheme = useTheme()
  const [messages, setMessages] = useState(STARTER_MESSAGES)

  const onSend = useCallback((messages = [] as IMessage[]) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
  }, [])

  return (
    <>
      <Stack.Screen options={{
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="test-tube"
            iconColor={tintColor}
            onPress={() => {
              router.push('/test')
            }}
          />
        )
      }} />

      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: 1,
          avatar: require('@/assets/images/icon.png'),
        }}
        showUserAvatar
        renderAvatar={(props) => (
          <Avatar.Image
            size={40}
            source={props.currentMessage.user.avatar as AvatarImageSource}
          />
        )}
        textInputProps={{
          style: {
            color: appTheme.colors.onSurface,
            height: 55,
            width: '84%',
            paddingHorizontal: 8,
          }
        } as TextInputProps}
        renderInputToolbar={(props) => (
          <InputToolbar
            {...props}
            containerStyle={{
              backgroundColor: appTheme.colors.surface,
              marginTop: 8,
            }}
          />
        )}
      />
    </>
  )
}