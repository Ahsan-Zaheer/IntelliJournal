import Link from 'next/link';
import'../stylesheets/style.css';          
import { auth } from '@clerk/nextjs/server';

export default async function Home() {

  const {userId} = await auth();
  const href = userId ? '/journal' : '/new-user';

  return (
    <div className="home">
      <div className='sec-1'>
      <h1 className='title'>IntelliJournal</h1>
      <p className='disc'>This is the best app for tracking your mood through out your life. All you have to do is be honest.</p>
      <Link href={href} className='btn-bg'>
        <button className='btn'>Get Started</button>
      </Link>

      </div>
    </div>
  );
}
