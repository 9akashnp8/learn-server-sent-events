import asyncio
from fastapi import FastAPI
from fastapi.responses import Response
from sse_starlette import EventSourceResponse, ServerSentEvent
from fastapi.middleware.cors import CORSMiddleware

from models import UserMessage

app = FastAPI()
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

streamable_str = ""


async def mock_async_generator():
    global streamable_str
    end = len(streamable_str)
    for idx, c in enumerate(streamable_str):
        if idx == end - 1:
            yield ServerSentEvent(data=c, event="end")
            break
        yield ServerSentEvent(data=c, event="message")
        await asyncio.sleep(0.05)
    streamable_str = ""
    


@app.get("/stream")
def get_stream():
    if streamable_str:
        return EventSourceResponse(content=mock_async_generator())
    return EventSourceResponse(content=iter(()))


@app.post("/stream")
def post_user_message(payload: UserMessage):
    global streamable_str
    streamable_str = payload.message + " "
    return Response("success")
