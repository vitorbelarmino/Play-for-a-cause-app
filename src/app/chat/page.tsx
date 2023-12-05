"use client";
import { api } from "@/api/index";
import { IChat } from "@/interface/IChat";
import { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";

export default function chat() {
  const [chat, setChat] = useState<undefined | IChat>(undefined);
  const getChat = async () => {
    try {
      const { data } = await api.get("chat/getOne");
      setChat(data[0]);
      console.log(chat);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getChat();
  }, []);

  return (
    <div className=" flex justify-center h-screen">
      <div className="flex justify-center items-end border-solid border-2 bg-[url('https://i.pinimg.com/736x/85/ec/df/85ecdf1c3611ecc9b7fa85282d9526e0.jpg')] bg-contain border-blue-50 w-full h-full">
        <div className="flex items-center w-full bg-gray-700 h-9 px-4 py-9">
          <input
            className=" text-gray-300 w-full text-sm rounded p-2 bg-gray-600 focus:outline-none"
            type="text"
          />
          <span className="ml-3 cursor-pointer">
            <IoSend size={24} />
          </span>
        </div>
      </div>
    </div>
  );
}
