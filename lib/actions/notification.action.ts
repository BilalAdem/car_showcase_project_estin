import Notification from "../models/notification.model";
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
    const notification = await Notification.create({
      id: Math.random().toString(36).substr(2, 9),
      senderEmail,
      roomId,
      message,
      time,
      read: false,
    });
    return notification;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function fetchNotifications(roomId: string) {
  try {
    await connectToDB();
    const notifications = await Notification.find({
      roomId,
    }).filter((notification: any) => !notification.read);
    console.log(`notifications: ${notifications}`); // `notifications: ${notifications}` is never used
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
