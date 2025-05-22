"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStatusOrderUsecase = void 0;
class UpdateStatusOrderUsecase {
    constructor(orderInterface) {
        this.orderInterface = orderInterface;
    }
    ;
    static build(orderInterface) {
        return new UpdateStatusOrderUsecase(orderInterface);
    }
    ;
    async execute(input) {
        const { id, status } = input;
        const updatedAt = new Date();
        await this.orderInterface.find(id);
        await this.orderInterface.updateStatus(id, status, updatedAt);
        return;
    }
    ;
}
exports.UpdateStatusOrderUsecase = UpdateStatusOrderUsecase;
;
