"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListOrderUsecase = void 0;
const order_mapper_1 = __importDefault(require("../../patterns/mappers/order.mapper"));
class ListOrderUsecase {
    constructor(orderInterface) {
        this.orderInterface = orderInterface;
    }
    ;
    static build(orderInterface) {
        return new ListOrderUsecase(orderInterface);
    }
    ;
    async execute(input) {
        const { page, limit, userId, createdDateIn, createdDateOut, schedulingDateIn, schedulingDateOut, status } = input;
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
    }
    ;
    present(data) {
        return {
            orders: data.orders.map((order) => {
                return order_mapper_1.default.toDto(order);
            }),
            total: data.total,
            pages: data.pages,
            limit: data.limit
        };
    }
    ;
}
exports.ListOrderUsecase = ListOrderUsecase;
;
