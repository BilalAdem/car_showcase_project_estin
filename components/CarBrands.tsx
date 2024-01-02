"use client";
import { carBrands } from "@/constants";
import { fetchCars } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CarBrands = () => {
  const router = useRouter();

  const updateSearchParams = (manufacturer: string) => {
    const searchParms = new URLSearchParams(window.location.search);
    if (manufacturer) {
      searchParms.set("manufacturer", manufacturer);
    } else {
      searchParms.delete("manufacturer");
    }
    const newPathName = `${window.location.pathname}?${searchParms.toString()}`;
    router.push(newPathName, { scroll: false });
  };
  const fetchCarsByMake = async (e: any) => {
    const manufacturer = e.target.alt;
    // console.log(manufacturer)
    updateSearchParams(manufacturer.toLocaleLowerCase() || "");
  };
  return (
    <div className="flex flex-row flex-wrap justify-center gap-10 mt-10">
      {carBrands.map((carBrand) => (
        <div
          className="flex flex-col justify-evenly items-center cursor-pointer"
          key={carBrand.title}
          onClick={fetchCarsByMake}
        >
          <div className="car-brand-card">
            <Image
              src={carBrand.image}
              alt={carBrand.title}
              className="w-10 h-10 object-contain"
            />
          </div>
          <h3 className="text-center text-lg font-bold">{carBrand.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default CarBrands;
