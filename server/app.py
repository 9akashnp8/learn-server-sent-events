import asyncio
from fastapi import FastAPI
from fastapi.responses import Response
from sse_starlette import EventSourceResponse, ServerSentEvent
from fastapi.middleware.cors import CORSMiddleware

from models import UserMessage

app = FastAPI()
origins = [
    "http://localhost:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

queue = []


async def aread_file(file_name: str):
    with open(file_name, "r") as f:
        while True:
            c = f.read(1)

            if not c:
                yield ServerSentEvent(data="", event="end")
                f.close()
                break

            yield ServerSentEvent(data=c, event="message")
            await asyncio.sleep(0.05)


@app.get("/stream")
def get_stream():
    if queue:
        query = queue.pop()
        return EventSourceResponse(content=aread_file("sample.txt"))
    return EventSourceResponse(content=iter(()))


@app.post("/stream")
def post_user_message(payload: UserMessage):
    queue.append(payload.model_dump())
    return Response("success")
