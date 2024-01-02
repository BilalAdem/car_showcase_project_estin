import User from "../models/user.model";
import Room from "../models/room.model";
import { connectToDB } from "../mongoose";
import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";

interface Params {
  userId: string;
  username: string;
  name: string;
  image: string;
  email: string;
}

export async function createUser({
  userId,
  username,
  name,
  image,
  email,
}: Params): Promise<void> {
  try {
    await connectToDB();

    const userFound = await fetchUser(userId);
    if (userFound) {
      return;
    }
    const user = new User({
      id: userId,
      username,
      name,
      image,
      email,
    });
    const result = await user.save();
    return result;
  } catch (error) {
    throw new Error(`Failed to create user: ${error}`);
  }
}

export async function fetchUser(userId: string) {
  try {
    connectToDB();

    return await User.findOne({ id: userId });
  } catch (error) {
    throw new Error(`Failed to fetch user: ${error}`);
  }
}

export async function fetchHistoryMessages(
  email: string,
  roomId: string,
  limit: number
) {
  try {
    connectToDB();
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const messages = user.messages.filter(
      (message: any) => message.roomId === roomId
    );
    const result = messages.slice(-limit);
    return result;
  } catch (error) {
    throw new Error(`Failed to fetch history messages: ${error}`);
  }
}

export const fetchRoomMessages = async (roomId: string) => {
  try {
    await connectToDB();
    const room = Room.findOne({ id: roomId });
    if (!room) {
      console.log("Room not found");
    }
    return room;
  } catch (error) {
    throw new Error(`Failed to fetch room messages: ${error}`);
  }
};

export const addMessagesToRoom = async (
  roomId: string,
  email: string,
  name: string,
  image: string,
  message: string,
  time: string
) => {
  try {
    await connectToDB();
    const messageObj = {
      email,
      name,
      image,
      message,
      time,
    };
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    // search for the room or create a new one
    const room = await Room.findOne({ id: roomId });
    if (!room) {
      const newRoom = new Room({
        id: roomId,
        messages: [messageObj],
      });
      const result = await newRoom.save();
      return result;
    } else {
      // update the room model

      const updatedRoom = await Room.findOneAndUpdate(
        { id: roomId },
        { $push: { messages: messageObj } },
        { new: true }
      );

      // update the user model
      const updatedUser = await User.findOneAndUpdate(
        { email },
        { $push: { rooms: updatedRoom } },
        { new: true }
      );
      console.log(`updatedUser`, updatedUser);
      return updatedRoom;
    }
  } catch (error) {
    throw new Error(`Failed to add message: ${error}`);
  }
};
