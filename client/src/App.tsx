import { useEffect, useState } from 'react'

import { fetchEventSource } from '@microsoft/fetch-event-source';
import type { ChatMessageType } from './types';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';

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
      <div className="chatWindow" style={{ height: '90vh', overflowY: 'auto', paddingRight: '0.5rem' }}>
        {messageHistory.map((message, idx) => {
          return <ChatMessage key={idx} user={message.user} content={message.content} />
        })}
        <ChatMessage user="system" content={aiResponse} />
      </div>
      <ChatInput setMessageHistory={setMessageHistory}/>
    </main>
  )
}

export default App
