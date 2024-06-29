import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import React from "react";
import { ConnectWalletButton } from "../Buttons/connect-wallet-button.component";
import Image from "next/image"; // Import the Image component from the correct package
import { BiEdit } from "react-icons/bi";
export const Header = () => {
  return (
    <div className="w-full border-b border-[#2d2d2d] flex items-center justify-between md:px-10 p-5 py-5 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <Link href={"/"} className="text-xl md:text-3xl 2xl:text-4xl font-bold">
        <span className="flex items-center gap-2">
          <Image
            src="/images/open-sign.png"
            width={60}
            height={60}
            alt="website-logo"
            className="text-white"
          />
          <span className="font-serif text-white ml-4 mt-2">Opto</span>
        </span>
      </Link>

      {/* <ConnectWalletButton /> */}
      <div className="flex items-center gap-4">
        <Link href={"/create-post"}>
          <span className="flex items-center gap-1 text-xl">
            <span className="text-white">Write Post</span>
            <BiEdit size={24} className="text-white" />
          </span>
        </Link>
        <ConnectButton />
      </div>
    </div>
  );
};
