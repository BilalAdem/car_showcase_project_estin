import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";
import { connectToDB } from "@/lib/mongoose";
import {
  createUser,
  fetchUser,
  fetchHistoryMessages,
  fetchRoomMessages,
  addMessagesToRoom,
} from "@/lib/actions/user.actions";
import { NextApiRequest } from "next";
import { createNotification } from "@/lib/actions/notification.action";

export const POST = async (request: Request) => {
  const payload = await request.json();

  try {
    await connectToDB();

    const { userId, username, name, image, email } = payload;
    const result = await createUser({ userId, username, name, image, email });
    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
function extractParams(queryString: string) {
  const params = {};

  // Split the query string into key-value pairs
  const pairs = queryString.slice(1).split("&");

  // Iterate over each pair and populate the params object
  pairs.forEach((pair) => {
    const [key, value] = pair.split("=");
    params[key] = decodeURIComponent(value);
  });

  // Destructure the required parameters
  const { email, roomId, limit } = params;

  return { email, roomId, limit };
}
export const PUT = async (request: Request) => {
  const payload = await request.json();
  const { roomId, email, name, image, message, time } = payload;

  try {
    await connectToDB();

    // Add the message to the room
    const result = await addMessagesToRoom(
      roomId,
      email,
      name,
      image,
      message,
      time
    );

    // Create a notification for the recipient
    const notification = await createNotification({
      senderEmail: email,
      roomId,
      message,
      time,
      read: false, // Assuming the notification is initially unread
    });

    return NextResponse.json(
      { success: true, result, notification },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
};

export const GET = async (request: NextRequest) => {
  try {
    await connectToDB();
    const params = extractParams(request.nextUrl.search);
    const { roomId } = params;
    const result = await fetchRoomMessages(roomId);
    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
};

// GET NOTIFICATIONS
