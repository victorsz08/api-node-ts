import { InsightEntity } from "../entities/insight.entity";


export type SalesPerDayInsight = {
    sales: {
        day: Date;
        quantity: number;
    }[];
};

export interface InsightInterface {
    get(userId: string, dateIn: Date, dateOut: Date): Promise<InsightEntity>;
    getSalesPerDay(userId: string, dateIn: Date, dateOut: Date): Promise<SalesPerDayInsight>;
};