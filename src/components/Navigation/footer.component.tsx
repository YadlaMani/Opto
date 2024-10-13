import React from "react";
import {
  FaSquareGithub,
  FaSquareInstagram,
  FaSquareXTwitter,
  FaLinkedin,
} from "react-icons/fa6";

export const Footer = () => {
  return (
    <div className="w-full flex  bottom-0 justify-center items-center p-5 gap-4 bg-blue-500">
      <a
        href="https://www.instagram.com/_mani_yadla/"
        referrerPolicy="no-referrer"
        target="_blank"
        rel="noopener"
        title="Instagram">
        <FaSquareInstagram size={40} />
      </a>
      <a
        href="https://github.com/YadlaMani"
        referrerPolicy="no-referrer"
        target="_blank"
        rel="noopener"
        title="GitHub">
        <FaSquareGithub size={40} />
      </a>
      <a
        href="https://twitter.com/mani_yadla?t=wa5NteshFDQQ-g_DxAcrqw&s=08 "
        referrerPolicy="no-referrer"
        target="_blank"
        rel="noopener"
        title="Twitter">
        <FaSquareXTwitter size={40} />
      </a>
      <a
        href="www.linkedin.com/in/yadla-mani"
        referrerPolicy="no-referrer"
        target="_blank">
        <FaLinkedin size={40} />
      </a>
    </div>
  );
};
