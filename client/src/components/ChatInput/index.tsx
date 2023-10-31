import { useState, SyntheticEvent } from "react"

import type { ChatMessageType } from "../../types";

type Props = {
    setMessageHistory: React.Dispatch<
        React.SetStateAction<ChatMessageType[]>
    >,
}

export default function ChatInput({ setMessageHistory }: Props) {
    const [ userMessage, setUserMessage ] = useState("");

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
          setMessageHistory((prevState) => [...prevState, {user: "user", content: userMessage}])
        }
    }

    return (
        <div className='chatInput'>
            <form method='POST' onSubmit={handleSubmit}>
                <input type="text" name='userMessage' onChange={(e) => setUserMessage(e.target.value)} />
                <button>Send</button>
            </form>
        </div>
    )
}