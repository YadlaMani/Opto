"use client";
import React, { useRef, useState, useEffect } from "react";
import { usePostOperations } from "@/hooks/use-post-operations.hook";
import { uploadFileToPinata } from "@/helpers";
import { toast } from "react-hot-toast";
import { IoCloudUploadOutline } from "react-icons/io5";

export type PostDataType = {
  title: string;
  content: string;
  image: string;
};

const CreatePostPage = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [data, setData] = useState<PostDataType>({
    title: "",
    content: "",
    image: "",
  });

  const { addPost, isConfirmed, isConfirming } = usePostOperations();
  const isLoading = isConfirming || isSubmitting;

  useEffect(() => {
    if (isConfirmed) {
      toast.dismiss("loading1");
      toast.success("Post Created!");
    }
  }, [isConfirmed]);

  const openBrowse = () => {
    if (fileRef.current) {
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
    if (data.title && data.content && file) {
      setIsSubmitting(true);
      try {
        const res = await uploadFileToPinata(file);
        if (res) {
          const imageUrl = `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${res}`;
          setData({ ...data, image: imageUrl });
          await addPost({
            title: data.title,
            description: data.content,
            image: imageUrl,
          });
          toast.success("Post Created Successfully!");
        }
      } catch (error) {
        toast.error("Error creating post. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast.error("Please fill in all fields and upload an image.");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="bg-white rounded-lg mb-4 overflow-hidden">
        <div className="p-6">
          {previewUrl ? (
            <div className="relative w-full h-64 mb-4">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-contain rounded-lg"
              />
              <button
                onClick={openBrowse}
                className="absolute bottom-4 right-4 border border-gray-600 bg-white text-black px-4 py-2 rounded-md shadow-sm hover:bg-gray-100 transition-colors">
                Change Image
              </button>
            </div>
          ) : (
            <div
              onClick={openBrowse}
              className="w-full bg-gray-200 rounded-lg h-64 flex flex-col justify-center items-center cursor-pointer transition-colors hover:bg-gray-300">
              <IoCloudUploadOutline size={64} className="text-gray-500 mb-2" />
              <p className="text-gray-600">Click to upload an image</p>
            </div>
          )}
          <input
            type="file"
            ref={fileRef}
            hidden
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
      </div>

      <input
        type="text"
        placeholder="Enter your post title"
        className="w-full text-2xl font-bold mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setData({ ...data, title: e.target.value })}
        value={data.title}
      />

      <textarea
        placeholder="Write your post content here..."
        className="w-full min-h-[200px] mb-6 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setData({ ...data, content: e.target.value })}
        value={data.content}
      />

      <div className="text-center">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`bg-green-500 hover:bg-green-600 text-white px-8 py-2 rounded-full text-lg font-semibold transition-colors ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}>
          {isLoading ? "Creating Post..." : "Create Post"}
        </button>
      </div>
    </div>
  );
};

export default CreatePostPage;
