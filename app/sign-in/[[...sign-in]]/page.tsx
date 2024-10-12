import { SignIn } from '@clerk/nextjs'
import '../../../stylesheets/style.css'


export default function SignIpPage() {
  return (
    <div className='signInBg'>
    <SignIn/>
    </div>
  )
}
