"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePasswordSchema = exports.updateUserSchema = exports.listUserSchema = exports.findUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    username: zod_1.z
        .string()
        .min(4, { message: "o campo username deve conter no minimo 4 caracteres" }),
    firstName: zod_1.z
        .string()
        .min(4, { message: "o campo nome deve conter no minimo 4 caracteres" }),
    lastName: zod_1.z
        .string()
        .min(4, {
        message: "o campo sobrenome deve conter no minimo 4 caracteres",
    }),
    password: zod_1.z
        .string()
        .min(8, { message: "o campo senha deve conter no minimo 8 caracteres" }),
});
exports.findUserSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, { message: "o parametro id é obrigatório" }),
});
exports.listUserSchema = zod_1.z.object({
    page: zod_1.z.coerce.number().min(1, { message: "o parametro page é obrigatório" }),
    limit: zod_1.z.coerce
        .number()
        .min(1, { message: "o parametro limit é obrigatório" }),
    search: zod_1.z.coerce.string().optional(),
});
exports.updateUserSchema = zod_1.z.object({
    username: zod_1.z
        .string()
        .min(4, { message: "o campo username deve conter no minimo 4 caracteres" }),
    firstName: zod_1.z
        .string()
        .min(4, { message: "o campo nome deve conter no minimo 4 caracteres" }),
    lastName: zod_1.z
        .string()
        .min(4, {
        message: "o campo sobrenome deve conter no minimo 4 caracteres",
    }),
});
exports.updatePasswordSchema = zod_1.z.object({
    currentPassword: zod_1.z
        .string()
        .min(1, { message: "o campo senha atual é obrigatório" }),
    newPassword: zod_1.z
        .string()
        .min(8, {
        message: "o campo nova senha deve conter no mínimo 8 caracteres",
    }),
});
