"use client";
import Link from "next/link";
import Image from "next/image";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect } from "react";
import { bell, heart } from "@/assests";
import { Popover } from "@headlessui/react";
import Notification from "./Notification";

const Navbar = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  useEffect(() => {
    if (isSignedIn && user) {
      const createUser = async () => {
        try {
          const response = await axios.post("http://localhost:3000/api/", {
            userId: user.id,
            username: user.username,
            name: user.fullName,
            image: user.imageUrl,
            email: user.emailAddresses[0]?.emailAddress,
          });
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      };

      createUser();
    }
  }, [isSignedIn, user]);
  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-7xl mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
        <Link href="/" className="flex justify-center items-center">
          <Image
            src="/logo.svg"
            alt="logo"
            width={118}
            height={18}
            className="object-contain"
          />
        </Link>
        {user ? (
          <div className="flex flex-row justify-center items-center gap-5">
            <Popover className="relative pt-1">
              <Popover.Button style={{ outline: "none" }}>
                <Image
                  src={bell}
                  alt="heart"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </Popover.Button>
              <Popover.Panel className="absolute z-10 -right-28">
                <Notification />
              </Popover.Panel>
            </Popover>
            <Link href="/wishlist">
              <Image
                src={heart}
                alt="heart"
                width={24}
                height={24}
                className="object-contain"
              />
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        ) : (
          <SignInButton>
            <button className="custom-btn bg-white text-prinary-blue rounded-full min-w-[100px] ml-4">
              Sign In
            </button>
          </SignInButton>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
