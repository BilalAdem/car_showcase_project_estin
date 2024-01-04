"use client";
import { useEffect, useState } from "react";
import NotificationCard from "./NotificationCard";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { carBrands } from "@/constants";

const Notification = (isSignedIn: boolean) => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useUser();
  const email = user?.emailAddresses[0].emailAddress;
  useEffect(() => {
    console.log(`email`, email);
    axios
      .get(`http://localhost:3000/api/notifications/`, {
        params: {
          email: email,
        },
      })
      .then((res) => {
        console.log(`notifications`, res.data);
        setNotifications(res.data.notifications);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isSignedIn]);
  console.log(`notifications`, notifications);
  const findCarByMake = (roomId: string) => {
    const firstHyphenIndex = roomId.indexOf("-");

    if (firstHyphenIndex !== -1) {
      const make = roomId.substring(0, firstHyphenIndex).trim().toLowerCase();
      console.log(`make`, make);

      const car = carBrands.find(
        (car) =>
          car.title.toLowerCase() === make ||
          make.includes(car.title.toLowerCase())
      );

      return car?.image as string;
    }

    return "";
  };

  return (
    <div className="notificaton-card_container">
      <div className="w-full flex justify-between items-start gap-2">
        <h2 className="text-[22px] leading-[26px] font-bold capitalize">
          Notifications
        </h2>
        <button className="text-[14px] font-semibold">Clear All</button>
      </div>
      <div>
        <div className="w-full flex flex-col justify-center items-start gap-4 mt-4">
          <h2 className="text-xl leading-[19px] font-bold">Today</h2>
        </div>
        <div>
          {notifications.map((notification: any) => (
            <NotificationCard
              key={notification.id}
              senderEmail={notification.senderEmail}
              message={notification.message}
              roomId={notification.roomId}
              time={notification.time}
              image={findCarByMake(notification.roomId)}
            />
          ))}
        </div>
      </div>
      {/* <div>
        <div className="w-full flex flex-col justify-center items-start gap-4 mt-4">
          <h2 className="text-xl leading-[19px] font-bold">Yesterday</h2>
        </div>
        <div>
          <NotificationCard />
          <NotificationCard />
        </div>
      </div> */}
    </div>
  );
};

export default Notification;
