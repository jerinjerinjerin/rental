"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useGetAuthUserQuery } from "@/state/api";
import ImagePreview from "./ImagePreview";
import PropertyOverview from "./PropertyOverview";
import PropertyDetials from "./PropertyDetials";
import PropertyLocation from "./PropertyLocation";
import ContactWidget from "./ContactWidget";
import ApplicationModel from "./ApplicationModel";

const SingleListing = () => {
  const { id } = useParams();

  const propertyId = Number(id);

  const { data: authUser } = useGetAuthUserQuery();

  const [isOpenModel, setIsOpenModel] = React.useState<boolean>(false);

  return (
    <div>
      <ImagePreview images={["/singlelisting-2.jpg", "/singlelisting-3.jpg"]} />

      <div className="flex flex-col md:flex-row justify-center gap-10 mx-10 md:w-2/3 md:mx-auto mt-16 mb-8">
       <div className="order-2 md:order-1">
          <PropertyOverview propertyId={propertyId}/>
          <PropertyDetials propertyId={propertyId}/>
          <PropertyLocation propertyId={propertyId}/>
       </div>
       <div className="order-1 md:order-2">
          <ContactWidget onOpenModal={() => setIsOpenModel(true)}/>
       </div>
      </div>

      {
        authUser && (
          <ApplicationModel
            isOpen={isOpenModel}
            onClose={() => setIsOpenModel(false)}
            propertyId={propertyId}
          />
        )
      }
    </div>
  );
};

export default SingleListing;
