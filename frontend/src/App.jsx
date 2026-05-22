import React, { useState } from 'react'

export default function App() {

  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([])
  const [followUps, setFollowUps] = useState([])
  const [loading, setLoading] = useState(false)

  async function askQuestion(q) {

    if(q.trim() === ''){
      return
    }

    const userMessage = {
      role: "user",
      text: q
    }

    setMessages((prev) => [...prev, userMessage])

    try {
      setLoading(true)
      const response = await fetch(
        `https://llm-csv-chatbot.onrender.com/chat?question=${encodeURIComponent(q)}`
      )
      const data = await response.json()
      const aiMessage = {
        role: "assistant",
        text: data.answer
      }
      setMessages((prev) => [...prev, aiMessage])
      setFollowUps(data.follow_ups || [])
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

  async function handleSubmit() {
    await askQuestion(question)
    setQuestion('')
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
        {followUps.length > 0 && (
          <div className="px-5 pb-3 flex flex-wrap gap-2">
            {followUps.map((item, index) => (
              <button
                key={index}
                onClick={() => askQuestion(item)}
                className="bg-zinc-800 hover:bg-zinc-700 px-3 py-2 rounded-full text-sm"
              >
                {item}
              </button>
            ))}
          </div>
        )}

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
            {loading ? "Loading..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  )
}
