import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";
import { connectToDB } from "@/lib/mongoose";
import { createUser, fetchUser } from "@/lib/actions/user.actions";

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
  } finally {
    await mongoose.connection.close();
  }
};

// export const GET = async (request: Request) => {
//   try {
//     await connectToDB();
//     const { userId } = request;
//     const result = await fetchUser(userId);
//     return NextResponse.json({ success: true, result }, { status: 200 });
//   } catch (error: any) {
//     return NextResponse.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   } finally {
//     await mongoose.connection.close();
//   }
// };
