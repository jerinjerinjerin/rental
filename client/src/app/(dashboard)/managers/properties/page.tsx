
"use client";
import React from 'react'
import { 
  useGetAuthUserQuery,
  useGetManagerPropertiesQuery, 
} from '@/state/api'
import Loading from '@/components/Loading';
import Header from '@/components/Header';
import Card from '@/components/Card';

const Properites = () => {
  const { data: authUser} = useGetAuthUserQuery();

  const { 
    data: managerProperites,
    isLoading,
    error
  } = useGetManagerPropertiesQuery(
    authUser?.cognitoInfo?.userId || "",
    {
      skip: !authUser?.cognitoInfo?.userId,
    }
  )



  if(isLoading) return <Loading/>

  if(error) return <div>Error loading manager properites</div>


  return (
    <div className='dashboard-container'>
      <Header
       title='My Properties'
       subtitle='View and manage your property listings'
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {
          managerProperites?.map((property) => (
            <React.Fragment key={property.id}>
                <Card
                  property={property}
                  isFavorite={
                   false
                  }
                  onFavoriteToggle={() => {}}
                  showFavoriteButton={false}
                  propertyLink={`/managers/properties/${property.id}`}
                />
              </React.Fragment>
          ))
        }
      </div>
      {
        (!managerProperites || managerProperites?.length === 0) && (
          <p>You don&lsquo;t manage any properites</p>
        )
      }
    </div>
  )
}

export default Properites
