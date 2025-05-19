import { OrderInterface } from './../../domain/interfaces/order.interface';
import { Usecase } from "../usecase.core";
import orderMapper, { OrderDto } from '../../patterns/mappers/order.mapper';


export type FindOrderInputDto = {
    id: string;
};



export class FindOrderUsecase implements Usecase<FindOrderInputDto, OrderDto> {
    private constructor(private readonly orderInterface: OrderInterface) {};
    
    public static build(orderInterface: OrderInterface) {
        return new FindOrderUsecase(orderInterface);
    };

    public async execute(input: FindOrderInputDto): Promise<OrderDto> {
        const { id } = input;

        const order = await this.orderInterface.find(id);
        const output = orderMapper.toDto(order);

        return output;
    };
};