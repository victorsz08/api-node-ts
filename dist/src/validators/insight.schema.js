"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInsightSchema = void 0;
const zod_1 = require("zod");
const format_date_pattern_1 = __importDefault(require("../patterns/libs/format-date.pattern"));
exports.getInsightSchema = zod_1.z.object({
    userId: zod_1.z.string().min(1, { message: "o parametro userId é obrigatório" }),
    dateIn: zod_1.z.coerce.date().transform((value) => {
        return format_date_pattern_1.default.startOfDate(value);
    }),
    dateOut: zod_1.z.coerce.date().transform((value) => {
        return format_date_pattern_1.default.endOfDate(value);
    })
});
