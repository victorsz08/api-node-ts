"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authLoginSchema = void 0;
const zod_1 = require("zod");
exports.authLoginSchema = zod_1.z.object({
    username: zod_1.z.string().min(1, { message: "o campo username é obrigatório" }),
    password: zod_1.z.string().min(1, { message: "o campo senha é obrigatório" })
});
