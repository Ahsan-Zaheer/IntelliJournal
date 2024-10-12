'use client'

import { updateEntry } from '@/utils/api';
import { useState, useEffect } from 'react';
import gif from '../assets/loading.gif';
import Image from 'next/image';

export default function Editor({ entry }) {
  const [content, setContent] = useState(entry.content === "Default Entry" ? '' : entry.content || '');
  const [isLoading, setIsLoading] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState(null);

  const [analysis, setAnalysis] = useState(entry?.analysis || {});
  const { mood, summary, color, subject, negative } = analysis;
  const analysisEntries = [
    { name: 'Summary', value: summary },
    { name: 'Subject', value: subject },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: negative ? 'Yes' : 'No' },
  ];

  // Function to save content (manual or autosave)
  const saveContent = async () => {
    if (!content) return;

    setIsLoading(true);
    const update = await updateEntry(entry.id, content);
    setAnalysis(update.analysis);
    setLastSaveTime(new Date()); // Track the last save time
    setIsLoading(false);
  };

  // Handle manual save on Ctrl+S or Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || (e.ctrlKey && e.key === 's')) {
      e.preventDefault();
      saveContent(); // Save content on Enter or Ctrl+S
    }
  };


  return (
    <>
      <div className='w-full h-full'>
        {isLoading && (
          <div className='save'>
            Saving...{' '}
            <Image src={gif} className='me-5 w-12' alt='saving icon' />
          </div>
        )}
        <div className='mt-1'></div>
        <textarea
          className='w-full h-4/5 p-8 text-xl max-[600px]:text-lg outline-none'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='Start Writing Your Journal Entry...' // Detect key presses for manual save
          
        />
      </div>
      <div className='sidebar-right'>
        <h2 className='sidebar-title' style={{ backgroundColor: color }}>
          Analysis
        </h2>
        <div className='sidebar-content'>
          <ul>
            {analysisEntries.map((entry, index) => (
              <li key={index}>
                <span className='font-bold me-5'>{entry.name}</span>
                <span className='w-full text-right'>{entry.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
