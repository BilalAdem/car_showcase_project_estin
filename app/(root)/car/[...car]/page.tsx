"use client";
import Image from "next/image";
import { generateCostumeCarsImageUrl } from "@/utils";
import { use, useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import { io } from "socket.io-client";
import styles from "@/components/page.module.css";
import "react-phone-input-2/lib/style.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "@/config/motion";
import { CustmomerService, leftArrow, socials } from "@/constants";
import ChatPage from "@/components/ChatBox";
import { carBrands } from "@/constants";

const page = ({ params }: { params: { car: string[] } }) => {
  const [make, model, year] = params.car.map(decodeURIComponent);
  const [loading, setLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  let roomId = "nnn";

  var socket: any;
  socket = io("http://localhost:3001");

  const handleJoin = () => {
    if (roomId !== "") {
      console.log(roomId, "roomId");
      socket.emit("join_room", roomId);
      setShowSpinner(true);
      // You can remove this setTimeout and add your own logic
      setTimeout(() => {
        setShowChat(true);
        setShowSpinner(false);
      }, 1000);
    } else {
      alert("no room id");
    }
  };
  const findCarByMake = (make: string) => {
    const lowerCaseMake = make.toLowerCase();
    const car = carBrands.find(
      (car) =>
        car.title.toLowerCase() === lowerCaseMake ||
        lowerCaseMake.includes(car.title.toLowerCase())
    );

    return car?.image;
  };
  const imageStore = findCarByMake(make);
  // console.log(imageStore, "imageStore");

  const EMAILJS_SERVICE_ID = "service_gyvmz7j";
  const EMAILJS_TEMPLATE_ID = "template_03nqoki";
  const EMAILJS_PUBLIC_KEY = "Mu9Y-vemtD1-V35p_";
  const { user } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // console.log(formData);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          to_name: "Attar Bilal",
          from_email: user?.emailAddresses[0].emailAddress,
          to_email: "billalademattar@gmail.com",
          customer_email: user?.emailAddresses[0].emailAddress,
          customer_phone: formData.phone,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          toast.success("Your message has been sent successfully!", {
            duration: 4000,
          });

          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          toast.error("Ahh, something went wrong. Please try again.", {
            duration: 4000,
          });
        }
      );
  };
  return (
    <AnimatePresence>
      <div className="hero" style={{ height: "100vh", marginBottom: "100px" }}>
        <Toaster />
        <motion.section
          className="flex-1 pt-36 padding-x -mt-10"
          {...slideAnimation("left")}
        >
          <div className="Contact-card h-[550px] w-[400px]">
            <motion.div {...headContainerAnimation}>
              {!showSpinner ? (
                <motion.div {...headTextAnimation}>
                  <p
                    className="sm:text-[18] text-[16px] uppercase tracking-wide"
                    style={{ display: showChat ? "none" : "" }}
                  >
                    Get in touch
                  </p>
                  <div
                    className="flex items-center gap-2 mt-2 cursor-pointer"
                    style={{ display: showChat ? "none" : "" }}
                  >
                    <h3 className="font-black md:text-[35px] sm:text-[50px] xs:text-[40px] text-[26px] text-extrabold">
                      Contact
                    </h3>
                  </div>
                  <div style={{ display: showChat ? "none" : "" }}>
                    <div
                      className="social_card_container cursor-pointer"
                      onClick={() => handleJoin()}
                    >
                      <Image
                        src={CustmomerService.image}
                        alt="social"
                        width="30"
                        height="30"
                      />
                      <p className="text-[16px] leading-[26px] font-bold">
                        {CustmomerService.title}
                      </p>
                    </div>
                    {socials.map((social) => (
                      <div className="social_card_container cursor-pointer">
                        <Image
                          src={social.image}
                          alt="social"
                          width="30"
                          height="30"
                        />
                        <p className="text-[16px] leading-[26px] font-bold">
                          {social.title}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: !showChat ? "none" : "" }}>
                    <ChatPage
                      socket={socket}
                      roomId={roomId}
                      make={make}
                      imageStore={imageStore}
                    />
                  </div>
                </motion.div>
              ) : (
                <div className={styles.loading_spinner}></div>
              )}
            </motion.div>
          </div>
        </motion.section>
        <motion.div
          className="hero__image-container relative max-w-[1440px] overflow-hidden"
          {...headContainerAnimation}
        >
          <motion.div
            className="hero__image relative h-96"
            {...headContentAnimation}
          >
            <Image
              src={generateCostumeCarsImageUrl(make, model, year)}
              alt="hero"
              layout="fill"
              className="object-contain"
            />
          </motion.div>
          <div
            className="hero__image-overlay_costum"
            style={{ top: "-4rem !important", right: "-30% !important" }}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
export default page;
