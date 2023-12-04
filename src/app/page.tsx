import { FaLock, FaUser } from "react-icons/fa";

export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col justify-center w-80 h-64 items-center gap-3 p-7 bg-zinc-700 ">
        <h1>login</h1>
        <div className="flex items-center gap-1 w-full bf">
          <FaUser />
          <input className="input" placeholder="E-mail" type="text" />
        </div>
        <div className="flex items-center gap-1 w-full">
          <FaLock />
          <input className="input" placeholder="Senha" type="password" />
        </div>
        <button className="bg-slate-500 w-full rounded-md">Login</button>
        <div className="flex gap-1">
          <p>Não possui uma conta?</p>
          <a className="text-blue-700" href="/register">
            crie agora
          </a>
        </div>
      </div>
    </div>
  );
}
