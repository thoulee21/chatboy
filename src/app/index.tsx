import React, { useCallback, useState } from 'react'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import { Avatar } from 'react-native-paper'
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
  const [messages, setMessages] = useState(STARTER_MESSAGES)

  const onSend = useCallback((messages = [] as IMessage[]) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
  }, [])

  return (
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
    />
  )
}