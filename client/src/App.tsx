import { SyntheticEvent, useEffect, useState } from 'react'

import ChatMessage from './components/ChatMessage';

type ChatMessage = {
  user: string,
  content: string
}

function App() {
  const [ aiResponse, setAiResponse ] = useState("");
  const [ userMessage, setUserMessage ] = useState("");
  const [ messageHistory, setMessageHistory] = useState<ChatMessage[]>([])

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault()
    
    const result = await fetch('http://127.0.0.1:8000/stream', {
      method: 'POST',
      headers: {
        'Accept': 'text',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({message: userMessage})
    })
    if (result.ok) {
      setMessageHistory([...messageHistory, {user: "user", content: userMessage} ])
    }
  }

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
      <div className='chatInput'>
        <form method='POST' onSubmit={handleSubmit}>
          <input type="text" name='userMessage' onChange={(e) => setUserMessage(e.target.value)} />
          <button>Send</button>
        </form>
      </div>
    </main>
  )
}

export default App
