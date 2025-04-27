"use client"

import SettingsForm from '@/components/SettingsForm';
import { useGetAuthUserQuery, useUpdateManagerSettingsMutation } from '@/state/api'
import React from 'react'

const ManagerSettings: React.FC = () => {

    const {data: authUser, isLoading } = useGetAuthUserQuery();

    const [updateManager] = useUpdateManagerSettingsMutation()

    if(isLoading) return <div>Loading...</div>


    const initalData = {
      name: authUser?.userInfo?.name,
      email: authUser?.userInfo?.email,
      phoneNumber: authUser?.userInfo?.phoneNumber,
    }

    const handleSubmit = async (data: typeof initalData) => {
        await updateManager({
          cognitoId: authUser?.userInfo.cognitoId,
          ...data,
        })
    }

  return (
    <div>
       <SettingsForm
          initalData={initalData}
          onSubmit={handleSubmit}
          userType='manager'
       />
    </div>
  )
}

export default ManagerSettings
