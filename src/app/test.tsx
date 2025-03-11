import { MaterialIcons } from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard'
import React, { useCallback, useReducer } from 'react'
import { Alert, Linking, Platform, StyleSheet, Text, View } from 'react-native'
import {
  GiftedChat,
  IMessage,
  Send,
  SendProps,
  SystemMessage,
  type ActionsProps,
  type SystemMessageProps,
} from 'react-native-gifted-chat'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import AccessoryBar from '../example-expo/AccessoryBar'
import CustomActions from '../example-expo/CustomActions'
import earlierMessages from '../example-expo/data/earlierMessages'
import messagesData from '../example-expo/data/messages'

const user = {
  _id: 1,
  name: 'Developer',
}

interface IState {
  messages: any[]
  step: number
  loadEarlier?: boolean
  isLoadingEarlier?: boolean
  isTyping: boolean
}

enum ActionKind {
  SEND_MESSAGE = 'SEND_MESSAGE',
  LOAD_EARLIER_MESSAGES = 'LOAD_EARLIER_MESSAGES',
  LOAD_EARLIER_START = 'LOAD_EARLIER_START',
  SET_IS_TYPING = 'SET_IS_TYPING',
  // LOAD_EARLIER_END = 'LOAD_EARLIER_END',
}

// An interface for our actions
interface StateAction {
  type: ActionKind
  payload?: any
}

function reducer(state: IState, action: StateAction) {
  switch (action.type) {
    case ActionKind.SEND_MESSAGE: {
      return {
        ...state,
        step: state.step + 1,
        messages: action.payload,
      }
    }
    case ActionKind.LOAD_EARLIER_MESSAGES: {
      return {
        ...state,
        loadEarlier: true,
        isLoadingEarlier: false,
        messages: action.payload,
      }
    }
    case ActionKind.LOAD_EARLIER_START: {
      return {
        ...state,
        isLoadingEarlier: true,
      }
    }
    case ActionKind.SET_IS_TYPING: {
      return {
        ...state,
        isTyping: action.payload,
      }
    }
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    messages: messagesData,
    step: 0,
    loadEarlier: true,
    isLoadingEarlier: false,
    isTyping: false,
  })

  const onSend = useCallback(
    (messages: any[]) => {
      const sentMessages = [{ ...messages[0], sent: true, received: true }]
      const newMessages = GiftedChat.append(
        state.messages,
        sentMessages,
        Platform.OS !== 'web'
      )

      dispatch({ type: ActionKind.SEND_MESSAGE, payload: newMessages })
    },
    [dispatch, state.messages]
  )

  const onLoadEarlier = useCallback(() => {
    dispatch({ type: ActionKind.LOAD_EARLIER_START })
    setTimeout(() => {
      const newMessages = GiftedChat.prepend(
        state.messages,
        earlierMessages() as unknown as IMessage[],
        Platform.OS !== 'web'
      )

      dispatch({ type: ActionKind.LOAD_EARLIER_MESSAGES, payload: newMessages })
    }, 1500) // simulating network
    // }, 15000) // for debug with long loading
  }, [dispatch, state.messages])

  const parsePatterns = useCallback(() => {
    return [
      {
        pattern: /#(\w+)/,
        style: { textDecorationLine: 'underline', color: 'darkorange' },
        onPress: () => Linking.openURL('http://gifted.chat'),
      },
    ]
  }, [])

  const onLongPressAvatar = useCallback((pressedUser: any) => {
    Alert.alert(JSON.stringify(pressedUser))
  }, [])

  const onPressAvatar = useCallback(() => {
    Alert.alert('On avatar press')
  }, [])

  const handleLongPress = useCallback((context: unknown, currentMessage: { text: string }) => {
    if (!currentMessage.text)
      return

    const options = [
      'Copy text',
      'Cancel',
    ]

    const cancelButtonIndex = options.length - 1

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ; (context as any).actionSheet().showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        (buttonIndex: number) => {
          switch (buttonIndex) {
            case 0:
              Clipboard.setStringAsync(currentMessage.text)
              break
            default:
              break
          }
        }
      )
  }, [])

  const onQuickReply = useCallback((replies: any[]) => {
    const createdAt = new Date()
    if (replies.length === 1)
      onSend([
        {
          createdAt,
          _id: Math.round(Math.random() * 1000000),
          text: replies[0].title,
          user,
        },
      ])
    else if (replies.length > 1)
      onSend([
        {
          createdAt,
          _id: Math.round(Math.random() * 1000000),
          text: replies.map(reply => reply.title).join(', '),
          user,
        },
      ])
    else
      console.warn('replies param is not set correctly')
  }, [onSend])

  const renderQuickReplySend = useCallback(() => {
    return <Text>{' custom send =>'}</Text>
  }, [])

  const setIsTyping = useCallback(
    (isTyping: boolean) => {
      dispatch({ type: ActionKind.SET_IS_TYPING, payload: isTyping })
    },
    [dispatch]
  )

  const onSendFromUser = useCallback(
    (messages: IMessage[] = []) => {
      const createdAt = new Date()
      const messagesToUpload = messages.map(message => ({
        ...message,
        user,
        createdAt,
        _id: Math.round(Math.random() * 1000000),
      }))

      onSend(messagesToUpload)
    },
    [onSend]
  )

  const renderAccessory = useCallback(() => {
    return (
      <AccessoryBar
        onSend={onSendFromUser}
        isTyping={() => setIsTyping(!state.isTyping)}
      />
    )
  }, [onSendFromUser, setIsTyping, state.isTyping])

  const renderCustomActions = useCallback(
    (props: ActionsProps) =>
      Platform.OS === 'web'
        ? null
        : (
          <CustomActions {...props} onSend={onSendFromUser} />
        ),
    [onSendFromUser]
  )

  const renderSystemMessage = useCallback((props: SystemMessageProps<any>) => {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15,
        }}
        textStyle={{
          fontSize: 14,
        }}
      />
    )
  }, [])

  const renderSend = useCallback((props: SendProps<IMessage>) => {
    return (
      <Send {...props} containerStyle={{ justifyContent: 'center', paddingHorizontal: 10 }}>
        <MaterialIcons size={30} color={'tomato'} name={'send'} />
      </Send>
    )
  }, [])

  const insets = useSafeAreaInsets()

  return (
    <View style={styles.fill}>
      <GiftedChat
        messages={state.messages}
        onSend={onSend}
        loadEarlier={state.loadEarlier}
        onLoadEarlier={onLoadEarlier}
        isLoadingEarlier={state.isLoadingEarlier}
        parsePatterns={parsePatterns}
        user={user}
        isScrollToBottomEnabled
        onPressAvatar={onPressAvatar}
        onLongPressAvatar={onLongPressAvatar}
        onLongPress={handleLongPress}
        onQuickReply={onQuickReply}
        quickReplyStyle={{ borderRadius: 2 }}
        quickReplyTextStyle={{
          fontWeight: '200',
        }}
        renderQuickReplySend={renderQuickReplySend}
        renderAccessory={renderAccessory}
        renderActions={renderCustomActions}
        renderSystemMessage={renderSystemMessage}
        // renderCustomView={renderCustomView}
        renderSend={renderSend}
        keyboardShouldPersistTaps='never'
        timeTextStyle={{
          left: { color: 'red' },
          right: { color: 'yellow' },
        }}
        isTyping={state.isTyping}
        inverted={Platform.OS !== 'web'}
        infiniteScroll
        bottomOffset={-insets.bottom}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
})

export default App
