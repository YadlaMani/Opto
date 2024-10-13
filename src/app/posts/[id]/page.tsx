"use client";
import { PostDataType } from "@/app/create-post/page";
import { uploadFileToPinata } from "@/helpers";
import { usePostOperations } from "@/hooks/use-post-operations.hook";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import { IoCloudUploadOutline } from "react-icons/io5";

const PostPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { useGetPost, updatePost } = usePostOperations();
  const { data: post, isLoading: isPostLoading } = useGetPost(Number(id));

  const fileRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [data, setData] = useState<PostDataType>({
    title: "",
    content: "",
    image: "",
  });

  const { address } = useAccount();
  const disabled = post?.author !== address;

  const { isConfirmed, isConfirming } = usePostOperations();
  const isLoading = isConfirming || isSubmitting;

  useEffect(() => {
    if (isConfirmed) {
      toast.dismiss("loading1");
      toast.success("Post Updated!");
    }
  }, [isConfirmed]);

  useEffect(() => {
    if (post && !isPostLoading) {
      setData({
        title: post.title,
        content: post.content,
        image: post.image,
      });
      setPreviewUrl(post.image);
    }
  }, [post, isPostLoading]);

  const openBrowse = () => {
    if (fileRef.current && !disabled) {
      fileRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
    }
  };

  const handleSubmit = async () => {
    if (post?.author !== address || !data.title || !data.content) {
      toast.error("Please fill in all fields and ensure you're the author.");
      return;
    }

    setIsSubmitting(true);
    try {
      let imageUrl = data.image;
      if (file) {
        const res = await uploadFileToPinata(file);
        if (res) {
          imageUrl = `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${res}`;
        }
      }
      await updatePost({
        id: Number(id),
        title: data.title,
        description: data.content,
        image: imageUrl,
      });
      toast.success("Post Updated Successfully!");
    } catch (error) {
      toast.error("Error updating post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gray-50 flex flex-col">
      <div className="max-w-3xl mx-auto w-full flex-grow flex flex-col">
        <div
          onClick={openBrowse}
          className={`relative rounded-lg h-40 md:h-48 lg:h-56 w-full flex justify-center items-center cursor-pointer overflow-hidden mb-4 ${
            disabled ? "cursor-not-allowed opacity-50" : ""
          }`}>
          {previewUrl ? (
            <div className="relative w-full h-full">
              <Image
                src={previewUrl}
                alt="Post image"
                layout="fill"
                objectFit="contain"
                className="max-w-full"
              />
              {!disabled && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <span className="text-white text-lg md:text-xl">
                    Change Image
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <IoCloudUploadOutline size={36} className="text-gray-400 mb-2" />
              <span className="text-gray-500 text-base md:text-lg text-center">
                Click to upload image
              </span>
            </div>
          )}
        </div>

        <input
          type="file"
          ref={fileRef}
          hidden
          onChange={handleFileChange}
          accept="image/*"
          disabled={disabled}
        />

        <input
          type="text"
          placeholder="Title"
          className="font-serif text-xl md:text-2xl lg:text-3xl outline-none w-full mb-3 md:mb-4 bg-transparent border-b-2 border-gray-300 focus:border-gray-600 transition-colors p-2"
          onChange={(e) => setData({ ...data, title: e.target.value })}
          value={data.title}
          readOnly={disabled}
        />

        <textarea
          placeholder="Write your thoughts here!"
          className="font-serif text-base md:text-lg outline-none w-full bg-transparent border-2 border-gray-300 focus:border-gray-600 transition-colors p-4 rounded-lg resize-none h-32 md:h-40"
          onChange={(e) => setData({ ...data, content: e.target.value })}
          value={data.content}
          readOnly={disabled}
        />

        {!disabled && !isPostLoading && (
          <div className="text-center mt-4 md:mt-6">
            <button
              onClick={handleSubmit}
              type="button"
              disabled={isLoading}
              className="bg-green-500 hover:bg-green-600 text-white text-base md:text-lg px-6 py-2 md:px-8 md:py-3 rounded-full font-serif disabled:opacity-50 disabled:cursor-not-allowed transition-all">
              {isLoading ? "Updating..." : "Update Post"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPage;
