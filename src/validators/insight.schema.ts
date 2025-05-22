import { z } from "zod";
import formatDatePattern from "../patterns/libs/format-date.pattern";



export const getInsightSchema = z.object({
    userId: z.string().min(1, { message: "o parametro userId é obrigatório" }),
    dateIn: z.coerce.date().transform((value) => {
            return formatDatePattern.startOfDate(value)
        }),
    dateOut: z.coerce.date().transform((value) => {
            return formatDatePattern.endOfDate(value)
        })
});