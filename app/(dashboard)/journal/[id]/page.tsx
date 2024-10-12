import Editor from '@/components/Editor'
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import React from 'react'

const getEntry = async (id) => {
  const user = await getUserByClerkId();
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    }
  });

  return entry;
}

export default async function EntryPage({ params}) {

  const entry = await getEntry(params.id);
  
  return (
    <div className='entry-page'>
      <Editor entry={entry} />
      
    </div>
  )
}
