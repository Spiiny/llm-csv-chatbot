import React, { useState } from 'react'

export default function App() {

  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {

    if(question.trim() === ''){
      return
    }

    const userMessage = {
      role: "user",
      text: question
    }

    setMessages((prev) => [...prev, userMessage])

    const currentQuestion = question

    setQuestion('')

    try {

      setLoading(true)

      const response = await fetch(
        `https://llm-csv-chatbot.onrender.com/chat?question=${encodeURIComponent(currentQuestion)}`
      )

      const data = await response.json()

      const aiMessage = {
        role: "assistant",
        text: data.answer
      }

      setMessages((prev) => [...prev, aiMessage])

    } catch(error) {

      console.log(error)

      const errorMessage = {
        role: "assistant",
        text: "Something went wrong"
      }

      setMessages((prev) => [...prev, errorMessage])

    } finally {

      setLoading(false)

    }
  }

  return (

    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-[800px] h-[90vh] bg-zinc-900 rounded-2xl border border-zinc-700 flex flex-col overflow-hidden">
        <div className="p-5 border-b border-zinc-700">
          <h1 className="text-3xl font-bold">
            AI Jewellery Chatbot
          </h1>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                  message.role === "user"
                    ? "bg-white text-black"
                    : "bg-zinc-800 text-white"
                }`}
              >

                <p className="whitespace-pre-wrap">
                  {message.text}
                </p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-zinc-800 px-4 py-3 rounded-2xl">
                Thinking...
              </div>
            </div>
          )}
        </div>

        <div className="p-5 border-t border-zinc-700 flex gap-3">
          <input
            type="text"
            placeholder="Ask about jewellery products..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if(e.key === "Enter"){
                handleSubmit()
              }
            }}
            className="flex-1 bg-black border border-zinc-600 px-4 py-3 rounded-xl outline-none"
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
