"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.grantedUserSchema = void 0;
const zod_1 = require("zod");
exports.grantedUserSchema = zod_1.z.object({
    role: zod_1.z.string().min(1, { message: "o campo novo cargo é obrigatório" }).transform((value) => {
        return value;
    })
});
