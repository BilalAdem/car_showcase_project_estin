"use client";
import { useEffect, useState } from "react";
import NotificationCard from "./NotificationCard";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useUser();
  const email = user?.emailAddresses[0].emailAddress;
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/notifications/`, {
        params: {
          email: email,
        },
      })
      .then((res) => {
        setNotifications(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
          <NotificationCard />
          <NotificationCard />
        </div>
      </div>
      <div>
        <div className="w-full flex flex-col justify-center items-start gap-4 mt-4">
          <h2 className="text-xl leading-[19px] font-bold">Yesterday</h2>
        </div>
        <div>
          <NotificationCard />
          <NotificationCard />
        </div>
      </div>
    </div>
  );
};

export default Notification;
