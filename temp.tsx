"use client";

import React, { useEffect, useState } from "react";
import { useChannel } from "ably/react";
import styles from "./ChatBox.module.css";
import Image from "next/image";
import { image, send, vocal } from "@/assests";
import { useUser } from "@clerk/nextjs";

export default function ChatBox() {
  let inputBox: HTMLTextAreaElement | null = null;
  let messageEnd = null;
  const { user } = useUser();

  // ...

  const { firstName, lastName, imageUrl } = user;
  // const email = emailAddresses[0].emailAddress;
  // Use the destructured elements in the code

  // console.log(firstName, lastName, imageUrl);
  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState<{ data: string }[]>([]); // Add type annotation here
  const messageTextIsEmpty = messageText.trim().length === 0;

  const { channel, ably } = useChannel("chat-carhub", (message) => {
    const history = receivedMessages.slice(-199);
    setMessages([...history, message]);
  });
  // console.log(channel, ably);
  console.log(receivedMessages);

  const sendChatMessage = (messageText: string) => {
    // Add type annotation here
    channel.publish({ name: "chat-message", data: messageText });
    setMessageText("");
    inputBox?.focus();
  };

  const handleFormSubmission = (event: React.FormEvent) => {
    // Add type annotation here
    event.preventDefault();
    sendChatMessage(messageText);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    // Add type annotation here
    if (event.charCode !== 13 || messageTextIsEmpty) {
      return;
    }
    sendChatMessage(messageText);
    event.preventDefault();
  };

  const messages = receivedMessages.map((message, index) => {
    const author = (
      message: { connectionId: string },
      ably: { connection: { id: string } }
    ) => (message.connectionId === ably.connection.id ? "me" : "other");
    console.log(author(message, ably));
    return (
      <div>
        {author(message, ably) === "me" ? (
          <div className="chat chat-end" key={index}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <Image
                  alt="avatar"
                  src={imageUrl}
                  className="object-contain"
                  width={50}
                  height={50}
                />
              </div>
            </div>

            <div className="chat-header">
              {author(message, ably) === "me"
                ? `${firstName} ${lastName}`
                : "You"}
              <time className="ml-2 text-xs opacity-50">
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </time>
            </div>

            <span key={index} className={`chat-bubble`} data-author={author}>
              {message.data}
            </span>
          </div>
        ) : (
          <div className="chat chat-start" key={index}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <Image
                  alt="avatar"
                  src={imageUrl}
                  className="object-contain"
                  width={50}
                  height={50}
                />
              </div>
            </div>

            <div className="chat-header">
              {author(message, ably) === "me"
                ? `${firstName} ${lastName}`
                : "You"}
              <time className="ml-2 text-xs opacity-50">
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </time>
            </div>

            <span key={index} className={`chat-bubble`} data-author={author}>
              {message.data}
            </span>
          </div>
        )}
      </div>
    );
  });

  useEffect(() => {
    const messageEnd: HTMLDivElement | null = null;
    (messageEnd as HTMLDivElement | null)?.scrollIntoView({
      behavior: "smooth",
    });
  });

  return (
    <div className={styles.chatHolder}>
      <div className={styles.chatText}>
        {messages}
        <div
          ref={(element) => {
            messageEnd = element;
          }}
        ></div>
      </div>
      <form onSubmit={handleFormSubmission} className="searchbar rounded-2xl">
        <div className="searchbar__item">
          <div className="w-full flex flex-row items-center justify-center bg-white rounded-lg gap-5">
            <textarea
              ref={(element) => {
                inputBox = element;
              }}
              value={messageText}
              placeholder="Type a message..."
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full h-12 px-3 py-2 text-base text-gray-700 placeholder-gray-600 bg-white"
              style={{
                resize: "none",
                outline: "none",
                overflow: "hidden",
                boxSizing: "border-box",
              }}
            ></textarea>
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
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
