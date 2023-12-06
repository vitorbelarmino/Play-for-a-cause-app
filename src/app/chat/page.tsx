"use client";
import { api } from "@/api/index";
import { Auth } from "@/context/authContext";
import { IChat } from "@/interface/IChat";
import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoLogOutOutline, IoSend } from "react-icons/io5";

export default function chat() {
  const [chat, setChat] = useState<undefined | IChat>(undefined);
  const [text, setText] = useState("");
  const { user, logout } = Auth();

  const getChat = async () => {
    try {
      const { data } = await api.get("chat/getOne");
      setChat(data);
    } catch (error) {
      console.log(error);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sendMessage = async (e: any) => {
    e.preventDefault();
    if (!chat || !text) return;
    try {
      await api.post("messages/create", {
        text,
        chatId: chat.id,
        userId: user.id,
        userName: user.name,
      });
      setText("");
      getChat();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getChat();
  }, []);

  const scrollToEnd = () => {
    const chatRef = document.getElementById("chat");
    if (chatRef) {
      chatRef.scrollTop = chatRef.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToEnd();
  }, [chat?.messages]);

  return (
    <div className=" flex flex-col justify-center h-screen">
      <div className="flex flex-col justify-end border-solid border-2 bg-[url('https://i.pinimg.com/736x/85/ec/df/85ecdf1c3611ecc9b7fa85282d9526e0.jpg')] bg-contain border-blue-50 w-full h-full">
        <div
          id="teste"
          className="flex items-center justify-between px-2 border-2 border-solid bg-gray-600 h-12 fixed w-full top-0 "
        >
          <div className="flex items-center px-2 rounded gap-2 bg-gray-500">
            <FaRegUser size={18} />
            <p className="text-gray-200">{user.name}</p>
          </div>
          <p className="text-gray-200">Play for a cause chat </p>

          <IoLogOutOutline
            size={25}
            className="cursor-pointer"
            onClick={logout}
          />
        </div>

        <div id="chat" className="overflow-y-auto scrollbar scrollHeight ">
          {chat?.messages.map((message) => (
            <div
              key={message.id}
              className={` flex ${
                message.userId === user.id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex flex-col my-1 mx-5 items-start p-2 rounded-md max-w-[60%] ${
                  message.userId === user.id
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-600 text-gray-200"
                }`}
              >
                {message.userId !== user.id && (
                  <span className="text-xs">{message.userName}</span>
                )}

                <span className="text-sm">{message.text}</span>
              </div>
            </div>
          ))}
        </div>
        <form
          onSubmit={sendMessage}
          className="flex items-center w-full bg-gray-700 h-9 px-4 py-9"
        >
          <input
            className="text-gray-300 w-full text-sm rounded p-2 bg-gray-600 focus:outline-none"
            type="text"
            name="text"
            placeholder="Digite uma mensagem"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <span onClick={sendMessage} className="ml-3 cursor-pointer">
            <IoSend size={24} />
          </span>
        </form>
      </div>
    </div>
  );
}
