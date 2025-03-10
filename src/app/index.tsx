import React, { useCallback, useEffect, useState } from 'react'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'

export default function App() {
  const [messages, setMessages] = useState([] as IMessage[])

  useEffect(() => {
    setMessages([{
      _id: 1,
      text: 'Hello developer',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: require('@/assets/images/icon.png'),
      },
    }])
  }, [])

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
      renderUsernameOnMessage
    />
  )
}