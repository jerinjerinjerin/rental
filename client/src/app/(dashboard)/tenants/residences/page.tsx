
"use client";
import React from 'react'
import { 
  useGetAuthUserQuery, 
  useGetCurrentResidencsQuery, 
  useGetTenantQuery 
} from '@/state/api'
import Loading from '@/components/Loading';
import Header from '@/components/Header';
import Card from '@/components/Card';

const Residences = () => {
  const { data: authUser} = useGetAuthUserQuery();

  const {data: tenant} = useGetTenantQuery(
    authUser?.cognitoInfo?.userId || "",
    {
      skip: !authUser?.cognitoInfo?.userId,
    }
  );

  const {
    data: currentResidences,
    error,
    isLoading,
  } = useGetCurrentResidencsQuery(
    authUser?.cognitoInfo?.userId || "",
    {
      skip: !authUser?.cognitoInfo?.userId,
    }
  )

  if(isLoading) return <Loading/>

  if(error) return <div>Error loading current residences</div>


  return (
    <div className='dashboard-container'>
      <Header
       title='Current Residences'
       subtitle='View and manage your living spaces'
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {
          currentResidences?.map((property) => (
            <React.Fragment key={property.id}>
                <Card
                  property={property}
                  isFavorite={
                   tenant?.favorites?.includes(property.id) || false
                  }
                  onFavoriteToggle={() => {}}
                  showFavoriteButton={false}
                  propertyLink={`/tenants/residences/${property.id}`}
                />
              </React.Fragment>
          ))
        }
      </div>
      {
        (!currentResidences || currentResidences?.length === 0) && (
          <p>You don&lsquo;t have any current residences</p>
        )
      }
    </div>
  )
}

export default Residences
