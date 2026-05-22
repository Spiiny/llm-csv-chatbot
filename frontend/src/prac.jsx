import React,{useState} from 'react'

export default function prac() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState([]);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(){
        setLoading(true);
        const userMessage ={
            'role':'user',
            'content':question
        }
        setAnswer((prev)=>[...prev,userMessage])
        
        try{
            const response = await fetch(`https://llm-csv-chatbot.onrender.com/chat?question=${encodeURIComponent(question)}`)
            const data = await response.json();
            const aiMessage = {
                'role' : 'ai',
                'content' : data.answer
            }
            setAnswer((prev)=>[...prev,aiMessage])
        }catch(error){
            errorMessage ={
                'role' : 'ai',
                'content' : 'Something went wrong. Please try again later.'
            }
            setAnswer((prev)=>[...prev,errorMessage])
        }finally{
            setQuestion('');
            setLoading(false);
        }
    }
  return (
    <>
      <input type='text' placeholder='Ask your questions' value={question} onChange={(e)=>setQuestion(e.target.value)} />
      <button onClick={handleSubmit}>{loading ? 'Loading...' : 'Ask'}</button>
      <div>
        {answer.map((message,index)=>(
            <div key={index}>
                <strong>{message.role}:</strong> {message.content}
            </div>
        ))}
      </div>
    </>
  )
}
