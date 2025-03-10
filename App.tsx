import React, { useCallback, useEffect, useState } from 'react'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function App() {
  const [messages, setMessages] = useState([] as IMessage[])

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: require('./assets/icon.png'),
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = [] as IMessage[]) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
  }, [])

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
          avatar: require('./assets/icon.png'),
        }}
        showUserAvatar
        onLongPressAvatar={(user) => {
          console.debug(JSON.stringify(user, null, 2))
        }}
      />
    </SafeAreaProvider>
  )
}