import { useState, useContext, SyntheticEvent } from "react"

import { AppContext } from "../../context";
import { Types } from "../../reducers";


export default function ChatInput() {
    const { dispatch } = useContext(AppContext);
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
            dispatch({type: Types.Update, payload: {user: "user", content: userMessage}})
        }
    }

    return (
        <div className='chatInput'>
            <form method='POST' onSubmit={handleSubmit} id="chatInputForm">
                <input type="text" name='userMessage' id="userMessage" onChange={(e) => setUserMessage(e.target.value)} required/>
                <button type="submit" id="sendMessageBtn">Send</button>
            </form>
        </div>
    )
}