"use client";
import styles from "./page.module.css";
import { io } from "socket.io-client";
import { useState } from "react";
import ChatPage from "./ChatBox";

export default function Home({
  roomId,
  make,
  imageStore,
}: {
  roomId: string;
  make: string;
  imageStore: string;
}) {
  const [showChat, setShowChat] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

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
      }, 2000);
    } else {
      alert("No valid room id");
    }
  };

  return (
    <div>
      <div
        className={styles.main_div}
        style={{ display: showChat ? "none" : "" }}
      >
        <button className={styles.main_button} onClick={() => handleJoin()}>
          {!showSpinner ? (
            "Join"
          ) : (
            <div className={styles.loading_spinner}></div>
          )}
        </button>
      </div>
      <div style={{ display: !showChat ? "none" : "" }}>
        <ChatPage
          socket={socket}
          roomId={roomId}
          make={make}
          imageStore={imageStore}
        />{" "}
      </div>
    </div>
  );
}
