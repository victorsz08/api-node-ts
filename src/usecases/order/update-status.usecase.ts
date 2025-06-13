import { OrderInterface } from './../../domain/interfaces/order.interface';
import { StatusEnum } from "../../domain/enum/status.enum";
import { Usecase } from "../usecase.core";
import generateDatePattern from '../../patterns/utils/generate-date.pattern';



export type UpdateStatusOrderInputDto = {
    id: string;
    status: StatusEnum;
};

export type UpdateStatusOrderOutputDto = void;

export class UpdateStatusOrderUsecase implements Usecase<UpdateStatusOrderInputDto, UpdateStatusOrderOutputDto> {
    private constructor(private readonly orderInterface: OrderInterface) {};

    public static build(orderInterface: OrderInterface) {
        return new UpdateStatusOrderUsecase(orderInterface);
    };
    
    public async execute(input: UpdateStatusOrderInputDto): Promise<void> {
        const { id, status } = input;
        const updatedAt = generateDatePattern.generateDate();

        await this.orderInterface.find(id);
        await this.orderInterface.updateStatus(id, status, updatedAt);

        return;
    };
};