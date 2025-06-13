import { z } from "zod";
import generateDatePattern from "../patterns/utils/generate-date.pattern";



export const getInsightSchema = z.object({
    userId: z.string().min(1, { message: "o parametro userId é obrigatório" }),
    dateIn: z.coerce.date(),
    dateOut: z.coerce.date()
});