"use client" // to avoid typescript warnings in cli
import Link from "next/link"
import Image from "next/image"
import { UserButton , SignedIn , SignedOut , SignInButton , useUser } from "@clerk/nextjs"
import { createUser } from "@/lib/actions/user.actions";


const Navbar = () => {
  const { isLoaded, isSignedIn, user }  = useUser();
  const userInfo = {
    id: user?.id,
    username: user?.username,
    name: user?.firstName,
    image: user?.imageUrl,
    email: user?.emailAddresses[0]?.emailAddress,
  }
  console.log(userInfo);
  // if (isSignedIn) {
  //   createUser({
  //     userId: user?.id ?? "",
  //     username: user?.username ?? "",
  //     name: user?.firstName ?? "",
  //     image: user?.imageUrl ?? "",
  //     email: user?.emailAddresses[0]?.emailAddress ?? "",
  //   });
  //   }
  
  return (
<header className="w-full absolute z-10">
    <nav className="max-w-7xl mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
        <Link href="/" className="flex justify-center items-center"><Image src="/logo.svg" alt="logo" width={118} height={18} className="object-contain" /></Link>
        {user ? (
          
            <UserButton afterSignOutUrl="/" />
        ) : (
            <SignInButton>
              <button className="custom-btn bg-white text-prinary-blue rounded-full min-w-[100px] ml-4">Sign In</button>
            </SignInButton>
            
        )
          }
        
    </nav>
</header>
  )
}


export default Navbar