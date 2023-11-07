import { useContext } from "react";

import { AppContext } from "../../context";
import ChatMessage from "../ChatMessage";
import AiResponse from "../AiResponse";

export default function ChatMessagesWindow() {
    const { state } = useContext(AppContext);

    return (
        <div className="chatWindow" style={{ height: '90vh', overflowY: 'auto', paddingRight: '0.5rem' }}>
            {state.messages.map((message, idx) => {
                return <ChatMessage key={idx} user={message.user} content={message.content} />
            })}
            <AiResponse />
        </div>
    )
}