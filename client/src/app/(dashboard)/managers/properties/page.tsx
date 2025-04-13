"use client"

import { useGetAuthUserQuery } from '@/state/api'
import React from 'react'

const Page = () => {

    const {data: authUser } = useGetAuthUserQuery()

    console.log("authUser ",authUser )
  return (
    <div>
      hii
    </div>
  )
}

export default Page
