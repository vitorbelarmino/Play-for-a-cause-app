import { FaLock, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function register() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col justify-center w-80 items-center gap-3 p-7 bg-zinc-700 ">
        <h1>register</h1>
        <div className="flex items-center gap-1 w-full bf">
          <span>
            <FaUser />
          </span>
          <input className="input" placeholder="Nome" type="text" />
        </div>
        <div className="flex items-center gap-1 w-full bf">
          <MdEmail />
          <input className="input" placeholder="E-mail" type="text" />
        </div>
        <div className="flex items-center gap-1 w-full bf">
          <FaLock />
          <input className="input" placeholder="Senha" type="password" />
        </div>
        <button className="bg-slate-500 w-full rounded-md">Register</button>
      </div>
    </div>
  );
}
