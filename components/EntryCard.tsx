'use client'

import { deleteEntry } from '@/utils/api';
import React, {useState} from 'react';
import { IoTrashBinOutline } from "react-icons/io5";

import Link from 'next/link';




export default function EntryCard({entry}) {

  const [analysis, setAnalysis] = useState(entry?.analysis || {});
  const {mood, subject} = analysis;
  const [loading, setLoading] = useState(false);
  


  const handleDelete = async ()=>{
    setLoading(true); 
    await deleteEntry(entry.id);
    setLoading(false);
    window.location.reload();

  }

  const date = new Date(entry.createdAt).toDateString();
  return (
    <>
    <div className={`divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow entryCard ${
        loading ? 'loading' : ''
      }`}>
      <div className="px-4 py-5 sm:px-6 cardTop">
      <Link href={`/journal/${entry.id}`} key={entry.id}>
      {date} 
      </Link>

       <IoTrashBinOutline className='text-red-500	text-xl trash' onClick={handleDelete} />      </div>
    <Link href={`/journal/${entry.id}`} key={entry.id}>
      <div className="px-4 py-5 sm:p-6">Subject: <span className='ms-1'>{subject}</span></div>
      <div className="px-4 py-4 sm:px-6">Mood: <span className='ms-1'>{mood}</span></div>
    </Link>
    </div>
    </>
  )
}
