"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderUsecase = void 0;
const order_entity_1 = require("../../domain/entities/order.entity");
class CreateOrderUsecase {
    constructor(orderInterface) {
        this.orderInterface = orderInterface;
    }
    ;
    static build(orderInterface) {
        return new CreateOrderUsecase(orderInterface);
    }
    ;
    async execute(input) {
        const { number, local, schedulingDate, schedulingTime, price, contact, userId } = input;
        const order = order_entity_1.OrderEntity.build(number, local, schedulingDate, schedulingTime, price, contact, userId);
        await this.orderInterface.create(order);
        return;
    }
    ;
}
exports.CreateOrderUsecase = CreateOrderUsecase;
;
