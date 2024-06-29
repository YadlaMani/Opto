import React from "react";
import {
  FaSquareGithub,
  FaSquareInstagram,
  FaSquareXTwitter,
  FaLinkedin,
} from "react-icons/fa6";

export const Footer = () => {
  return (
    <div className="w-full flex justify-center items-center p-5 border-t border-[#2d2d2d] gap-4 bg-gradient-to-r from-indigo-500">
      <a
        href="https://www.instagram.com/_mani_yadla/"
        referrerPolicy="no-referrer"
        target="_blank"
      >
        <FaSquareInstagram size={40} />
      </a>
      <a
        href="https://github.com/YadlaMani"
        referrerPolicy="no-referrer"
        target="_blank"
      >
        <FaSquareGithub size={40} />
      </a>
      <a
        href="https://twitter.com/mani_yadla?t=wa5NteshFDQQ-g_DxAcrqw&s=08 "
        referrerPolicy="no-referrer"
        target="_blank"
      >
        <FaSquareXTwitter size={40} />
      </a>
      <a
        href="www.linkedin.com/in/yadla-mani"
        referrerPolicy="no-referrer"
        target="_blank"
      >
        <FaLinkedin size={40} />
      </a>
    </div>
  );
};
