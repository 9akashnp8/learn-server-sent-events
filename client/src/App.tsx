
import { useEffect, useState } from 'react';
import { fetchEventSource } from '@microsoft/fetch-event-source';

import type { ChatMessageType } from './types';
import ChatInput from './components/ChatInput';
import ChatMessagesWindow from './components/ChatMessagesWindow';

type eventSourceCallbackHandler = (data: string, event: string) => void

function eventSourceWrapper(cb: eventSourceCallbackHandler) {
  fetchEventSource('http://localhost:8000/stream', {
    onmessage(ev) {
      cb(ev.data, ev.event)
    },
  })
}

function App() {
  const [ aiResponse, setAiResponse ] = useState("");
  const [ messageHistory, setMessageHistory] = useState<ChatMessageType[]>([])

  useEffect(() => {
    let msg = ''
    eventSourceWrapper((data, eventType) => {
      if (eventType == 'end') {
        setMessageHistory([...messageHistory, {user: 'system', content: msg}])
        setAiResponse("")
      } else {
        msg += data
        setAiResponse(msg)
      }
    })
  }, [messageHistory])

  return (
    <main>
      <ChatMessagesWindow />
      <ChatInput/>
    </main>
  )
}

export default App
