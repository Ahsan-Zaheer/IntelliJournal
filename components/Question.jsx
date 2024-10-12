'use client'
import { askQuestion } from '@/utils/api';
import React, { useState, useEffect, useRef } from 'react';
import { CiSearch } from 'react-icons/ci';
import Typewriter from 'typewriter-effect'; 
import gif from '../assets/loading.gif';
import Image from 'next/image';

export default function Question() {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState();
  const dialogRef = useRef(null);

  const handleOnchange = (e) => {
    setValue(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(value);
    
    const answer = await askQuestion(value);
    setResponse(answer);
    setValue('');
    setLoading(false);
  };

  // Close the response when clicking outside of it
  const handleClickOutside = (e) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target)) {
      setResponse(null);  // Hide the response
    }
  };

  const handleClose = () => {
    setResponse(null);
  }

  useEffect(() => {
    // Add event listener to detect clicks outside the response
    document.addEventListener('mousedown', handleClickOutside);

    // Toggle body background class when response is active
    if (response) {
      document.body.classList.add('response-active');
    } else {
      document.body.classList.remove('response-active');
    }

    // Clean up event listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.classList.remove('response-active');
    };
  }, [response]);

  return (
    <>
      <div className="my-4">
        <form onSubmit={handleOnSubmit} className='quesForm'>
          <button className="ms-3" disabled={loading}>
            <CiSearch className="searchIco" />
          </button>
          <input
            type="text"
            name="ques"
            id="ques"
            className="ques"
            value={value}
            onChange={handleOnchange}
            disabled={loading}
            placeholder="Ask anything..."
          />
        {loading && <span className="ms-5"> <Image src={gif} className='gif'/> </span>}
        </form>
      </div>

      {response && (
        <div className="answer" ref={dialogRef}>
          <Typewriter 
          options={{
            delay: 30, 
          }}
        onInit={(typewriter) => { 
          typewriter.typeString(`${response}`) 
          .start(); 
            }} 
          /> 
          <button className='closeBtn' onClick={handleClose}>Close</button>
        </div>
      )}
    </>
  );
}
