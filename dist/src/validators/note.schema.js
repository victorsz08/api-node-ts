"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNoteSchema = exports.findNoteSchema = exports.listNoteSchema = exports.createNoteSchema = void 0;
const zod_1 = require("zod");
const format_date_pattern_1 = __importDefault(require("../patterns/libs/format-date.pattern"));
exports.createNoteSchema = zod_1.z.object({
    content: zod_1.z.string().min(1, { message: "o campo conteúdo não pode ser vazio" })
});
exports.listNoteSchema = zod_1.z.object({
    page: zod_1.z.coerce.number().min(1, { message: "o parametro page é obrigatório" }),
    limit: zod_1.z.coerce.number().min(1, { message: "o parametro limit é obrigatório" }),
    userId: zod_1.z.string().min(1, { message: "o paramento userId é obrigatório" }),
    dateIn: zod_1.z.coerce.date().optional().transform((value) => {
        if (value) {
            return format_date_pattern_1.default.startOfDate(value);
        }
    }),
    dateOut: zod_1.z.coerce.date().optional().transform((value) => {
        if (value) {
            return format_date_pattern_1.default.endOfDate(value);
        }
    })
});
exports.findNoteSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, { message: "o parametro id é obrigatório" })
});
exports.updateNoteSchema = zod_1.z.object({
    content: zod_1.z.string().min(1, { message: "o campo conteúdo não pode ser vazio" })
});
