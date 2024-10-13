"use client";
import { PostCard } from "@/components";
import { usePostOperations } from "@/hooks/use-post-operations.hook";
import { formatUnits } from "viem";
import { useConnections } from "wagmi";
import Lottie from "react-lottie";
import blockchainanimation from "../../public/lottie/blockchain-animation.json";

export default function HomePage() {
  const { useGetPosts } = usePostOperations();

  const { data, isLoading } = useGetPosts();
  // const connection = useConnections();

  return (
    <main className="w-full md:px-10 py-5 min-h-screen p-5 bg-gradient-to-b from-blue-100 to-white">
      {isLoading ? (
        <div className="flex justify-center mt-28 items-center">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: blockchainanimation,
            }}
            height={150}
            width={150}
          />
          <h1 className="text-center text-2xl font-semibold mt-4">
            Loading...
          </h1>
        </div>
      ) : data && data.length > 0 ? (
        <div>
          <div>
            <h1 className="text-center text-4xl font-extrabold mb-6">
              All Posts
            </h1>
          </div>
          <div className="mx-auto w-[50%]">
            {data.map((post) => (
              <PostCard
                key={post?.id}
                title={post?.title}
                content={post?.content}
                id={Number(formatUnits(post?.id, 0))}
                image={post?.image}
                alt={post?.title} // Added alt attribute for accessibility
                author={post?.author!}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: blockchainanimation,
            }}
            height={400}
            width={400}
          />
          <h1 className="text-center text-2xl m-auto font-semibold mt-4">
            Please connect your wallet, Posts are on the way!
          </h1>
        </div>
      )}
    </main>
  );
}
