from fastapi import FastAPI
import pandas as pd
from openai import OpenAI
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware
import json

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
    - Generate 3 relevant follow-up questions.
    - Follow-up questions must relate to the user's query.
    - Do NOT use markdown.
    - Return ONLY valid JSON.
    Example format:
    {{
    "answer": "Gold necklaces are available.",
    "follow_ups": [
        "Which necklace is cheapest?",
        "Are diamond necklaces available?",
        "Show necklaces under ₹1 lakh"
    ]
    }}

    The follow up questions should be designed to encourage the user to explore more products and features of the jewellery database, while also providing relevant them with useful information based on their initial query.
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
    response_text = response.choices[0].message.content
    data = json.loads(response_text)
    return data
