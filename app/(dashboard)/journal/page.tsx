import EntryCard from '@/components/EntryCard';
import NewCardEntry from '@/components/NewCardEntry';
import Question from '@/components/Question';
import {getUserByClerkId} from '@/utils/auth';
import { prisma } from "@/utils/db";
import Link from 'next/link';



const getEntries = async () => {
    const user = getUserByClerkId();
    const entries = await prisma.journalEntry.findMany({
        where: {
            userId: (await user).id,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });


  
    
    
    

    return entries;

}

export default async function Journal() {

  const entries = await getEntries();
    
  return (
    <>
    <h1 className='text-5xl font-semiBold  py-4 ps-10'>Journal</h1>
    <Question/>

    <div className='grid grid-cols-3 gap-4 p-10'>
        <NewCardEntry />
        {entries.map(entry => (
            <Link href={`/journal/${entry.id}`} key={entry.id}>
                <EntryCard key={entry.id} entry={entry}/>
            </Link>
        ))}

    </div>
    </>
  )
}
