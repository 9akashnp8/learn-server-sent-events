import asyncio
from fastapi import FastAPI
from sse_starlette import EventSourceResponse
from fastapi.middleware.cors import CORSMiddleware

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


async def aread_file(file_name: str):
    with open(file_name, "r") as f:
        while True:
            c = f.read(1)

            if not c:
                f.close()
                break

            yield c
            await asyncio.sleep(0.1)

@app.get("/stream")
def get_stream():

    return EventSourceResponse(
        content=aread_file("sample.txt")
    )
