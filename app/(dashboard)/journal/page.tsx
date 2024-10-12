import EntryCard from '@/components/EntryCard';
import NewCardEntry from '@/components/NewCardEntry';
import {getUserByClerkId} from '@/utils/auth';
import { prisma } from "@/utils/db";



const getEntries = async () => {
    const user = getUserByClerkId();
    const entries = await prisma.journalEntry.findMany({
        where: {
            userId: (await user).id,
        },
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            analysis: true,
        }
    });


  
    
    
    

    return entries;

}

export default async function Journal() {

  const entries = await getEntries();
    
  return (
    <>
    <h1 className='text-5xl font-semiBold  py-4 ps-10'>Journal</h1>

    <div className='grid grid-cols-3 max-[1000px]:grid-cols-2 max-[700px]:grid-cols-1 gap-4 p-10'>
        <NewCardEntry />
        {entries.map(entry => (
            
                <EntryCard key={entry.id} entry={entry}/>
        ))}

    </div>
    </>
  )
}
