import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import React from "react";
import { ConnectWalletButton } from "../Buttons/connect-wallet-button.component";
import Image from "next/image"; // Import the Image component from the correct package
import { BiEdit } from "react-icons/bi";
export const Header = () => {
  return (
    <div className="w-full sticky top-0 flex items-center justify-between z-50 bg-white md:px-20 py-3">
      <Link href={"/"} className="text-xl md:text-3xl 2xl:text-4xl font-bold">
        <span className="flex items-center gap-2">
          <Image
            src="/images/goodlogo.jpg"
            width={60}
            height={60}
            alt="website-logo"
            className="text-blue-500"
          />
          <span className="font-serif text-blue-500 mt-2">Opto</span>
        </span>
      </Link>

      {/* <ConnectWalletButton /> */}
      <div className="flex items-center gap-8">
        <Link href={"/create-post"}>
          <span className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out shadow-md">
            <span className="text-lg font-medium">Write Post</span>
            <BiEdit size={24} className="text-white" />
          </span>
        </Link>
        <ConnectButton />
      </div>
    </div>
  );
};
