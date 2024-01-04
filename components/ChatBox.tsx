"use client";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { image, send, vocal } from "@/assests";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { leftArrow, verifiedIcon } from "@/constants";
import style from "./chat.module.css";

interface IMsgDataTypes {
  roomId: String | number;
  user: UserProp;
  msg: String;
  time: String;
}
interface UserProp {
  firstName: string;
  lastName: string;
  imageUrl: string;
  email: string;
}
interface chatProps {
  socket: any;
  roomId: String;
  make: String;
  imageStore: string;
}
const ChatPage = ({ socket, roomId, make, imageStore }: chatProps) => {
  const [currentMsg, setCurrentMsg] = useState("");
  const [chat, setChat] = useState<IMsgDataTypes[]>([]);
  const messageTextIsEmpty = currentMsg.trim().length === 0;
  const { user } = useUser();
  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const imageUrl = user?.imageUrl;
  const email = user?.emailAddresses[0].emailAddress;
  let messageEnd = null;

  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentMsg !== "") {
      const msgData: IMsgDataTypes = {
        roomId,
        user: {
          firstName: firstName ?? "",
          lastName: lastName ?? "",
          imageUrl: imageUrl ?? "",
          email: email ?? "",
        },
        msg: currentMsg,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_msg", msgData);
      setChat((pre) => [...pre, msgData]);
      setCurrentMsg("");
    }
    const sendMessage = async () => {
      try {
        console.log(`message infos : ${roomId} ${email} ${currentMsg} `);
        const response = await axios.put(`http://localhost:3000/api/`, {
          roomId: roomId,
          email: email,
          name: firstName + " " + lastName,
          image: imageUrl,
          message: currentMsg,
          time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    sendMessage();
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.charCode !== 13 || messageTextIsEmpty) {
      return;
    }
    sendData(event as any);
    event.preventDefault();
  };

  useEffect(() => {
    const fetchHistoryMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api`, {
          params: {
            roomId: roomId,
          },
        });
        console.log(response.data);
        const messages = response.data.result.messages;
        const data_chat_messages = messages.map((e: any) => {
          return {
            user: {
              email: e.email,
              imageUrl: e.image,
              firstName: e.name.split(" ")[0] as string,
              lastName: e.name.split(" ")[1] as string,
            },
            msg: e.message,
            time: e.time,
          };
        });
        setChat(data_chat_messages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHistoryMessages();
  }, [roomId]);

  useEffect(() => {
    socket.on("receive_msg", (data: IMsgDataTypes) => {
      setChat((pre) => [...pre, data]);
    });
  }, [socket]);

  return (
    <div>
      <div className="flex items-center gap-2 ">
        <button className="flex items-center gap-1" onClick={() => {}}>
          <Image
            src={leftArrow.image}
            alt="leftArrow"
            width="18"
            height="18"
            className=""
          />
        </button>
        <h3 className="font-black md:text-[22px] sm:text-[50px] xs:text-[40px] text-[22px] text-extrabold">
          {make.toUpperCase()} Store
        </h3>
        <span className="flex items-center " style={{ marginTop: "2px" }}>
          <Image
            src={verifiedIcon.image}
            alt="verifiedIcon"
            width="16"
            height="16"
            className="object-contain"
          />
        </span>
      </div>
      <div
        className="chat-container h-[400px] overflow-y-scroll"
        style={{
          scrollbarWidth: "none",
          scrollbarColor: "inset 0 0 6px rgba(0, 0, 0, 0.5);",
          scrollBehavior: "smooth",
        }}
      >
        {chat
          .filter((message, index, self) => {
            // Filter out duplicate messages based on the msg property
            return (
              index ===
              self.findIndex(
                (m) => m.msg === message.msg && m.time === message.time
              )
            );
          })
          .map(({ roomId, user, msg, time }, key) => (
            <div>
              {user.email === email ? (
                <div className="chat chat-end" key={`chat_${key}`}>
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      {email === "billalademattar@gmail.com" ? (
                        <Image
                          alt="avatar"
                          src={imageStore ?? ""}
                          className="object-contain"
                          width={50}
                          height={50}
                        />
                      ) : (
                        <Image
                          alt="avatar"
                          src={imageUrl ?? ""}
                          className="object-contain"
                          width={50}
                          height={50}
                        />
                      )}
                    </div>
                  </div>

                  <div className="chat-header">
                    {firstName} {lastName}
                    <time className="ml-2 text-xs opacity-50">{time}</time>
                  </div>

                  <span
                    key={`span-${key}`}
                    className={`chat-bubble`}
                    data-author={email}
                  >
                    {msg}
                  </span>
                </div>
              ) : (
                <div className="chat chat-start" key={`chat-start-${key}`}>
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      {user.email === "billalademattar@gmail.com" ? (
                        <Image
                          alt="avatar"
                          src={imageStore ?? ""}
                          className="object-contain"
                          width={50}
                          height={50}
                        />
                      ) : (
                        <Image
                          alt="avatar"
                          src={user.imageUrl}
                          className="object-contain"
                          width={50}
                          height={50}
                        />
                      )}
                    </div>
                  </div>

                  <div className="chat-header">
                    {user.firstName} {user.lastName}
                    <time className="ml-2 text-xs opacity-50">{time}</time>
                  </div>

                  <span
                    key={`span-start-${key}`}
                    className={`chat-bubble`}
                    data-author={user.email}
                  >
                    {msg}
                  </span>
                </div>
              )}
            </div>
          ))}
      </div>
      <div>
        <form onSubmit={(e) => sendData(e)}>
          <div className="searchbar__item" style={{ marginTop: "20px" }}>
            <div className="w-full flex flex-row items-center justify-center bg-white rounded-lg gap-5">
              <input
                className="w-full h-12 px-3 py-2 text-base text-gray-700 placeholder-gray-600 bg-white outline-none"
                type="text"
                value={currentMsg}
                placeholder="Type your message.."
                onChange={(e) => setCurrentMsg(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <div className="flex flex-row items-center justify-center gap-2">
                {!messageTextIsEmpty ? (
                  <button type="submit" disabled={messageTextIsEmpty}>
                    <Image
                      src={send}
                      width={25}
                      height={25}
                      alt="send"
                      className="object-contain"
                    />
                  </button>
                ) : (
                  <div className="flex flex-row items-center justify-center gap-2">
                    <button>
                      <Image
                        src={image}
                        width={25}
                        height={25}
                        alt="image"
                        className="object-contain"
                      />
                    </button>
                    <button>
                      <Image
                        src={vocal}
                        width={25}
                        height={25}
                        alt="vocal"
                        className="object-contain"
                      />
                    </button>
                  </div>
                )}
              </div>{" "}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
