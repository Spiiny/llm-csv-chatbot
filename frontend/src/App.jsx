import React from 'react'
import { useState } from 'react'

export default function App() {
  const [question,setQuestion] = useState('')
  const [result,setResult] = useState('')
   async function handleSubmit(){
    const response = await fetch(`http://127.0.0.1:8000/chat?question=${encodeURIComponent(question)}`)
    const data = await response.json()
    setResult(data.answer)
   }
  return (
    <>
    <h1>Chatbot</h1>
    <input type='text' placeholder='Ask me' value={question} onChange={(e)=>setQuestion(e.target.value)}/>
    <button onClick={handleSubmit}>Ask</button>
    <p>{result}</p>
    </>
  )
}
