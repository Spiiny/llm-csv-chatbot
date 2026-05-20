# AI Jewellery Chatbot

An AI-powered chatbot that answers jewellery/product-related queries using LLMs and structured CSV data.

Built with:
- React
- FastAPI
- OpenRouter/OpenAI
- Pandas
- Tailwind CSS

---

# Features

- AI chatbot interface
- React frontend
- FastAPI backend
- CSV-based product database
- LLM-powered responses
- Real-time API communication
- Clean UI using Tailwind CSS

---

# Tech Stack

## Frontend
- React
- Vite
- Tailwind CSS

## Backend
- FastAPI
- Python
- Pandas

## AI
- OpenRouter / OpenAI API

---

# Project Structure

```bash
ai-jewellery-chatbot/
│
├── backend/
│   ├── main.py
│   ├── products.csv
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── .gitignore
└── README.md
```

---

# Setup Instructions

## 1. Clone Repository

```bash
git clone <your-repo-url>
cd ai-jewellery-chatbot
```

---

# Backend Setup

## 1. Navigate to backend

```bash
cd backend
```

## 2. Create virtual environment

```bash
python3 -m venv venv
```

## 3. Activate virtual environment

### Linux/Mac

```bash
source venv/bin/activate
```

### Windows

```bash
venv\Scripts\activate
```

---

## 4. Install dependencies

```bash
pip install fastapi uvicorn pandas python-dotenv openai
```

---

## 5. Create `.env`

```env
OPENROUTER_API_KEY=your_api_key_here
```

---

## 6. Run backend

```bash
uvicorn main:app --reload
```

Backend runs on:

```text
http://127.0.0.1:8000
```

---

# Frontend Setup

## 1. Navigate to frontend

```bash
cd frontend
```

## 2. Install dependencies

```bash
npm install
```

---

## 3. Run frontend

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# API Endpoint

## Chat Endpoint

```http
GET /chat?question=your_question
```

Example:

```http
http://127.0.0.1:8000/chat?question=Which products contain diamond?
```

---

# Future Improvements

- RAG implementation
- Vector database integration
- Chat history
- Authentication
- PDF parsing pipeline
- Streaming responses
- Better UI/UX
- Deployment

---
