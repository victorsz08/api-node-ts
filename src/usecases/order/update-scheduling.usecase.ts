import { OrderInterface } from './../../domain/interfaces/order.interface';
import { Usecase } from "../usecase.core";
import GenerateDatePattern from "../../patterns/utils/generate-date.pattern";
import moment from 'moment-timezone';



export type UpdateSchedulingOrderInputDto = {
    id: string;
    schedulingDate: Date;
    schedulingTime: string;
};

export type UpdateSchedulingOrderOutputDto = void;


export class UpdateSchedulingOrderUsecase implements Usecase<UpdateSchedulingOrderInputDto, UpdateSchedulingOrderOutputDto> {
    private constructor(private readonly orderInterface: OrderInterface) {};

    public static build(orderInterface: OrderInterface) {
        return new UpdateSchedulingOrderUsecase(orderInterface);
    };

    public async execute(input: UpdateSchedulingOrderInputDto): Promise<void> {
        const { id, schedulingDate, schedulingTime } = input;
        const updatedAt = GenerateDatePattern.generateDate();
        const schedulingDateFormatted = GenerateDatePattern.parseDate(schedulingDate);

        await this.orderInterface.find(id);
        await this.orderInterface.updateScheduling(id, schedulingDateFormatted, schedulingTime, updatedAt);

        return;
    };
};