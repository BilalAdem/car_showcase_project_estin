"use client";
import { useState } from "react";
import Image from "next/image";
import { CarCardProps } from "@/types";
import { CardDetails, CustomButton } from ".";
import { calculateCarRent, generateCarsImageUrl } from "@/utils";
import { heart } from "@/assests";

const CarCard = ({ car }: CarCardProps) => {
  const { city_mpg, year, make, model, transmission, drive } = car;
  const carRent = calculateCarRent(city_mpg, year);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
        <div className="cursor-pointer">
          <Image
            src={heart}
            width={25}
            height={25}
            alt="heart"
            className="object-contain"
          />
        </div>
      </div>
      <p className="flex mt-6 text-[32px] font-extra-bold">
        <span className="self-start text-[14px] font-semibold">$</span>
        {carRent}
        <span className="self-end text-[14px] font-medium">/day</span>
      </p>
      <div className="relative w-full h-[200px] my-3 object-contain">
        <Image
          src={generateCarsImageUrl(car)}
          layout="fill"
          objectFit="contain"
          alt="car"
          priority
        />
      </div>
      <div className="relative w-full flex mt-2">
        <div className="flex group-hover:invisible w-full justify-between text-gray">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/steering-wheel.svg"
              width={20}
              height={20}
              alt="steering-wheel"
            />
            <p className="text-[14px] font-medium">
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/tire.svg"
              width={20}
              height={20}
              alt="steering-wheel"
            />
            <p className="text-[14px] font-medium">{drive.toUpperCase()}</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Image src="/gas.svg" width={20} height={20} alt="steering-wheel" />
            <p className="text-[14px] font-medium">{city_mpg} MPG</p>
          </div>
        </div>
        <div className="car-card__btn-container">
          <CustomButton
            title="View More"
            containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
            textStyles="text-white font-medium text-[14px] leading-[17px]"
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>
      <CardDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        car={car}
      />
    </div>
  );
};

export default CarCard;
