import Notification from "../models/notification.model";
import Room from "../models/room.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
  senderEmail: string;
  roomId: string;
  message: string;
  time: string;
  read: boolean;
}

export async function createNotification({
  senderEmail,
  roomId,
  message,
  time,
  read,
}: Params) {
  try {
    await connectToDB();
    const room = await Room.findOne({ id: roomId });

    if (!room) {
      throw new Error("Room not found");
    }

    const users = room.users;
    const isBillalademattar = senderEmail === "billalademattar@gmail.com";

    if (isBillalademattar) {
      // Iterate through users in the room
      for (const user of users) {
        // Skip the sender
        if (user.email !== senderEmail) {
          const notification = new Notification({
            id: `${user.email}-${roomId}-${time}`,
            senderEmail,
            roomId,
            message,
            time,
            read,
          });

          await notification.save();

          // Update the user model
          await User.findOneAndUpdate(
            { email: user.email },
            { $push: { notifications: notification.id } }
          );
        }
      }
    } else {
      const billalademattarUser = room.users.find(
        (user: any) => user.email === "billalademattar@gmail.com"
      );

      if (!billalademattarUser) {
        // Add "billalademattar@gmail.com" to the room
        const updatedRoom = await Room.findOneAndUpdate(
          { id: roomId },
          { $push: { users: { email: "billalademattar@gmail.com" } } },
          { new: true }
        );

        // Update the user model
        const updatedUser = await User.findOneAndUpdate(
          { email: "billalademattar@gmail.com" },
          { $push: { rooms: updatedRoom } },
          { new: true }
        );
      }

      const notification = new Notification({
        id: `${senderEmail}-${roomId}-${time}`,
        senderEmail,
        roomId,
        message,
        time,
        read,
      });

      await notification.save();

      // Update the user model
      await User.findOneAndUpdate(
        { email: "billalademattar@gmail.com" },
        { $push: { notifications: notification } }
      );
    }

    return "Notification created successfully";
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function fetchNotifications(email: string) {
  try {
    await connectToDB();
    const user = await User.findOne({ email }).populate("notifications");
    if (!user) {
      throw new Error("User not found");
    }
    const notifications = user.notifications.filter((notification: any) => {
      if (!notification.read) return notification;
    });
    return notifications;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function markAsRead(id: string) {
  try {
    await connectToDB();
    await Notification.findByIdAndUpdate(id, { read: true });
    return;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
