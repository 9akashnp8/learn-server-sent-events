import { useState, useEffect, useContext } from "react"
import { fetchEventSource } from '@microsoft/fetch-event-source';

import { Types } from "../../reducers"
import { AppContext } from "../../context"
import ChatMessage from "../ChatMessage"

type eventSourceCallbackHandler = (data: string, event: string) => void

function eventSourceWrapper(cb: eventSourceCallbackHandler) {
  fetchEventSource('http://localhost:8000/stream', {
    onmessage(ev) {
      cb(ev.data, ev.event)
    },
  })
}

export default function AiResponse() {
    const { state, dispatch } = useContext(AppContext);
    const [ response, setResponse ] = useState("")

    useEffect(() => {
        let msg = ''
        eventSourceWrapper((data, eventType) => {
        if (eventType == 'end') {
            const payload = { user: "system", content: msg }
            dispatch({type: Types.Update, payload })
            setResponse("")
        } else {
            msg += data
            setResponse(msg)
        }
        })
    }, [state.messages])

    return (
        <ChatMessage user="system" content={response} />
    )
}