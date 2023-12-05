"use client";
import { Auth } from "@/context/authContext";
import { ILogin } from "@/interface/IUser";
import { loginSchema } from "@/schemas/loginSchema";
import { ChangeEvent, useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { ZodError } from "zod";

export default function Login() {
  const [userInfo, setUserInfo] = useState({} as ILogin);
  const { login } = Auth();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      loginSchema.parse(userInfo);
      login(userInfo);
    } catch (error) {
      if (error instanceof ZodError) {
        alert(error.errors[0].message);
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center h-screen"
    >
      <div className="flex flex-col justify-center w-80 h-64 items-center gap-3 p-7 bg-zinc-700 ">
        <h1>Login</h1>
        <div className="flex items-center gap-1 w-full bf">
          <FaUser />
          <input
            className="input"
            name="email"
            onChange={(e) => handleChange(e)}
            placeholder="E-mail"
            type="text"
          />
        </div>
        <div className="flex items-center gap-1 w-full">
          <FaLock />
          <input
            className="input"
            name="password"
            onChange={(e) => handleChange(e)}
            placeholder="Senha"
            type="password"
          />
        </div>
        <button type="submit" className="bg-slate-500 w-full rounded-md">
          Login
        </button>
        <div className="flex gap-1">
          <p>Não possui uma conta?</p>
          <a className="text-blue-700" href="/register">
            crie agora
          </a>
        </div>
      </div>
    </form>
  );
}
