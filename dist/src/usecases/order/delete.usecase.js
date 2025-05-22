"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteOrderUsecase = void 0;
class DeleteOrderUsecase {
    constructor(orderInterface) {
        this.orderInterface = orderInterface;
    }
    ;
    static build(orderInterface) {
        return new DeleteOrderUsecase(orderInterface);
    }
    ;
    async execute(input) {
        const { id } = input;
        await this.orderInterface.find(id);
        await this.orderInterface.delete(id);
        return;
    }
    ;
}
exports.DeleteOrderUsecase = DeleteOrderUsecase;
;
