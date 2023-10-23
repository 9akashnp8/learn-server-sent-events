from fastapi import FastAPI
from sse_starlette import EventSourceResponse

app = FastAPI()


async def aread_file(file_name: str):
    with open(file_name, "r") as f:
        while True:
            c = f.read(1)
            if not c:
                f.close()
                break
            yield c

@app.get("/stream")
def get_stream():

    return EventSourceResponse(
        content=aread_file("sample.txt")
    )
