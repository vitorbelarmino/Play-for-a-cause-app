"use client";
import { api } from "@/api/inedex";
import { ILogin, IRegister, IUser } from "@/interface/IUser";
import { AxiosError } from "axios";
import { createContext, useContext, useState } from "react";

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
  const login = async (login: ILogin) => {
    try {
      const { data } = await api.post("user/login", login);
      setUser(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        alert("E-mail ou senha incorretos");
      }
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
  return (
    <AuthContext.Provider value={{ login, register, user }}>
      {children}
    </AuthContext.Provider>
  );
}
