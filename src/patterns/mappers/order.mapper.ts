import { OrderEntity } from "../../domain/entities/order.entity";
import { Mapper } from "./mapper.core";
import FormatDatePattern from "../utils/transform-date";

export type OrderDto = {
    id: string;
    number: number;
    local: string;
    schedulingDate: string;
    schedulingTime: string;
    status: string;
    price: number;
    contact: string;
    createdAt: string;
    updatedAt: string;
}

class OrderMapper implements Mapper<OrderEntity, OrderDto> {
    
    public toDto(order: OrderEntity): OrderDto {
        return {
            id: order.id,
            number: order.number,
            local: order.local,
            schedulingDate: FormatDatePattern.toString(order.schedulingDate),
            schedulingTime: order.schedulingTime,
            status: order.status,
            contact: order.contact,
            price: order.price,
            createdAt: FormatDatePattern.toString(order.createdAt),
            updatedAt: FormatDatePattern.toString(order.updatedAt)
        };
    };
};

export default new OrderMapper();