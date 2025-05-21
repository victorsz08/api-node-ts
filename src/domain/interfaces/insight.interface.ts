import { InsightEntity } from "../entities/insight.entity";




export interface InsightInterface {
    get(userId: string, dateIn: Date, dateOut: Date): Promise<InsightEntity>;
};