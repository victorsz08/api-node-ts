import { StatusEnum } from "../../domain/enum/status.enum";
import { ListOrderOutput, OrderInterface } from "../../domain/interfaces/order.interface";
import orderMapper, { OrderDto } from "../../patterns/mappers/order.mapper";
import { Usecase } from "../usecase.core";



export type ListOrderInputDto = {
    page: number;
    limit: number;
    userId: string;
    createdDateIn?: Date;
    createdDateOut?: Date;
    schedulingDateIn?: Date;
    schedulingDateOut?: Date;
    status?: StatusEnum;
};

export type ListOrderOutputDto = {
    orders: OrderDto[];
    total: number;
    pages: number;
    limit: number;
};


export class ListOrderUsecase implements Usecase<ListOrderInputDto, ListOrderOutputDto> {
    private constructor(private readonly orderInterface: OrderInterface) {};
    
    public static build(orderInterface: OrderInterface) {
        return new ListOrderUsecase(orderInterface);
    };

    public async execute(input: ListOrderInputDto): Promise<ListOrderOutputDto> {
        const { 
            page,
            limit,
            userId,
            createdDateIn,
            createdDateOut,
            schedulingDateIn,
            schedulingDateOut,
            status
        } = input;

        const data = await this.orderInterface.list({ 
            page, 
            limit, 
            userId, 
            createdDateIn, 
            createdDateOut, 
            schedulingDateIn, 
            schedulingDateOut, 
            status
        });

        const output = this.present(data);
        return output;
    };

    private present(data: ListOrderOutput): ListOrderOutputDto {
        return {
            orders: data.orders.map((order) => {
                return orderMapper.toDto(order)
            }),
            total: data.total,
            pages: data.pages,
            limit: data.limit
        };
    };
};