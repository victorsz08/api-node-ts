import { OrderEntity } from "../../domain/entities/order.entity";
import { Mapper } from "./mapper.core";
import FormatDatePattern from "../utils/transform-date";
import { Contract } from "@prisma/client";

export type OrderDto = {
    id: string;
    number: number;
    local: string;
    schedulingDate: Date;
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
            schedulingDate: order.schedulingDate,
            schedulingTime: order.schedulingTime,
            status: order.status,
            contact: order.contact,
            price: order.price,
            createdAt: FormatDatePattern.toString(order.createdAt),
            updatedAt: FormatDatePattern.toString(order.updatedAt)
        };
    };

    public toEntity(order: Contract): OrderEntity {
        return OrderEntity.with({
            id: order.id,
            number: order.number,
            local: order.local,
            schedulingDate: order.installationDate,
            schedulingTime: order.installationHour,
            status: order.status,
            price: order.price,
            contact: order.phone,
            userId: order.userId,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt
        });
    };
};

export default new OrderMapper();