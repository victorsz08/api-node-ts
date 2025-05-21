import { InsightEntity } from "../../domain/entities/insight.entity";
import { InsightInterface } from "../../domain/interfaces/insight.interface";
import { Usecase } from "../usecase.core";



export type GetInsightInputDto = {
    userId: string;
    dateIn: Date;
    dateOut: Date;
};

export type GetInsightOutputDto = {
    revenue: number;
    sales: number;
    completionRate: number;
    cancelledRate: number;
    connected: number;
    cancelled: number;
    pending: number;
};

export class GetInsightUsecase implements Usecase<GetInsightInputDto, GetInsightOutputDto> {
    private constructor(private readonly insightInterface: InsightInterface) {};

    public static build(insightInterface: InsightInterface) {
        return new GetInsightUsecase(insightInterface);
    };
    
    public async execute(input: GetInsightInputDto): Promise<GetInsightOutputDto> {
        const { userId, dateIn, dateOut } = input;

        const data = await this.insightInterface.get(userId, dateIn, dateOut);
        const output = this.present(data);

        return output;
    };

    private present(data: InsightEntity): GetInsightOutputDto {
        return {
            revenue: data.revenue,
            completionRate :data.completionRate,
            cancelledRate: data.cancelledRate,
            sales: data.sales,
            connected: data.connected,
            cancelled: data.cancelled,
            pending: data.pending
        };
    };
};