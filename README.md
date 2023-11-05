# Server-Sent Events: Stream "events" from server to client

## About

This is a demo repo that uses [Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events), the specific use case being a Chat Application with Streaming Response from server. The repo contains implementations for Vannila js and React (WiP).

## Built with    

- **Javascript**: Using the [EventSource API](https://developer.mozilla.org/en-US/docs/Web/API/EventSource) to handle incoming message and display to the user.
- **FastAPI**: Takes user input and adds it to a queue, streams the same input back to user via [sse_starlette](https://github.com/sysid/sse-starlette) EventSourceResponse.


## Demo


### Vanilla
<video style="border-radius: 10px" src="docs/vanilla-js-demo.mp4" controls title="SSE Chat App Vanilla Js Demo"></video>


### React
*WiP*