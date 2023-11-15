import User from "../models/user.model";
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
      throw new Error("User already exists");
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
