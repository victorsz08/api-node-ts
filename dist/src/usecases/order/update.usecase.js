"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderUsecase = void 0;
class UpdateOrderUsecase {
    constructor(orderInterface) {
        this.orderInterface = orderInterface;
    }
    ;
    static build(orderInterface) {
        return new UpdateOrderUsecase(orderInterface);
    }
    ;
    async execute(input) {
        const { id, number, local, price, contact } = input;
        const updatedAt = new Date();
        await this.orderInterface.find(id);
        await this.orderInterface.update(id, number, local, price, contact, updatedAt);
        return;
    }
    ;
}
exports.UpdateOrderUsecase = UpdateOrderUsecase;
;
