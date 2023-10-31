import { useEffect, useState } from 'react'

import type { ChatMessageType } from './types';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';

function App() {
  const [ aiResponse, setAiResponse ] = useState("");
  const [ messageHistory, setMessageHistory] = useState<ChatMessageType[]>([])

  useEffect(() => {
    const evntSource = new EventSource("http://127.0.0.1:8000/stream", {
      withCredentials: true,
    })

    let accumMessage = "";

    evntSource.addEventListener("message", (event) => {
      accumMessage += event.data
      setAiResponse(accumMessage)
    })

    evntSource.addEventListener("end", (_) => {
      setMessageHistory([...messageHistory, {user: "system", content: aiResponse}])
    })

    evntSource.addEventListener("error", (_) => {
      evntSource.close()
    })

    return () => evntSource.close()
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
