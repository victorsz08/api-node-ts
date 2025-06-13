import { InsightInterface, SalesPerDayInsight } from "../../domain/interfaces/insight.interface";
import generateDatePattern from "../../patterns/utils/generate-date.pattern";
import { Usecase } from "../usecase.core";




export type GetSalesPerDayInputDto = {
    userId: string;
    dateIn: Date;
    dateOut: Date;
};


export type GetSalesPerDayOutputDto = {
    sales: {
        day: string;
        quantity: number;
    }[];
};

export class GetSalesPerDayUsecase implements Usecase<GetSalesPerDayInputDto, GetSalesPerDayOutputDto> {
    private constructor(private readonly insightInterface: InsightInterface) {};

    public static build(insightInterface: InsightInterface) {
        return new GetSalesPerDayUsecase(insightInterface);
    };

    public async execute(input: GetSalesPerDayInputDto): Promise<GetSalesPerDayOutputDto> {
        const { userId, dateIn, dateOut } = input;

        const sales = await this.insightInterface.getSalesPerDay(userId, dateIn, dateOut);

        const output = this.present(sales);
        return output
    };

    private present(sales: SalesPerDayInsight): GetSalesPerDayOutputDto {
        return {
            sales: sales.sales.map((sale) => ({
                day: generateDatePattern.toString(sale.day),
                quantity: sale.quantity
            }))
        };
    };
};