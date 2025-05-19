import { OrderInterface } from './../../domain/interfaces/order.interface';
import { Usecase } from "../usecase.core";


export type UpdateOrderInputDto = {
    id: string;
    number: number;
    local: string;
    price: number;
    contact: string;
};

export type UpdateOrderOutputDto = void;



export class UpdateOrderUsecase implements Usecase<UpdateOrderInputDto, UpdateOrderOutputDto> {
    private constructor(private readonly orderInterface: OrderInterface) {};

    public static build(orderInterface: OrderInterface) {
        return new UpdateOrderUsecase(orderInterface);
    };
    
    public async execute(input: UpdateOrderInputDto): Promise<void> {
        const { 
            id,
            number,
            local,
            price,
            contact
        } = input;
        const updatedAt = new Date();

        await this.orderInterface.find(id);
        await this.orderInterface.update(id, number, local, price, contact, updatedAt);
        
        return;
    };
};