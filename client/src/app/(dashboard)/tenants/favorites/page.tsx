
"use client";
import React from 'react'
import { 
  useGetAuthUserQuery, 
  useGetPropertiesQuery, 
  useGetTenantQuery 
} from '@/state/api'
import Loading from '@/components/Loading';
import Header from '@/components/Header';
import Card from '@/components/Card';

const Favorites = () => {
  const { data: authUser} = useGetAuthUserQuery();

  const {data: tenant} = useGetTenantQuery(
    authUser?.cognitoInfo?.userId || "",
    {
      skip: !authUser?.cognitoInfo?.userId,
    }
  );

  const {
    data: favoriteProperites,
    error,
    isLoading,
  } = useGetPropertiesQuery(
    { favoriteIds: tenant?.favorites?.map((fav: {id: number}) => fav.id)},
    {
      skip: !tenant?.favorites || tenant?.favorites?.length === 0,
    }
  )

  if(isLoading) return <Loading/>

  if(error) return <div>Error loading favorites</div>


  return (
    <div className='dashboard-container'>
      <Header
       title='Favorites Properites'
       subtitle='Browse and manage your favorite properties'
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {
          favoriteProperites?.map((property) => (
            <React.Fragment key={property.id}>
                <Card
                  property={property}
                  isFavorite={
                   true
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
        (!favoriteProperites || favoriteProperites?.length === 0) && (
          <p>You don&lsquo;t have any favorited properites</p>
        )
      }
    </div>
  )
}

export default Favorites
