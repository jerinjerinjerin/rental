"use client";

import React from "react";
import {
  useAddFavoritePropertyMutation,
  useGetAuthUserQuery,
  useGetPropertiesQuery,
  useGetTenantQuery,
  useRemoveFavoritePropertyMutation,
} from "@/state/api";
import { useAppSelector } from "@/state/redux";
import { Property } from "@/types/prismaType";
import Card from "@/components/Card";
import CompactCard from "@/components/CompactCard";
const Listing = () => {
  const { data: authUser } = useGetAuthUserQuery();
  const { data: tenant } = useGetTenantQuery(
    authUser?.cognitoInfo?.userId || "",
    {
      skip: !authUser?.cognitoInfo?.userId,
    }
  );

  const [addFavorite] = useAddFavoritePropertyMutation();
  const [removeFavorite] = useRemoveFavoritePropertyMutation();

  const viewMode = useAppSelector((state) => state.global.viewMode);
  const filters = useAppSelector((state) => state.global.filters);

  const {
    data: properites,
    isLoading,
    isError,
  } = useGetPropertiesQuery(filters);

  const handleFavoriteToggle = async (propertyId: number) => {
    if (!authUser) return;

    const isFavorite = tenant?.favorites?.some(
      (fav: Property) => fav.id === propertyId
    );

    if (isFavorite) {
      await removeFavorite({
        cognitoId: authUser.cognitoInfo.userId,
        propertyId,
      });
    } else {
      await addFavorite({
        cognitoId: authUser.cognitoInfo.userId,
        propertyId,
      });
    }
  };

  if (isLoading) return <>Loading...</>;

  if (isError || !properites) {
    return <div>Faild to fetch properties</div>;
  }

  return (
    <div className="w-full">
      <h3 className="text-sm px-4 font-bold">
        {properites.length}{" "}
        <span className="text-gray-700 font-normal">
          Places in {filters.location}
        </span>
      </h3>
      <div className="flex">
        <div className="p-4 w-full">
          {properites?.map((property) =>
            viewMode === "grid" ? (
              <React.Fragment key={property.id}>
                <Card
                  property={property}
                  isFavorite={
                    tenant?.favorites?.some(
                      (fav: Property) => fav.id === property.id
                    ) || false
                  }
                  onFavoriteToggle={() => handleFavoriteToggle(property.id)}
                  showFavoriteButton={!!authUser}
                  propertyLink={`/search/${property.id}`}
                />
              </React.Fragment>
            ) : (
              <React.Fragment key={property.id}>
                <CompactCard
                  property={property}
                  isFavorite={
                    tenant?.favorites?.some(
                      (fav: Property) => fav.id === property.id
                    ) || false
                  }
                  onFavoriteToggle={() => handleFavoriteToggle(property.id)}
                  showFavoriteButton={!!authUser}
                  propertyLink={`/search/${property.id}`}
                />
              </React.Fragment>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Listing;
