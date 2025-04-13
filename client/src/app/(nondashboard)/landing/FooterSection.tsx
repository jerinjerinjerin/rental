import Link from 'next/link'
import React from 'react'

const FooterSection = () => {
  return (
    <footer
      className='border-t border-gray-200 py-20'
    >
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
           <div className="flex flex-col md:flex-row justify-between items-center">
             <div className="mb-4">
               <Link
                 href={'/'}
                 className='text-xl font-bold'
                 scroll={false}
               >
               RENTIFUL
               </Link>
             </div>
             <nav className="mb-4">
               <ul className='flex space-x-6'>
                 <li>
                    <Link href={'/about'}>
                     About Us
                    </Link>
                 </li>
               </ul>
              
               <ul className='flex space-x-6'>
                 <li>
                    <Link href={'/contact'}>
                     Contact Us
                    </Link>
                 </li>
               </ul>
               <ul className='flex space-x-6'>
                 <li>
                    <Link href={'/faq'}>
                     FAQ
                    </Link>
                 </li>
               </ul>
               <ul className='flex space-x-6'>
                 <li>
                    <Link href={'/trems'}>
                     Trems
                    </Link>
                 </li>
               </ul>
               <ul className='flex space-x-6'>
                 <li>
                    <Link href={'/privacy'}>
                     Privacy
                    </Link>
                 </li>
               </ul>
             </nav>
             <div className="">
                
             </div>
           </div>
        </div>
    </footer>
  )
}

export default FooterSection