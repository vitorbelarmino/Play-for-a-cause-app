import { z } from "zod";

export const registerSchema = z.object({
  name: z.string({ required_error: "Digite seu nome" }),
  email: z
    .string({ required_error: "Digite seu e-mail" })
    .email("Digite um e-mail válido"),
  password: z
    .string({ required_error: "Digite sua senha" })
    .min(3, "A senha deve ter no mínimo 3 caracteres"),
});
