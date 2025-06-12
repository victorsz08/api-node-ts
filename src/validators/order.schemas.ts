import { z } from "zod";
import formatDatePattern from "../patterns/libs/format-date.pattern";
import { StatusEnum } from "../domain/enum/status.enum";
import { subDays } from "date-fns";
import generateDatePattern from "../patterns/utils/generate-date.pattern";




export const createOrderSchema = z.object({
    number: z.coerce.number().min(1, { message: "o campo numero é obrigatório" }),
    local: z.string().min(1, { message: "o campo local é obrigatório" }),
    schedulingDate: z.coerce.date().min(new Date(), { message: "o campo data de agendamento deve ser maior que a data atual" }),
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
    createdDateIn: z.coerce.date().optional(),
    createdDateOut: z.coerce.date().optional(),
    schedulingDateIn: z.coerce.date().optional(),
    schedulingDateOut: z.coerce.date().optional()
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
    schedulingDate: z.coerce.date().min(
        subDays(new Date(), 1), { message: "o campo data de agendamento deve ser maior que a data atual" })
        .transform((value) => {
            return generateDatePattern.parseDate(value);
        }),
    schedulingTime: z.string().min(1, { message: "o campo horário de agendamento é obrigatório" }),
});