import Image from "next/image";
import Link from "next/link";
import { Address } from "viem";
import { ArrowRight } from "lucide-react";

type PostCardProps = {
  title: string;
  content: string;
  id: number;
  image: string;
  author: Address;
};

export const PostCard = ({
  title,
  content,
  id,
  image,
  author,
}: PostCardProps) => {
  return (
    <Link href={`/posts/${id}`}>
      <div className="w-full border border-gray-300 bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out p-6 mt-5 flex flex-col md:flex-row items-start justify-between font-serif cursor-pointer ">
        <div className="flex-1 pr-4">
          <p className="text-sm text-gray-500 mb-2">
            by{" "}
            <span className="font-medium">
              {author.slice(0, 6)}...{author.slice(-4)}
            </span>
          </p>
          <h2 className="text-2xl font-bold mb-3 line-clamp-2">{title}</h2>
          <p className="text-lg mb-4 line-clamp-3">{content}</p>
          <button
            type="button"
            className="inline-flex items-center text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-300 ease-in-out group">
            Read More
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300 ease-in-out" />
          </button>
        </div>
        <div className="w-full md:w-auto mt-4 md:mt-0">
          <div className="relative w-full h-48 md:w-48 md:h-48 overflow-hidden rounded-lg">
            <Image
              src={image}
              alt="Post image"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};
