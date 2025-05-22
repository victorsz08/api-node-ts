"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSchedulingOrderUsecase = void 0;
class UpdateSchedulingOrderUsecase {
    constructor(orderInterface) {
        this.orderInterface = orderInterface;
    }
    ;
    static build(orderInterface) {
        return new UpdateSchedulingOrderUsecase(orderInterface);
    }
    ;
    async execute(input) {
        const { id, schedulingDate, schedulingTime } = input;
        const updatedAt = new Date();
        await this.orderInterface.find(id);
        await this.orderInterface.updateScheduling(id, schedulingDate, schedulingTime, updatedAt);
        return;
    }
    ;
}
exports.UpdateSchedulingOrderUsecase = UpdateSchedulingOrderUsecase;
;
