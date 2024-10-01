'use client'
import { askQuestion } from '@/utils/api';
import React, { useState } from 'react'

export default function Question() {
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState();
    const handleOnchange = (e) => {
        setValue(e.target.value);
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        const answer = await askQuestion(value);
        setResponse(answer);
        setValue('');
        setLoading(false);


    }
  return (
    <>
    <div className="my-4 ms-10">
      <form onSubmit={handleOnSubmit}>
        <input type="text" name="ques" id="ques" className="question" value={value} onChange={handleOnchange} disabled={loading}/>
        <button className="bg-teal-400 py-2 px-4 rounded-lg ms-3" disabled={loading}  >Ask</button>
      </form>
    </div>
    <div className="ms-10">
        {loading && <p>Loading...</p>}
        {response && <p>{response}</p>}
      </div>
    </>
  )
}
