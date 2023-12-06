"use client";
import { api } from "@/api/index";
import { ILogin, IRegister, IUser } from "@/interface/IUser";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";

type AuthContextType = {
  login: (login: ILogin) => void;
  register: (register: IRegister) => void;
  user: IUser;
};

export const AuthContext = createContext({} as AuthContextType);
export const Auth = () => useContext(AuthContext);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState({} as IUser);
  const router = useRouter();

  const login = async (login: ILogin) => {
    try {
      const { data: userData } = await api.post("user/login", login);
      setUser(userData);
      await getChat(userData.id);
      setCookie("chat.userId", userData.id, {
        expires: new Date(Date.now() + 86400000),
        path: "/",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        alert("E-mail ou senha incorretos");
      }
    }
  };

  const recoverData = async () => {
    const userId = getCookie("chat.userId");
    if (!userId) {
      return;
    }
    try {
      if (userId) {
        const { data } = await api.get(`user/${userId}`);
        setUser(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (register: IRegister) => {
    try {
      const { data } = await api.post("user/create", register);
      setUser(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        alert("E-mail já cadastrado");
      }
    }
  };

  const addUserToChat = async (userId: string, chatId: string) => {
    try {
      await api.post("chat/addUser", { userId, chatId });
    } catch (error) {
      console.log(error);
    }
  };

  const getChat = async (userId: string) => {
    try {
      const { data: chat } = await api.get("chat/getOne");
      if (!chat) {
        const { data } = await api.post("chat/create");
        await addUserToChat(userId, data.chatId);
        router.push("/chat");
        return;
      }
      const userInChat = chat.users.some((user: IUser) => user.id === userId);
      if (!userInChat) {
        await addUserToChat(userId, chat.id);
        router.push("/chat");
      }
      router.push("/chat");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    recoverData();
  }, []);

  return (
    <AuthContext.Provider value={{ login, register, user }}>
      {children}
    </AuthContext.Provider>
  );
}
