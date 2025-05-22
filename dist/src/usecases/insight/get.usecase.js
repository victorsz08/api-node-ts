"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetInsightUsecase = void 0;
class GetInsightUsecase {
    constructor(insightInterface) {
        this.insightInterface = insightInterface;
    }
    ;
    static build(insightInterface) {
        return new GetInsightUsecase(insightInterface);
    }
    ;
    async execute(input) {
        const { userId, dateIn, dateOut } = input;
        const data = await this.insightInterface.get(userId, dateIn, dateOut);
        const output = this.present(data);
        return output;
    }
    ;
    present(data) {
        return {
            revenue: data.revenue,
            completionRate: data.completionRate,
            cancelledRate: data.cancelledRate,
            sales: data.sales,
            connected: data.connected,
            cancelled: data.cancelled,
            pending: data.pending
        };
    }
    ;
}
exports.GetInsightUsecase = GetInsightUsecase;
;
