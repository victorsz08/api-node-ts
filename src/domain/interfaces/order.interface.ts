import { OrderEntity } from "../entities/order.entity";
import { StatusEnum } from "../enum/status.enum";

export type ListOrderInput = {
    page: number;
    limit: number;
    userId: string;
    createdDateIn?: Date;
    createdDateOut?: Date;
    status?: StatusEnum;
};

export type ListOrderOutput = {
    orders: OrderEntity[];
    total: number;
    pages: number;
    limit: number;
};



export interface OrderInterface {
    create(order: OrderEntity): Promise<void>;
    find(id: string): Promise<OrderEntity>;
    list(query: ListOrderInput): Promise<ListOrderOutput>;
    updateStatus(id: string, status: StatusEnum, updatedAt: Date): Promise<void>;
    updateScheduling(id: string, schedulingDate: Date, schedulingTime: string, updatedAt: Date): Promise<void>;
    update(id: string, number: number, local: string, price: number, contact: string, updatedAt: Date): Promise<void>;
    delete(id: string): Promise<void>;
};