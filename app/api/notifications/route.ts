import { NextResponse, NextRequest } from "next/server";
import {
  fetchNotifications,
  markAsRead,
  createNotification,
} from "@/lib/actions/notification.action";
import { connectToDB } from "@/lib/mongoose";

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
  const { roomId, id } = params;
  return { roomId, id };
}

export const GET = async (request: NextRequest) => {
  const { roomId } = extractParams(request.nextUrl.search);

  try {
    await connectToDB();

    const notifications = await fetchNotifications(roomId as string);

    return NextResponse.json({ success: true, notifications }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};

export const PUT = async (request: NextRequest) => {
  const { id } = extractParams(request.nextUrl.search);

  try {
    await connectToDB();

    await markAsRead(id as string);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
