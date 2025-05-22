"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindOrderUsecase = void 0;
const order_mapper_1 = __importDefault(require("../../patterns/mappers/order.mapper"));
class FindOrderUsecase {
    constructor(orderInterface) {
        this.orderInterface = orderInterface;
    }
    ;
    static build(orderInterface) {
        return new FindOrderUsecase(orderInterface);
    }
    ;
    async execute(input) {
        const { id } = input;
        const order = await this.orderInterface.find(id);
        const output = order_mapper_1.default.toDto(order);
        return output;
    }
    ;
}
exports.FindOrderUsecase = FindOrderUsecase;
;
