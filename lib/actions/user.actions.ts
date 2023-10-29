import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";


interface Params {
    userId: string;
    username: string;
    name: string;
    image: string;
    email: string
  }

export async function createUser({
    userId,
    username,
    name,
    image,
    email

}: Params) : Promise<void> {
    
       try {
        connectToDB();
        const userFound = await User.findOne({ id: userId });
        if (userFound) {
          throw new Error("User already exists");
        }
        const newUser = new User({
            id: userId,
            username,
            name,
            image,
            email
        });
        await newUser.save();
        revalidatePath("/");

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


