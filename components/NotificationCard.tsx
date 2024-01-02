import { mercedes } from "@/assests";
import Image from "next/image";
import React from "react";

const NotificationCard = () => {
  return (
    <div className="notification-card_container">
      <div className="w-full flex flex-row justify-between items-center gap-4 mt-4 bg-primary-blue-100 p-2 rounded-2xl">
        <div className="car-brand-card">
          <Image src={mercedes} alt="mercedes" width={60} height={60} />
        </div>
        <div className="w-11/12">
          <h3 className="text-[16px] leading-[19px] font-bold">
            Your offer has been accepted!
          </h3>
          <p className="text-[14px] leading-[17px] font-medium">
            Congrats! your offer has been accepted by the seller for $170,000{" "}
          </p>
          <button
            className=" text-[14px] font-semibold border border-solid rounded-full py-1 px-2 mt-2 mb-2"
            style={{ borderColor: "#333" }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
