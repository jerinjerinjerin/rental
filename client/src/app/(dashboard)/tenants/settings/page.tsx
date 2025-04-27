"use client"

import SettingsForm from '@/components/SettingsForm';
import { useGetAuthUserQuery, useUpdateTenantSettingsMutation, } from '@/state/api'
import React from 'react'

const TenantSettings: React.FC = () => {

    const {data: authUser, isLoading } = useGetAuthUserQuery();

    const [updateTenant] = useUpdateTenantSettingsMutation();

    if(isLoading) return <div>Loading...</div>


    const initalData = {
      name: authUser?.userInfo.name,
      email: authUser?.userInfo.email,
      phoneNumber: authUser?.userInfo.phoneNumber,
    }

    const handleSubmit = async (data: typeof initalData) => {
        await updateTenant({
          cognitoId: authUser?.userInfo.cognitoId,
          ...data,
        })
    }

  return (
    <div>
       <SettingsForm
          initalData={initalData}
          onSubmit={handleSubmit}
          userType='tenant'
       />
    </div>
  )
}

export default TenantSettings
