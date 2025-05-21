import { z } from "zod";


export const createUserSchema = z.object({
    username: z.string().min(4, { message: "o campo username deve conter no minimo 4 caracteres" }),
    firstName: z.string().min(4, { message: "o campo nome deve conter no minimo 4 caracteres" }),
    lastName: z.string().min(4, { message: "o campo sobrenome deve conter no minimo 4 caracteres" }),
    password: z.string().min(8, { message: "o campo senha deve conter no minimo 8 caracteres" }),
});


export const findUserSchema = z.object({
    id: z.string().min(1, { message: "o parametro id é obrigatório" })
})