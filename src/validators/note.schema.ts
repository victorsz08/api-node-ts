import { z } from "zod";
import formatDatePattern from "../patterns/libs/format-date.pattern";



export const createNoteSchema = z.object({
    content: z.string().min(1, { message: "o campo conteúdo não pode ser vazio" })
});

export const listNoteSchema = z.object({
    page: z.coerce.number().min(1, { message: "o parametro page é obrigatório" }),
    limit: z.coerce.number().min(1, { message: "o parametro limit é obrigatório" }),
    userId: z.string().min(1, { message: "o paramento userId é obrigatório" }),
    dateIn: z.coerce.date().optional().transform((value) => {
        if(value) {
            return formatDatePattern.startOfDate(value)
        }
    }),
    dateOut: z.coerce.date().optional().transform((value) => {
        if(value) {
            return formatDatePattern.endOfDate(value)
        }
    })
});

export const findNoteSchema = z.object({
    id: z.string().min(1, { message: "o parametro id é obrigatório" })
});

export const updateNoteSchema = z.object({
    content: z.string().min(1, { message: "o campo conteúdo não pode ser vazio" })
});