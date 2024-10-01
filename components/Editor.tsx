'use client'

import { updateEntry } from '@/utils/api';
import { useState } from 'react';
import {useAutosave} from 'react-autosave'


export default function Editor({entry}) {
    const [content, setContent] = useState(entry?.content || '');
    const [isLoading , setIsLoading] = useState(false);
    useAutosave({
      data: content,
      onSave: async (_content) => {
        setIsLoading(true)
        const update = await updateEntry(entry.id, _content);
        setAnalysis(update.analysis)
        setIsLoading(false)
      }
    })

  const [analysis, setAnalysis] = useState(entry?.analysis || {});

  const {mood, summary, color, subject, negative} = analysis;
  const analysisEntries = [
    {name: 'Summary', value: summary},
    {name: 'Subject', value: subject},
    {name: 'Mood', value:  mood},
    {name: 'Negative', value: negative? 'Yes': 'No'},
  ]
  return (
    <>
    <div className='w-full h-full '>
      {isLoading && <div>...loading</div> }
        <textarea 
        className='w-full   p-8 text-xl outline-none'
        value={content}
        onChange={(e)=> setContent(e.target.value)}
        >


        </textarea>
    </div>
    <div className="sidebar-right" >
    <h2 className='sidebar-title'style={{backgroundColor: color}}>
      Analysis
    </h2>
    <div className="sidebar-content">
      <ul>
        {analysisEntries.map((entry, index) => (
          <li key={index}>
            <span className='font-bold me-24'>{entry.name}</span>
            <span className='ms-auto text-lg'>{entry.value}</span>
          </li>
        ))

        }
      </ul>
    </div>
  </div>
  </>
  )
}
