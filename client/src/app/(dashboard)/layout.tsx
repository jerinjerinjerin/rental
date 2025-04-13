"use client";
import React from 'react'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/AppSidebar'
import { NAVBAR_HEIGHT } from '@/lib/constants'
import {  SidebarProvider } from '@/components/ui/sidebar'
import { useGetAuthUserQuery } from '@/state/api';
import { usePathname, useRouter } from 'next/navigation';

interface Props{
  children: React.ReactNode
}

const DashboardLayout:React.FC<Props> = ({children}) => {
 const { data: authUser, isLoading: authLoading } = useGetAuthUserQuery();

 const router = useRouter();

 const pathName = usePathname()

 const [isLoading, setIsLoading] = React.useState(true);

 React.useEffect(() => {
    if(authUser){
      const userRole = authUser.userRole?.toLowerCase();

      if(userRole === "manager" && pathName.startsWith("/tenants")
        || userRole === "tenant" && pathName.startsWith("/managers")){
      router.push(
        userRole === "manager" ? "/managers/properties" : "/tenants/favorites",
        {scroll: false}
      )
      } else {
        setIsLoading(false);
      }
    }
 }, [authUser, pathName, router]);

 if(authLoading || isLoading) return <>Loading...</>

 if(!authUser?.userRole) return null;

  return (
    <SidebarProvider>

      <div className='min-h-screen w-full bg-primary-100'>
        <Navbar/>
        <div style={{paddingTop: `${NAVBAR_HEIGHT}px`}}>
          <main className="flex">
            <Sidebar userType={authUser?.userRole.toLowerCase()}/>
            <div className="flex-grow transition-all duration-300">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default DashboardLayout
