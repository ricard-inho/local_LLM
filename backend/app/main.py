from typing import Union
from mlx_lm import load, generate

from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware

import asyncio

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",  
    "http://10.217.13.186:3000/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

print("[INFO]: Loading model")
model, tokenizer = load("r3m3c3/Meta-Llama-3-8B-Instruct-4bit")

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


@app.get("/bot-response/{user_message}")
def get_bot_response(user_message: str):
    response = generate(
        model, 
        tokenizer, 
        prompt=user_message,
        max_tokens=100,
        temp=0.,
        verbose=False,
    )
    return {"bot_response": response}


