import { z } from "zod";

export const createUserSchema = z.object({
  username: z
    .string()
    .min(4, { message: "o campo username deve conter no minimo 4 caracteres" }),
  firstName: z
    .string()
    .min(4, { message: "o campo nome deve conter no minimo 4 caracteres" }),
  lastName: z
    .string()
    .min(4, {
      message: "o campo sobrenome deve conter no minimo 4 caracteres",
    }),
  password: z
    .string()
    .min(8, { message: "o campo senha deve conter no minimo 8 caracteres" }),
});

export const findUserSchema = z.object({
  id: z.string().min(1, { message: "o parametro id é obrigatório" }),
});

export const listUserSchema = z.object({
  page: z.coerce.number().min(1, { message: "o parametro page é obrigatório" }),
  limit: z.coerce
    .number()
    .min(1, { message: "o parametro limit é obrigatório" }),
  search: z.coerce.string().optional(),
});

export const updateUserSchema = z.object({
  username: z
    .string()
    .min(4, { message: "o campo username deve conter no minimo 4 caracteres" }),
  firstName: z
    .string()
    .min(4, { message: "o campo nome deve conter no minimo 4 caracteres" }),
  lastName: z
    .string()
    .min(4, {
      message: "o campo sobrenome deve conter no minimo 4 caracteres",
    }),
});

export const updatePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, { message: "o campo senha atual é obrigatório" }),
  newPassword: z
    .string()
    .min(8, {
      message: "o campo nova senha deve conter no mínimo 8 caracteres",
    }),
});
