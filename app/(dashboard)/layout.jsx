import { UserButton } from '@clerk/nextjs';
import '../../stylesheets/style.css'
import Link from 'next/link';
import Question from '@/components/Question';
import logo from '../../assets/logo.png';
import Image from 'next/image';
import { FaHome, FaHistory} from "react-icons/fa";
import { IoIosJournal } from "react-icons/io";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { RiCloseLargeFill } from "react-icons/ri";







export default function Dashboardlayout( { children } ) {
  return (
    <div className='dashboardLayout'>
        <input type="checkbox" id="menu-toggle" className="hidden" />
        <div id="overlay" className="fixed inset-0 bg-black bg-opacity-50 z-50 hidden"></div>

        <aside className="sidebar transition-transform transform md:translate-x-0 
                      -translate-x-full md:block inset-y-0 bg-white">
            <Image src={logo} className='logo'/>
            <label htmlFor="menu-toggle" className="md:hidden cursor-pointer">
                <RiCloseLargeFill className="text-3xl closeIcoS hidden" id="close-icon" />
            </label>

            <Link href='/' className='links' ><FaHome className='me-3 text-3xl	'/>  Home</Link>
            <Link href='/journal'  className='links'><IoIosJournal className='me-3 text-3xl	'/> Journal</Link>
            <Link href='/history'  className='links'><FaHistory className='me-3 text-3xl	'/> History</Link>
        </aside>
        <div className='w-full'>
        <header className="header  w-[calc(100%-250px)] max-[767px]:w-full ms-auto">

        <label htmlFor="menu-toggle" className="md:hidden cursor-pointer">
            <HiOutlineMenuAlt1 className="text-3xl" />
          </label>


            <Question />
            
            <UserButton />
        </header>
        <div className="main h-[calc(100vh-60px)] w-[calc(100%-250px)] max-[767px]:w-full ms-auto">
            {children}
        </div>
        </div>
    </div>
  )
}
