"use client";
import { Auth } from "@/context/authContext";
import { IRegister } from "@/interface/IUser";
import { registerSchema } from "@/schemas/registerSchema";
import { ChangeEvent, useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { ZodError } from "zod";

export default function register() {
  const [registerInfo, setRegisterInfo] = useState({} as IRegister);
  const { register } = Auth();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterInfo({ ...registerInfo, [name]: value });
  };

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      registerSchema.parse(registerInfo);
      register(registerInfo);
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
      <div className="flex flex-col justify-center w-80 items-center gap-3 p-7 bg-zinc-700 ">
        <h1>register</h1>
        <div className="flex items-center gap-1 w-full bf">
          <span>
            <FaUser />
          </span>
          <input
            className="input"
            name="name"
            onChange={(e) => handleChange(e)}
            placeholder="Nome"
            type="text"
          />
        </div>
        <div className="flex items-center gap-1 w-full bf">
          <MdEmail />
          <input
            className="input"
            name="email"
            onChange={(e) => handleChange(e)}
            placeholder="E-mail"
            type="text"
          />
        </div>
        <div className="flex items-center gap-1 w-full bf">
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
          Register
        </button>
      </div>
    </form>
  );
}
