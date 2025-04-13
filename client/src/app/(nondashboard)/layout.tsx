"use client"

import React from 'react'
import { NAVBAR_HEIGHT } from '@/lib/constants'
import Navbar from '@/components/Navbar';
import { useGetAuthUserQuery } from '@/state/api';
import { usePathname, useRouter } from 'next/navigation';

interface Props{
    children: React.ReactNode;
}
const Layout: React.FC<Props> = ({children}) => {

  const { data: authUser, isLoading: authLoading } = useGetAuthUserQuery();

  console.log('authUser', authUser)

  const router = useRouter();
  
   const pathName = usePathname()
  
   const [isLoading, setIsLoading] = React.useState(true);
  
   React.useEffect(() => {
      if(authUser){
        const userRole = authUser.userRole?.toLowerCase();
  
        if(userRole === "manager" && pathName.startsWith("/search")
          || userRole === "manager" && pathName.startsWith("/")){
        router.push(
          '/managers/properties',
          {scroll: false}
        )
        } else {
          setIsLoading(false);
        }
      }
   }, [authUser, pathName, router]);
  
   if(authLoading || isLoading) return <>Loading...</>

  return (
    <div className='h-full w-full'>
        <Navbar/>

        <main className={`h-full flex w-full flex-col `}
         style={{paddingTop: `${NAVBAR_HEIGHT}px`}}
        >
         {children}
        </main>

    </div>
  )
}

export default Layout