import { z } from "zod";
import formatDatePattern from "../patterns/libs/format-date.pattern";
import { StatusEnum } from "../domain/enum/status.enum";




export const createOrderSchema = z.object({
    number: z.coerce.number().min(1, { message: "o campo numero é obrigatório" }),
    local: z.string().min(1, { message: "o campo local é obrigatório" }),
    schedulinDate: z.coerce.date().min(new Date(), { message: "o campo data de agendamento deve ser maior que a data atual" }),
    schedulingTime: z.string().min(1, { message: "o campo horário de agendamento é obrigatório" }),
    price: z.coerce.number().min(1, { message: "o campo valor deve ser maior que R$0,01" }),
    contact: z.string().min(1, { message: "o campo contato é obrigatório" })
});

export const findUserIdSchema = z.object({
    userId: z.string().min(1, { message: "o paramentro userId é obrigatório" })
});


export const findOrderSchema = z.object({
    id: z.string().min(1, { message: "o parametro id é obrigatório" })
});

export const listOrderSchema = z.object({
    page: z.coerce.number().min(1, { message: "o parametro page é obrigatório" }),
    limit: z.coerce.number().min(1, { message: "o parametro limit é obrigatório" }),
    userId: z.string().min(1, { message: "o parametro userId é obrigatório" }),
    status: z.string().optional().transform((value) => {
        return value as StatusEnum
    }),
    createdDateIn: z.coerce.date().optional().transform((value) => {
        if(value) {
            return formatDatePattern.startOfDate(value)
        }
    }),
    createdDateOut: z.coerce.date().optional().transform((value) => {
        if(value) {
            return formatDatePattern.endOfDate(value)
        }
    }),
    schedulingDateIn: z.coerce.date().optional().transform((value) => {
        if(value) {
            return formatDatePattern.startOfDate(value)
        }
    }),
    schedulingDateOut: z.coerce.date().optional().transform((value) => {
        if(value) {
            return formatDatePattern.endOfDate(value)
        }
    })
});

export const updateOrderSchema = z.object({
    number: z.coerce.number().min(1, { message: "o campo numero é obrigatório" }),
    local: z.string().min(1, { message: "o campo local é obrigatório" }),
    price: z.coerce.number().min(1, { message: "o campo valor deve ser maior que R$0,01" }),
    contact: z.string().min(1, { message: "o campo contato é obrigatório" })
});

export const updateStatusSchema = z.object({
    status: z.string().min(1, { message: "o campo status é obrigatório" })
});

export const updateSchedulingSchema = z.object({
    schedulinDate: z.coerce.date().min(new Date(), { message: "o campo data de agendamento deve ser maior que a data atual" }),
    schedulingTime: z.string().min(1, { message: "o campo horário de agendamento é obrigatório" }),
});