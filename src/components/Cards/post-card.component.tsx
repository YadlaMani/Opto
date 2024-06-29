import Image from "next/image";
import Link from "next/link";
import { Address } from "viem";

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
      <div className="w-full border border-gray-300 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out p-5 mt-5 flex items-start justify-between font-serif cursor-pointer hover:bg-gray-100">
        <div className="flex-1">
          <p className="text-sm text-gray-500">by {author}</p>
          <h2 className="text-2xl font-bold mt-2">{title}</h2>
          <p className="text-lg mt-1">{content.slice(0, 60)}...</p>
          <button
            type="button"
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4"
          >
            Read More
          </button>
        </div>
        <div className="ml-4">
          <Image
            src={image!}
            alt="Post image"
            width={200}
            height={200}
            className="rounded-lg"
          />
        </div>
      </div>
    </Link>
  );
};
