import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NotificationCard = ({
  senderEmail,
  message,
  roomId,
  time,
  image,
}: {
  senderEmail: string;
  message: string;
  roomId: string;
  time: string;
  image: string;
}) => {
  console.log(`roomId`, roomId);
  console.log(`image`, image);
  const router = useRouter();
  const extractPathname = (roomId: string): string => {
    const [, make, model, year] =
      roomId.match(/(\w+)-(\w+)-(\d+)-\w+@estin.dz-\w+@gmail.com/) || [];

    if (make && model && year) {
      return `/car/${make}/${model}/${year}`;
    } else {
      throw new Error("Invalid roomId format");
    }
  };
  const handleNavigation = () => {
    router.push(`${extractPathname(roomId)}?roomId=${roomId}`);
  };

  const hadndleMarkedAsRead = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/notifications/${roomId}`
      );
      console.log(`response`, response);
    } catch (error) {
      console.log(`error`, error);
    }
  };

  return (
    <div className="notification-card_container">
      <div className="w-full flex flex-row justify-between items-center gap-4 mt-4 bg-primary-blue-100 p-2 rounded-2xl">
        <div className="car-brand-card">
          <Image src={image} alt="car" width={100} height={100} />
        </div>
        <div className="w-11/12">
          <h3 className="text-[16px] leading-[19px] font-bold">
            You've recieved a message from {senderEmail} at {time}
          </h3>
          <p className="text-[14px] leading-[17px] font-medium">{message}</p>
          <div className="flex flex-row justify-between items-center">
            <button
              className=" text-[14px] font-semibold border border-solid rounded-full py-1 px-2 mt-2 mb-2"
              style={{ borderColor: "#333" }}
              onClick={handleNavigation}
            >
              View Message
            </button>
            <button
              className=" text-[14px] font-semibold border border-solid rounded-full py-1 px-2 mt-2 mb-2"
              onClick={hadndleMarkedAsRead}
            >
              marke as read
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
