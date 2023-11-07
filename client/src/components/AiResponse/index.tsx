import { useState, useEffect, useContext, useRef } from "react"

import { AppContext } from "../../context"
import { Types } from "../../reducers"
import ChatMessage from "../ChatMessage"

export default function AiResponse() {
    const { dispatch } = useContext(AppContext);
    const [ response, setResponse ] = useState("")

    useEffect(() => {
        const evntSource = new EventSource("http://127.0.0.1:8000/stream", {
            withCredentials: true,
        })

        let accumMessage = "";
        let mostRecentMessage = "";

        evntSource.addEventListener("message", (event) => {
            accumMessage += event.data
            mostRecentMessage = accumMessage
            setResponse(mostRecentMessage)
        })

        evntSource.addEventListener("end", (_) => {
            dispatch({ type: Types.Update, payload: {user: "system", content: mostRecentMessage}})
            setResponse("")
            mostRecentMessage = ""
        })

    }, [])

    return (
        <ChatMessage user="system" content={response} />
    )
}