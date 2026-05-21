from fastapi import FastAPI
import pandas as pd
from openai import OpenAI
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
    
client = OpenAI(
    api_key=os.getenv("API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

df = pd.read_csv("products.csv")
@app.get("/")
def home():
    return {
        "message": "Welcome"
    }


@app.get("/products")
def products():
    return df.to_dict(orient="records")


@app.get("/chat")
def chat(question: str):
    products = df.to_dict(orient="records")

    prompt = f"""
    You are an AI jewellery assistant.
    You must answer questions ONLY using the provided jewellery database.
    Jewellery Database:
    {products}
    User Question:
    {question}
    Rules:
    - Answer only from the database.
    - Do not make up products or information.
    - If the answer is not available in the database, reply:
    "I could not find that information in the jewellery database."
    - Keep responses short, clear, and professional.
    - Mention product names when relevant.
    - Dont give as table and give as information
    """

    response = client.chat.completions.create(
        model="openai/gpt-oss-120b:free",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )
    return {
        "answer": response.choices[0].message.content
    }
