import { UserButton } from '@clerk/nextjs';
import '../../stylesheets/style.css'
import Link from 'next/link';


export default function Dashboardlayout( { children } ) {
  return (
    <div className='dashboardLayout'>
        <aside className="sidebar">
            <h2>Mood</h2>
            <Link href='/' className='links' >Home</Link>
            <Link href='/journal'  className='links'>Journal</Link>
            <Link href='/history'  className='links'>History</Link>
        </aside>
        <div className='w-full'>
        <header className="header">
            
            <UserButton />
        </header>
        <div className="main h-[calc(100vh-60px)]">
            {children}
        </div>
        </div>
    </div>
  )
}
