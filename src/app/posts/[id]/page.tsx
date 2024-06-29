"use client";

import { PostDataType } from "@/app/create-post/page";
import { uploadFileToPinata } from "@/helpers";
import { usePostOperations } from "@/hooks/use-post-operations.hook";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";

const PostPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { useGetPost, updatePost } = usePostOperations();
  const { data: post, isLoading: isPostLoading } = useGetPost(Number(id));

  const fileRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [file, setFile] = useState<File>();
  const [data, setData] = useState<PostDataType>({
    title: "",
    content: "",
    image: "",
  });

  const { address } = useAccount();
  const disabled = post?.author !== address;

  const openBrowse = () => {
    if (fileRef.current && !disabled) {
      fileRef.current.click();
    }
  };

  const { addPost, isConfirmed, isConfirming } = usePostOperations();
  const isLoading = isConfirming || isSubmitting;

  useEffect(() => {
    if (isConfirmed) {
      toast.dismiss("loading1");
      toast.success("Post Updated!");
    }
  }, [isConfirmed]);

  const handleSubmit = () => {
    if (post?.author === address) {
      if (data.title && data.content && data.image) {
        setIsSubmitting(true);
        if (file) {
          uploadFileToPinata(file)
            .then((res) => {
              if (res) {
                setData({
                  ...data,
                  image: `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${res}`,
                });
                updatePost({
                  id: Number(id),
                  title: data.title,
                  description: data.content,
                  image: `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${res}`,
                });
              }
            })
            .finally(() => {
              setIsSubmitting(false);
            });
        } else {
          updatePost({
            id: Number(id),
            title: data.title,
            description: data.content,
            image: data.image,
          });
          setIsSubmitting(false);
        }
      }
    }
  };

  useEffect(() => {
    if (post && !isPostLoading) {
      setData({
        title: post.title,
        content: post.content,
        image: post.image,
      });
    }
  }, [post, isPostLoading]);

  return (
    <div className="min-h-screen p-5 md:p-10 bg-gray-50">
      <div
        onClick={openBrowse}
        className={`relative rounded-md h-96 flex justify-center items-center cursor-pointer overflow-hidden ${
          disabled ? "cursor-not-allowed opacity-50" : ""
        }`}
        style={{ backgroundColor: post?.image ? "transparent" : "#f3f4f6" }}
      >
        {post?.image ? (
          <div className="relative w-full h-full">
            <Image
              src={post.image}
              alt="Post image"
              layout="fill"
              objectFit="contain"
            />
          </div>
        ) : (
          <span className="text-gray-500 text-xl">Click to upload image</span>
        )}
      </div>

      <input
        type="file"
        ref={fileRef}
        hidden
        onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          }
        }}
        readOnly={disabled}
      />
      {post?.title && (
        <input
          type="text"
          placeholder="Title"
          className="font-serif text-4xl outline-none w-full mt-5 bg-transparent border-b-2 border-gray-300 focus:border-gray-500 transition-colors"
          onChange={(e) => {
            setData({ ...data, title: e.target.value });
          }}
          value={data.title}
          readOnly={disabled}
        />
      )}
      {post?.content && (
        <textarea
          placeholder="Write your thoughts here!"
          className="font-serif text-lg outline-none w-full mt-5 min-h-[40vh] bg-transparent border-b-2 border-gray-300 focus:border-gray-500 transition-colors"
          onChange={(e) => {
            setData({ ...data, content: e.target.value });
          }}
          value={data.content}
          readOnly={disabled}
        />
      )}
      {post?.author === address && !isPostLoading && (
        <div className="text-center mt-5">
          <button
            onClick={handleSubmit}
            type="button"
            disabled={isLoading}
            className="bg-green-500 text-lg px-6 py-2 rounded-md text-white font-serif disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? "Updating..." : "Update Post"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PostPage;
