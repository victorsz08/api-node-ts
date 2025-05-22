"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSchedulingSchema = exports.updateStatusSchema = exports.updateOrderSchema = exports.listOrderSchema = exports.findOrderSchema = exports.findUserIdSchema = exports.createOrderSchema = void 0;
const zod_1 = require("zod");
const format_date_pattern_1 = __importDefault(require("../patterns/libs/format-date.pattern"));
exports.createOrderSchema = zod_1.z.object({
    number: zod_1.z.coerce.number().min(1, { message: "o campo numero é obrigatório" }),
    local: zod_1.z.string().min(1, { message: "o campo local é obrigatório" }),
    schedulinDate: zod_1.z.coerce.date().min(new Date(), { message: "o campo data de agendamento deve ser maior que a data atual" }),
    schedulingTime: zod_1.z.string().min(1, { message: "o campo horário de agendamento é obrigatório" }),
    price: zod_1.z.coerce.number().min(1, { message: "o campo valor deve ser maior que R$0,01" }),
    contact: zod_1.z.string().min(1, { message: "o campo contato é obrigatório" })
});
exports.findUserIdSchema = zod_1.z.object({
    userId: zod_1.z.string().min(1, { message: "o paramentro userId é obrigatório" })
});
exports.findOrderSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, { message: "o parametro id é obrigatório" })
});
exports.listOrderSchema = zod_1.z.object({
    page: zod_1.z.coerce.number().min(1, { message: "o parametro page é obrigatório" }),
    limit: zod_1.z.coerce.number().min(1, { message: "o parametro limit é obrigatório" }),
    userId: zod_1.z.string().min(1, { message: "o parametro userId é obrigatório" }),
    status: zod_1.z.string().optional().transform((value) => {
        return value;
    }),
    createdDateIn: zod_1.z.coerce.date().optional().transform((value) => {
        if (value) {
            return format_date_pattern_1.default.startOfDate(value);
        }
    }),
    createdDateOut: zod_1.z.coerce.date().optional().transform((value) => {
        if (value) {
            return format_date_pattern_1.default.endOfDate(value);
        }
    }),
    schedulingDateIn: zod_1.z.coerce.date().optional().transform((value) => {
        if (value) {
            return format_date_pattern_1.default.startOfDate(value);
        }
    }),
    schedulingDateOut: zod_1.z.coerce.date().optional().transform((value) => {
        if (value) {
            return format_date_pattern_1.default.endOfDate(value);
        }
    })
});
exports.updateOrderSchema = zod_1.z.object({
    number: zod_1.z.coerce.number().min(1, { message: "o campo numero é obrigatório" }),
    local: zod_1.z.string().min(1, { message: "o campo local é obrigatório" }),
    price: zod_1.z.coerce.number().min(1, { message: "o campo valor deve ser maior que R$0,01" }),
    contact: zod_1.z.string().min(1, { message: "o campo contato é obrigatório" })
});
exports.updateStatusSchema = zod_1.z.object({
    status: zod_1.z.string().min(1, { message: "o campo status é obrigatório" })
});
exports.updateSchedulingSchema = zod_1.z.object({
    schedulinDate: zod_1.z.coerce.date().min(new Date(), { message: "o campo data de agendamento deve ser maior que a data atual" }),
    schedulingTime: zod_1.z.string().min(1, { message: "o campo horário de agendamento é obrigatório" }),
});
