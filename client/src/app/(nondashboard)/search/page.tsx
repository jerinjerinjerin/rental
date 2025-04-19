
"use client";

import React from 'react'
import { useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { RootState, useAppSelector } from '@/state/redux';
import { NAVBAR_HEIGHT } from '@/lib/constants';
import FilterBar from './FilterBar';
import FiltersFul from './FiltersFul';
import { cleanParams } from '@/lib/utils';
import { setFilters } from '@/state';
import Map from './Map';
import Listing from './Listing';

const SearchPage: React.FC = () => {

    const searchParams = useSearchParams();

    const dispatch = useDispatch();

    const isFiltersFullOpen = useAppSelector(
        (state:RootState) => state.global.isFiltersFullOpen
    )

    React.useEffect(() => {
      const initialFilters = Array.from(searchParams.entries()).reduce(
        (acc: any, [key, value]) => {
          if (key === "priceRange" || key === "squareFeet") {
            acc[key] = value.split(",").map((v) => (v === "" ? null : Number(v)));
          } else if (key === "coordinates") {
            acc[key] = value.split(",").map(Number);
          } else {
            acc[key] = value === "any" ? null : value;
          }
  
          return acc;
        },
        {}
      );
  
      const cleanedFilters = cleanParams(initialFilters);
      dispatch(setFilters(cleanedFilters));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className="w-full mx-auto px-5 flex flex-col"
      style={{
        height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
      }}
    >
      <FilterBar />
      <div className="flex justify-between flex-1 overflow-hidden gap-3 mb-5">
        <div
          className={`h-full overflow-auto transition-all duration-300 ease-in-out ${
            isFiltersFullOpen
              ? "w-3/12 opacity-100 visible"
              : "w-0 opacity-0 invisible"
          }`}
        >
          <FiltersFul />
        </div>
        <Map />
        <div className="basis-4/12 overflow-y-auto">
          <Listing />
        </div>
      </div>
    </div>
  )
}

export default SearchPage
